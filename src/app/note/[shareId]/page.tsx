"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Editor from "@/components/Editor";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";

export default function ViewNote() {
  const { shareId } = useParams();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const [note, setNote] = useState<any>(null);
  const [password, setPassword] = useState("");
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const fetchNote = async () => {
      if (!shareId) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/notes/${shareId}`);
        const data = await response.json();

        if (response.ok) {
          if (data.requiresPassword) {
            setRequiresPassword(true);
          } else {
            setNote({
              ...data,
              allowEditing: isEditMode && data.allowEditing,
            });
          }
        } else {
          toast.error(data.error || "Failed to load note");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [shareId, isEditMode]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/notes/${shareId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setNote(data);
        setRequiresPassword(false);
        toast.success("Access granted");
      } else {
        toast.error("You entered the wrong password");
        setPassword("");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      toast.error("Failed to verify password");
      setPassword("");
    }
  };


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (requiresPassword) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen p-4 bg-[#1a1f2e]/80 backdrop-blur-md">
        <motion.div
          className="bg-[#1a1f2e] rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#2a3142]/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
  <h2 className="text-xl sm:text-2xl text-center font-bold text-white mb-6 bg-gradient-to-r from-blue-400/80 to-purple-600/80 bg-clip-text text-transparent relative">
  Password Protected Note
  <motion.span
    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/60 to-purple-600/60"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
  />
</h2>
<form onSubmit={handlePasswordSubmit} className="relative space-y-8 z-10">
  {/* Gradient Overlay with Pulse */}
  <motion.div
    className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1a1f2e]/70 to-[#151823]/70 opacity-50 blur-sm z-0"
    animate={{ opacity: [0.5, 0.7, 0.5] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  />
  <div className="relative z-10">
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your secure password"
        className="w-full bg-[#1e2535] text-white rounded-xl p-4 pr-12 border-2 border-[#2a3142] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/40 transition-all duration-300 text-sm sm:text-lg"
        autoComplete="current-password"
        spellCheck="false"
        autoFocus
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-[#2a3142]"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  </div>
  <motion.button
    type="submit"
    className="w-full bg-gradient-to-r from-blue-700/90 to-purple-700/90 text-white rounded-xl py-3 font-semibold relative overflow-hidden group shadow-lg"
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)" }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <span className="relative z-10">Access Note</span>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
    <motion.div
      className="absolute inset-0 rounded-xl border-2 border-transparent"
      style={{ background: "linear-gradient(45deg, #3b82f6, #a855f7, #ec4899, #3b82f6)", backgroundSize: "200%" }}
      animate={{ backgroundPosition: ["0%", "100%"] }}
      transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
    />
  </motion.button>
</form>
        </motion.div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#151823]">
        <div className="text-white text-lg">Note not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-[#151823]">
      <Editor
        initialContent={note?.content || ""}
        isSharedNote={true}
        allowEditing={isEditMode && note?.allowEditing}
        sharedTitle={note?.title || "Untitled Note"}
      />
    </div>
  );
}