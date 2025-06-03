import { NextResponse } from 'next/server';
import { connect } from '@/utils/mongodb';
import Note from '@/models/Note';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    await connect();
    const data = await req.json();
    
    // Validate content
    if (!data.content) {
      return NextResponse.json(
        { error: 'Note content is required' },
        { status: 400 }
      );
    }
    
    const shareId = crypto.randomBytes(8).toString('hex');
    
    // Handle password protection
    let hashedPassword = null;
    let isPasswordProtected = false;
    
    if (data.passwordProtect && data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
      isPasswordProtected = true;
      console.log('Password protected note:', { isPasswordProtected, hasPassword: !!hashedPassword });
    }
    
    // Create note
    const noteData = {
      content: data.content,
      shareId,
      password: hashedPassword,
      isPasswordProtected,
      allowEditing: false,
      expiresAt: data.autoExpire ? new Date(Date.now() + (data.expireDays * 24 * 60 * 60 * 1000)) : null
    };

    const note = await Note.create(noteData);
    
    // Verify note was saved with password protection
    const savedNote = await Note.findById(note._id).select('+password +isPasswordProtected');
    console.log('Saved note:', {
      id: savedNote._id,
      isPasswordProtected: savedNote.isPasswordProtected,
      hasPassword: !!savedNote.password
    });
    
    return NextResponse.json({
      success: true,
      shareId: note.shareId,
      message: 'Note saved successfully'
    });

  } catch (error) {
    console.error('Error saving note:', error);
    return NextResponse.json(
      { error: 'Failed to save note' },
      { status: 500 }
    );
  }
}
