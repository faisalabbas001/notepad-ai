import { useState , useEffect} from 'react';
import { XMarkIcon, QuestionMarkCircleIcon, ClipboardIcon, LockClosedIcon, KeyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Switch as HeadlessUISwitch } from '@headlessui/react';
import QRCode from 'react-qr-code';
import { toast } from 'react-hot-toast';

interface ShareModalProps {
  onClose: () => void;
  shareId: string;
  allowEditing: boolean;
  setAllowEditing: (value: boolean) => void;
  isPasswordProtected: boolean;
}

export default function ShareModal({
  onClose,
  shareId,
  allowEditing,
  setAllowEditing,
  isPasswordProtected
}: ShareModalProps) {
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localAllowEditing, setLocalAllowEditing] = useState(allowEditing);

  // Generate share URL with edit parameter
  const shareUrl = shareId 
    ? `${window.location.origin}/note/${shareId}${localAllowEditing ? '?edit=true' : ''}`
    : '';

  const handlePasswordVerification = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/notes/${shareId}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsPasswordVerified(true);
        toast.success('Password verified successfully!');
      } else {
        toast.error('Invalid password');
      }
    } catch (error) {
      toast.error('Failed to verify password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllowEditingChange = async (newValue: boolean) => {
    try {
      setIsLoading(true);
      setLocalAllowEditing(newValue); // Update local state immediately for smooth toggle

      const response = await fetch(`/api/notes/${shareId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          allowEditing: newValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update settings');
      }

      setAllowEditing(newValue);
      // Update URL without refreshing the page
      const newUrl = `${window.location.origin}/note/${shareId}${newValue ? '?edit=true' : ''}`;
      window.history.pushState({}, '', newUrl);
      
      toast.success(`Editing ${newValue ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update edit permissions');
      // Revert both local and parent state on failure
      setLocalAllowEditing(!newValue);
      setAllowEditing(!newValue);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render if no shareId
  if (!shareId) {
    return null;
  }

  // Show password verification if needed
  if (isPasswordProtected && !isPasswordVerified) {
    return (
      <div 
        className="fixed inset-0 z-50 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="absolute inset-0 bg-[#1a1f2e]/90 backdrop-blur-sm" />
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#1a1f2e] to-[#151823] rounded-xl w-full max-w-md p-8 animate-modal-fade-in border border-[#2a3142]/50 shadow-2xl">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Password verification section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-yellow-500/10 rounded-lg">
                  <LockClosedIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Protected Note</h2>
                  <p className="text-sm text-white mt-0.5">Enter password to view content</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-[#151823] text-white rounded-lg p-3 pl-10 border border-[#2a3142] focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all outline-none"
                    autoFocus
                  />
                  <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  onClick={handlePasswordVerification}
                  disabled={isLoading}
                  className="relative w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 rounded-lg py-3 font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className={isLoading ? 'invisible' : ''}>
                    Unlock Note
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              </div>

              {/* Additional info */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheckIcon className="h-4 w-4" />
                <span>Secured with end-to-end encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Main share modal content
  return (
    <div className="fixed top-0 bottom-0 w-full h-screen inset-0 z-50">
      <div className="fixed top-0 bottom-0 w-full h-screen bg-[#1a1f2e]/80 backdrop-blur-md" />
      
      <div className="relative h-full flex items-center justify-center p-4">
        <div className="bg-[#1a1f2e] rounded-lg w-full max-w-md p-4 sm:p-6 animate-modal-fade-in border border-[#2a3142] shadow-2xl mx-4 sm:mx-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Share Note</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* QR Code and Link Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="bg-white p-2 sm:p-3 rounded-lg flex justify-center">
              <QRCode value={shareUrl} size={100} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 bg-[#151823] rounded-lg p-2 mb-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="bg-transparent text-gray-300 text-sm flex-1 outline-none overflow-x-auto whitespace-nowrap"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    toast.success('Link copied!');
                  }}
                  className="p-1.5 hover:bg-[#1a1f2e] rounded-md transition-colors flex-shrink-0"
                >
                  <ClipboardIcon className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                Anyone with this link can view{localAllowEditing ? ' and edit' : ''} the note.
              </p>
            </div>
          </div>

          {/* Allow Editing Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-white">Allow Editing</span>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <HeadlessUISwitch
              checked={localAllowEditing}
              onChange={handleAllowEditingChange}
              disabled={isLoading}
              className={`${
                localAllowEditing ? 'bg-green-500' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="sr-only">Allow editing</span>
              <span
                className={`${
                  localAllowEditing ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
              />
            </HeadlessUISwitch>
          </div>

          {/* Share buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank')}
              className="flex items-center justify-center gap-2 bg-[#1DA1F2]/10 text-[#1DA1F2] p-2.5 rounded-lg hover:bg-[#1DA1F2]/20 text-sm"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
              className="flex items-center justify-center gap-2 bg-[#4267B2]/10 text-[#4267B2] p-2.5 rounded-lg hover:bg-[#4267B2]/20 text-sm"
            >
              Share on Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
   