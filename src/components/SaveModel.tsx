import React, { useEffect, useState } from 'react'
import { Switch as HeadlessUISwitch } from '@headlessui/react';
import { XMarkIcon, QuestionMarkCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import ReactDOM from "react-dom";

interface SaveModalProps {
  onClose: () => void;
  onSave: (shareId: string) => void;
  content: string;
  autoExpire: boolean;
  setAutoExpire: (value: boolean) => void;
  expireDays: string;
  setExpireDays: (value: string) => void;
  passwordProtect: boolean;
  setPasswordProtect: (value: boolean) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}

export default function SaveModal({
  onClose,
  onSave,
  content,
  autoExpire,
  setAutoExpire,
  expireDays,
  setExpireDays,
  passwordProtect,
  setPasswordProtect,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: SaveModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Validate content
      if (!content.trim()) {
        toast.error('Note content cannot be empty');
        return;
      }

      // Validate passwords match if password protection is enabled
      if (passwordProtect && password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          autoExpire,
          expireDays: autoExpire ? expireDays : null,
          passwordProtect,
          password: passwordProtect ? password : null,
        }),
      });

      const data = await response.json();

      if (data.success && data.shareId) {
        toast.success('Note saved successfully!');
        onSave(data.shareId);
        onClose();
      } else {
        throw new Error(data.error || 'Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };
 
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Render the modal using a portal
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-screen z-50">
      <div className="fixed top-0 bottom-0 w-full h-screen  inset-0 bg-[#1a1f2e]/80 backdrop-blur-md  " />
      
      <div className="relative h-full flex items-center justify-center overflow-hidden p-4">
        <div className="bg-[#1a1f2e] rounded-lg w-full max-w-md p-6 animate-modal-fade-in border border-[#2a3142] shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Save Note</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">
            When you save your note, it's securely stored with encryption, added to "My Notes", and a shareable link is created — instantly!
          </p>

          {/* Auto Expire Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-white">Auto Expire</span>
              <button className="text-gray-400 hover:text-white">
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </button>
            </div>
            <HeadlessUISwitch
              checked={autoExpire}
              onChange={setAutoExpire}
              className={`${autoExpire ? 'bg-green-500' : 'bg-gray-700'}
                relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable auto expire</span>
              <span
                className={`${autoExpire ? 'translate-x-6' : 'translate-x-1'}
                  inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </HeadlessUISwitch>
          </div>

          {/* Expire Days Dropdown */}
          {autoExpire && (
            <select
              value={expireDays}
              onChange={(e) => setExpireDays(e.target.value)}
              className="w-full mb-4 bg-[#151823] text-white rounded-md p-2 border border-[#2a3142]"
            >
              <option value="1">1 Day</option>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
            </select>
          )}

          {/* Password Protect Toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-white">Password Protect</span>
            <HeadlessUISwitch
              checked={passwordProtect}
              onChange={setPasswordProtect}
              className={`${passwordProtect ? 'bg-green-500' : 'bg-gray-700'}
                relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable password protection</span>
              <span
                className={`${passwordProtect ? 'translate-x-6' : 'translate-x-1'}
                  inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </HeadlessUISwitch>
          </div>

          {/* Password Fields */}
          {passwordProtect && (
            <>
              {/* Warning Message */}
              <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-md p-4 mb-4">
                <div className="flex items-center gap-2 text-yellow-500">
                  <ExclamationCircleIcon className="h-5 w-5" />
                  <span className="font-medium">Important!</span>
                </div>
                <p className="text-yellow-500 text-sm mt-1">
                  Hyper Notepad will not be able to recover this password, so please keep it safe.
                </p>
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label className="block text-white mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#151823] text-white rounded-md p-2 pr-10 border border-[#2a3142]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400  transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-red-500 text-sm mt-1">Required</p>
              </div>

              {/* Confirm Password Input */}
              <div className="mb-6">
                <label className="block text-white mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#151823] text-white rounded-md p-2 pr-10 border border-[#2a3142]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full bg-white text-gray-900 rounded-md py-2 font-semibold 
              hover:bg-gray-100 transition-colors relative ${isSaving ? 'text-transparent' : ''}`}
          >
            {/* Static text (hidden during loading) */}
            Save Note

            {/* Loading spinner (shown during saving) */}
            {isSaving && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-7 w-7 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : (null as any)
  );
}