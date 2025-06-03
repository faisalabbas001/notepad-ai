"use client";

import { useEffect, useState } from "react";
import { 
  DocumentTextIcon, 
  ClockIcon, 
  FolderIcon,
  DocumentPlusIcon,
  TrashIcon 
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { docsStorage } from "@/utils/docsStorage";

interface DocItem {
  id: string;
  title: string;
  lastModified: string;
  content: string;
}

export default function DocsPage() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load docs from localStorage
    const loadDocs = () => {
      try {
        const savedDocs = localStorage.getItem('notepad-docs');
        if (savedDocs) {
          setDocs(JSON.parse(savedDocs));
        }
      } catch (error) {
        console.error('Error loading docs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDocs();
  }, []);

  const handleDelete = (e: React.MouseEvent, docId: string) => {
    e.preventDefault(); // Prevent navigation
    if (confirm('Are you sure you want to delete this document?')) {
      docsStorage.deleteDoc(docId);
      setDocs(prev => prev.filter(doc => doc.id !== docId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Your Documents</h1>
          <p className="mt-2 text-gray-400">Access and manage your saved documents</p>
        </div>

        {docs.length === 0 ? (
          // Enhanced empty state with animated border
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-transparent via-[#4d9fff]/50 to-transparent animate-gradient-x overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4d9fff]/20 to-transparent animate-shimmer"></div>
            <div className="relative text-center py-16 px-4 rounded-2xl bg-[#1a1f2e]/95 backdrop-blur-sm">
              <div className="relative z-10">
                <DocumentPlusIcon className="mx-auto h-12 w-12 text-gray-400 animate-float" />
                <h3 className="mt-4 text-lg font-medium text-gray-300">No documents yet</h3>
                <p className="mt-2 text-gray-400 max-w-sm mx-auto">
                  Start creating documents to see them appear here. Your documents will be automatically saved.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center px-4 py-2 bg-[#4d9fff] text-white rounded-lg hover:bg-[#60a5fa] transition-all duration-300 hover:scale-105"
                >
                  <DocumentPlusIcon className="h-5 w-5 mr-2" />
                  Create New Document
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Updated Documents grid with delete button
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.map((doc) => (
              <div key={doc.id} className="group relative">
                <Link
                  href={`/?doc=${doc.id}`}
                  className="block p-4 rounded-xl bg-[#1a1f2e] border border-gray-800 hover:border-[#4d9fff]/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="h-6 w-6 text-[#4d9fff]" />
                      <h3 className="text-lg font-medium text-gray-200 group-hover:text-[#4d9fff] truncate">
                        {doc.title || 'Untitled Document'}
                      </h3>
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDelete(e, doc.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all duration-200"
                      title="Delete document"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>Last modified: {new Date(doc.lastModified).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="mt-2 text-gray-400 text-sm line-clamp-2">
                    {doc.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {docs.length > 0 && (
          <div className="mt-8 flex justify-end">
            <Link
              href="/"
              className="flex items-center px-4 py-2 bg-[#4d9fff] text-white rounded-lg hover:bg-[#60a5fa] transition-all duration-300"
            >
              <DocumentPlusIcon className="h-5 w-5 mr-2" />
              New Document
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
