import { NextResponse } from 'next/server';
import { connect } from '@/utils/mongodb';
import Note from '@/models/Note';
import bcrypt from 'bcryptjs';

export async function GET(
  req: Request,
  { params }: { params: { shareId: string } }
) {
  try {
    await connect();
    const { shareId } = params;

    // Find note and explicitly select isPasswordProtected field
    const note = await Note.findOne({ shareId }).select('+isPasswordProtected');

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    // If note is password protected, only return basic info
    if (note.isPasswordProtected === true) {
      return NextResponse.json({
        isPasswordProtected: true,
        requiresPassword: true,
        title: note.title || 'Protected Note'
      });
    }

    // If not password protected, return full note
    return NextResponse.json({
      content: note.content,
      title: note.title,
      allowEditing: note.allowEditing,
      isPasswordProtected: false
    });

  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

// Handle note updates
export async function PUT(
  req: Request,
  { params }: { params: { shareId: string } }
) {
  try {
    await connect();
    const { shareId } = params;
    const data = await req.json();
    
    const note = await Note.findOne({ shareId });
    
    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }
    
    // Check if editing is allowed
    if (!note.allowEditing) {
      return NextResponse.json(
        { error: 'Editing not allowed' },
        { status: 403 }
      );
    }
    
    // Update note content
    note.content = data.content;
    await note.save();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

// Add POST method for password verification
export async function POST(
  req: Request,
  { params }: { params: { shareId: string } }
) {
  try {
    await connect();
    const { shareId } = params;
    const { password } = await req.json();

    // Find note with password and content
    const note = await Note.findOne({ shareId }).select('+password +content');

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, note.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Return full note data if password is correct
    return NextResponse.json({
      content: note.content,
      title: note.title,
      allowEditing: note.allowEditing,
      isPasswordProtected: true
    });

  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json(
      { error: 'Failed to verify password' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { shareId: string } }
) {
  try {
    await connect();
    const { shareId } = params;
    const { allowEditing } = await req.json();
    
    const note = await Note.findOneAndUpdate(
      { shareId },
      { $set: { allowEditing } },
      { new: true }
    );
    
    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      allowEditing: note.allowEditing 
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
