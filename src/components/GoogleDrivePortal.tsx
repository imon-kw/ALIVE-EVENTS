import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  FolderLock,
  Download,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Play,
  Image as ImageIcon,
  Film,
  Clock,
  Sparkles,
  UploadCloud,
  FolderPlus,
  Trash2,
  LogOut,
  Folder,
  FileText,
  User as UserIcon,
  ArrowRight,
  ChevronRight,
  Eye
} from 'lucide-react';
import { User } from 'firebase/auth';
import { DriveDelivery } from '../types';
import { OWNER_INFO } from '../data';
import {
  initAuth,
  googleSignIn,
  logout,
  fetchDriveFiles,
  createDriveFolder,
  uploadFileToDrive,
  deleteDriveFile,
  DriveFileItem,
  getAccessToken
} from '../lib/driveAuth';

export const GoogleDrivePortal: React.FC = () => {
  // Mode selection: 'drive-explorer' (Live Google Drive API) vs 'client-lookup' (Event Booking lookup)
  const [activeTab, setActiveTab] = useState<'drive-explorer' | 'client-lookup'>('drive-explorer');

  // Google Drive Auth state
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Google Drive Files state
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'images' | 'videos' | 'folders'>('all');
  const [driveSearch, setDriveSearch] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
  const [folderBreadcrumbs, setFolderBreadcrumbs] = useState<{ id?: string; name: string }[]>([
    { name: 'My Drive' },
  ]);

  // Actions state
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Deletion Confirmation Modal state (MANDATORY for destructive ops)
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Client Delivery Lookup state
  const [searchQuery, setSearchQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DriveDelivery | null>(null);
  const [lookupError, setLookupError] = useState('');
  const [selectedVideoModal, setSelectedVideoModal] = useState<string | null>(null);
  const [revisionRequested, setRevisionRequested] = useState(false);
  const [revisionNote, setRevisionNote] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Auth state on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setAuthUser(user);
        setAccessToken(token);
        if (token) {
          loadFiles(token);
        }
      },
      () => {
        setAuthUser(null);
        setAccessToken(null);
        setDriveFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch files when folder or filter changes
  const loadFiles = async (token?: string, folderId?: string, filter?: typeof filterType, search?: string) => {
    const activeToken = token || accessToken || getAccessToken();
    if (!activeToken) return;

    setFilesLoading(true);
    setFilesError(null);

    try {
      const response = await fetchDriveFiles(activeToken, {
        folderId: folderId !== undefined ? folderId : currentFolderId,
        filterType: filter || filterType,
        searchQuery: search !== undefined ? search : driveSearch,
      });
      setDriveFiles(response.files || []);
    } catch (err: any) {
      console.error('Error loading drive files:', err);
      setFilesError(err.message || 'গুগল ড্রাইভের ফাইল লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setFilesLoading(false);
    }
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setAuthUser(result.user);
        setAccessToken(result.accessToken);
        await loadFiles(result.accessToken);
        setStatusMessage({ type: 'success', text: `স্বাগতম ${result.user.displayName || 'ব্যবহারকারী'}! গুগল ড্রাইভ সংযুক্ত হয়েছে।` });
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setAuthError(err.message || 'গুগল সাইন-ইন করতে ব্যর্থ হয়েছে। অনুগ্রহ করে পপ-আপ অনুমতি চেক করুন।');
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    await logout();
    setAuthUser(null);
    setAccessToken(null);
    setDriveFiles([]);
    setStatusMessage({ type: 'success', text: 'গুগল ড্রাইভ থেকে সফলভাবে লগআউট হয়েছেন।' });
  };

  // Open a Folder
  const handleOpenFolder = (folder: DriveFileItem) => {
    setCurrentFolderId(folder.id);
    setFolderBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }]);
    loadFiles(accessToken || undefined, folder.id, filterType, driveSearch);
  };

  // Navigate Breadcrumb
  const handleBreadcrumbClick = (index: number) => {
    const target = folderBreadcrumbs[index];
    const newCrumbs = folderBreadcrumbs.slice(0, index + 1);
    setFolderBreadcrumbs(newCrumbs);
    setCurrentFolderId(target.id);
    loadFiles(accessToken || undefined, target.id, filterType, driveSearch);
  };

  // Create Folder Handler
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newFolderName.trim()) return;

    try {
      await createDriveFolder(accessToken, newFolderName.trim(), currentFolderId);
      setNewFolderName('');
      setIsCreatingFolder(false);
      setStatusMessage({ type: 'success', text: `নতুন ফোল্ডার "${newFolderName}" তৈরি হয়েছে!` });
      loadFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'ফোল্ডার তৈরি করা যায়নি।' });
    }
  };

  // Upload File Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !accessToken) return;

    setIsUploading(true);
    setUploadProgress(10);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await uploadFileToDrive(accessToken, file, currentFolderId, (prog) => {
          setUploadProgress(Math.round(((i + 1) / files.length) * 100));
        });
      }
      setStatusMessage({ type: 'success', text: `${files.length}টি ফাইল সফলভাবে গুগল ড্রাইভে আপলোড করা হয়েছে!` });
      loadFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'ফাইল আপলোড ব্যর্থ হয়েছে।' });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Delete File Handler (Triggered only after confirmation)
  const handleExecuteDelete = async () => {
    if (!accessToken || !deleteConfirmTarget) return;

    setIsDeleting(true);
    try {
      await deleteDriveFile(accessToken, deleteConfirmTarget.id);
      setStatusMessage({ type: 'success', text: `"${deleteConfirmTarget.name}" সফলভাবে মুছে ফেলা হয়েছে।` });
      setDeleteConfirmTarget(null);
      loadFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'ফাইল মুছতে সমস্যা হয়েছে।' });
    } finally {
      setIsDeleting(false);
    }
  };

  // Client Delivery Lookup Handler
  const handleLookupSearch = async (queryToSearch?: string) => {
    const q = (queryToSearch || searchQuery).trim();
    if (!q) {
      setLookupError('অনুগ্রহ করে আপনার বুকিং আইডি অথবা মোবাইল নম্বর লিখুন।');
      return;
    }

    setLookupLoading(true);
    setLookupError('');
    setDeliveryData(null);
    setRevisionRequested(false);

    try {
      const res = await fetch(`/api/drive-lookup?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (data.success && data.delivery) {
        setDeliveryData(data.delivery);
      } else {
        setLookupError(data.message || 'কোন তথ্য পাওয়া যায়নি। অনুগ্রহ করে সঠিক নম্বর দিন।');
      }
    } catch (err) {
      setLookupError('সার্ভারে যোগাযোগ করতে সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLookupLoading(false);
    }
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '—';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return '—';
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    if (num < 1024 * 1024 * 1024) return `${(num / (1024 * 1024)).toFixed(1)} MB`;
    return `${(num / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  return (
    <section id="drive-portal" className="py-24 bg-stone-950 border-b border-stone-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/5 border border-amber-500/30 text-amber-400 text-[11px] font-mono uppercase tracking-widest mb-3">
            <FolderLock className="w-3.5 h-3.5 text-amber-400" />
            <span>GOOGLE DRIVE WORKSPACE INTEGRATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            গুগল ড্রাইভ ক্লাউড পোর্টাল
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            লাইভ গুগল ড্রাইভ ইন্টিগ্রেশনের মাধ্যমে আপনার ইভেন্টের 4K সিনেমাটিক ভিডিও, হাই-রেজোলিউশন ছবি ব্রাউজ, আপলোড ও তাৎক্ষণিক ডাউনলোড করুন।
          </p>
        </div>

        {/* Tab Selector: Live Drive Explorer vs Delivery Lookup */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-stone-900 border border-stone-800">
            <button
              onClick={() => setActiveTab('drive-explorer')}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'drive-explorer'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="tab-drive-explorer"
            >
              <FolderLock className="w-3.5 h-3.5" />
              <span>লাইভ গুগল ড্রাইভ কানেকশন</span>
            </button>
            <button
              onClick={() => setActiveTab('client-lookup')}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'client-lookup'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="tab-client-lookup"
            >
              <Search className="w-3.5 h-3.5" />
              <span>ক্লায়েন্ট ডেলিভারি সার্চ</span>
            </button>
          </div>
        </div>

        {/* Global Status Message Toast */}
        {statusMessage && (
          <div
            className={`max-w-2xl mx-auto mb-6 p-3.5 text-xs font-mono border flex items-center justify-between animate-in fade-in ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-stone-400 hover:text-white px-2 py-0.5"
            >
              ✕
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: LIVE GOOGLE DRIVE EXPLORER (OAUTH + DRIVE API) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'drive-explorer' && (
          <div className="bg-stone-900/40 border border-stone-800 p-6 sm:p-8 shadow-2xl relative">
            {/* When NOT signed in with Google */}
            {!authUser ? (
              <div className="text-center py-12 px-4 max-w-lg mx-auto space-y-6">
                <div className="w-16 h-16 border border-amber-500/40 bg-stone-950 flex items-center justify-center text-amber-400 mx-auto">
                  <FolderLock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-100 mb-2">
                    গুগল অ্যাকাউন্ট সংযুক্ত করুন
                  </h3>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    আপনার গুগল ড্রাইভের ছবি, ইভেন্ট ভিডিও এবং ফোল্ডার সরাসরি এই পোর্টাল থেকে পরিচালনা করতে আপনার অনুমতিক্রমে সাইন-ইন করুন।
                  </p>
                </div>

                {authError && (
                  <div className="p-3 bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs font-mono">
                    {authError}
                  </div>
                )}

                {/* Official Sign in with Google Button Styling */}
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isAuthLoading}
                    className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-900 text-xs font-medium font-mono uppercase tracking-wider shadow-lg transition-all cursor-pointer disabled:opacity-50"
                    id="btn-google-drive-signin"
                  >
                    {isAuthLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-stone-700" />
                        <span>সংযোগ হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          />
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          />
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          />
                        </svg>
                        <span>Sign in with Google Drive</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] font-mono text-stone-500">
                  নিরাপদ OAuth 2.0 প্রমাণীকরণ • গুগল ওয়ার্কস্পেস ড্রাইভে সরাসরি অ্যাক্সেস
                </p>
              </div>
            ) : (
              /* When SIGNED IN: Active Drive Workspace Hub */
              <div className="space-y-6">
                {/* User Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-stone-800">
                  <div className="flex items-center gap-3">
                    {authUser.photoURL ? (
                      <img
                        src={authUser.photoURL}
                        alt={authUser.displayName || 'Google User'}
                        className="w-10 h-10 border border-amber-500/40"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 border border-amber-500/40 bg-stone-950 flex items-center justify-center text-amber-400">
                        <UserIcon className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-serif font-bold text-stone-100">
                          {authUser.displayName || 'Google Drive User'}
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          CONNECTED
                        </span>
                      </div>
                      <p className="text-xs font-mono text-stone-400">{authUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadFiles()}
                      disabled={filesLoading}
                      className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
                      title="রিফ্রেশ করুন"
                    >
                      <RefreshCw className={`w-4 h-4 ${filesLoading ? 'animate-spin text-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-rose-400 text-xs font-mono uppercase tracking-wider border border-stone-800 transition-colors flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>লগআউট</span>
                    </button>
                  </div>
                </div>

                {/* Toolbar: Breadcrumb Navigation & Controls */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Breadcrumb Path */}
                  <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono max-w-full pb-1">
                    {folderBreadcrumbs.map((crumb, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <ChevronRight className="w-3 h-3 text-stone-600 shrink-0" />}
                        <button
                          onClick={() => handleBreadcrumbClick(idx)}
                          className={`hover:text-amber-400 transition-colors whitespace-nowrap ${
                            idx === folderBreadcrumbs.length - 1
                              ? 'text-amber-400 font-bold underline underline-offset-4'
                              : 'text-stone-400'
                          }`}
                        >
                          {crumb.name}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Actions: New Folder & Upload */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <button
                      onClick={() => setIsCreatingFolder(!isCreatingFolder)}
                      className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/30 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                      id="btn-create-folder"
                    >
                      <FolderPlus className="w-3.5 h-3.5" />
                      <span>নতুন ফোল্ডার</span>
                    </button>

                    <label
                      className={`px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isUploading ? 'opacity-50 pointer-events-none' : ''
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{isUploading ? `আপলোড হচ্ছে (${uploadProgress}%)` : 'ফাইল আপলোড'}</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        id="drive-file-input"
                      />
                    </label>
                  </div>
                </div>

                {/* Create Folder Inline Form */}
                {isCreatingFolder && (
                  <form
                    onSubmit={handleCreateFolder}
                    className="p-4 bg-stone-950 border border-amber-500/40 flex flex-col sm:flex-row gap-2 animate-in fade-in"
                  >
                    <input
                      type="text"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="ফোল্ডারের নাম (যেমন: Alive Event - Wedding 2026)"
                      className="flex-1 px-3.5 py-2 bg-stone-900 text-xs font-serif text-white border border-stone-800 focus:outline-none focus:border-amber-500"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={!newFolderName.trim()}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono uppercase tracking-wider disabled:opacity-40"
                      >
                        তৈরি করুন
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCreatingFolder(false)}
                        className="px-3 py-2 bg-stone-900 text-stone-400 text-xs font-mono uppercase hover:text-white"
                      >
                        বাতিল
                      </button>
                    </div>
                  </form>
                )}

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-950 p-2.5 border border-stone-800">
                  {/* Filter Pills */}
                  <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto">
                    {[
                      { id: 'all', label: 'সকল ফাইল' },
                      { id: 'images', label: 'ফটোগ্রাফি' },
                      { id: 'videos', label: 'সিনেমাটিক ভিডিও' },
                      { id: 'folders', label: 'ফোল্ডার' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          setFilterType(f.id as any);
                          loadFiles(accessToken || undefined, currentFolderId, f.id as any, driveSearch);
                        }}
                        className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                          filterType === f.id
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                            : 'text-stone-400 hover:text-stone-200 border border-transparent'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Search within Drive */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={driveSearch}
                      onChange={(e) => {
                        setDriveSearch(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          loadFiles(accessToken || undefined, currentFolderId, filterType, driveSearch);
                        }
                      }}
                      placeholder="ড্রাইভে ফাইল খুঁজুন..."
                      className="w-full pl-8 pr-3 py-1.5 bg-stone-900 text-xs font-serif text-white placeholder-stone-600 border border-stone-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Drive File Grid */}
                {filesLoading ? (
                  <div className="py-20 text-center space-y-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-amber-400 mx-auto" />
                    <p className="text-xs font-mono text-stone-400">গুগল ড্রাইভ ফাইল লোড হচ্ছে...</p>
                  </div>
                ) : filesError ? (
                  <div className="p-6 bg-rose-950/20 border border-rose-500/40 text-center space-y-2">
                    <AlertCircle className="w-6 h-6 text-rose-400 mx-auto" />
                    <p className="text-xs font-mono text-rose-300">{filesError}</p>
                    <button
                      onClick={() => loadFiles()}
                      className="mt-2 px-4 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono hover:bg-rose-500/30"
                    >
                      পুনরায় চেষ্টা করুন
                    </button>
                  </div>
                ) : driveFiles.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-stone-800 p-8 space-y-3">
                    <Folder className="w-10 h-10 text-stone-600 mx-auto" />
                    <h4 className="text-base font-serif font-bold text-stone-300">এই ফোল্ডারে কোন ফাইল নেই</h4>
                    <p className="text-xs text-stone-500 font-light max-w-sm mx-auto">
                      উপরের "ফাইল আপলোড" বাটনে ক্লিক করে সরাসরি গুগল ড্রাইভে ছবি বা ভিডিও আপলোড করুন।
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                    {driveFiles.map((file) => {
                      const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                      const isImage = file.mimeType.startsWith('image/');
                      const isVideo = file.mimeType.startsWith('video/');

                      return (
                        <div
                          key={file.id}
                          className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-3.5 flex flex-col justify-between transition-all group relative"
                        >
                          <div>
                            {/* File Thumbnail or Icon */}
                            <div
                              onClick={() => isFolder && handleOpenFolder(file)}
                              className={`h-28 bg-stone-900/60 border border-stone-800/80 mb-3 flex items-center justify-center overflow-hidden relative ${
                                isFolder ? 'cursor-pointer' : ''
                              }`}
                            >
                              {file.thumbnailLink ? (
                                <img
                                  src={file.thumbnailLink}
                                  alt={file.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : isFolder ? (
                                <Folder className="w-10 h-10 text-amber-400 fill-amber-500/20" />
                              ) : isVideo ? (
                                <Film className="w-10 h-10 text-amber-400" />
                              ) : isImage ? (
                                <ImageIcon className="w-10 h-10 text-amber-400" />
                              ) : (
                                <FileText className="w-10 h-10 text-stone-500" />
                              )}

                              {isFolder && (
                                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-stone-950/90 text-amber-400 text-[9px] font-mono uppercase">
                                  FOLDER
                                </span>
                              )}
                            </div>

                            {/* File Name & Info */}
                            <h4
                              onClick={() => isFolder && handleOpenFolder(file)}
                              className={`text-xs font-serif font-bold text-stone-200 truncate ${
                                isFolder ? 'cursor-pointer hover:text-amber-400' : ''
                              }`}
                              title={file.name}
                            >
                              {file.name}
                            </h4>

                            <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mt-1">
                              <span>{formatFileSize(file.size)}</span>
                              <span>
                                {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : ''}
                              </span>
                            </div>
                          </div>

                          {/* Item Actions */}
                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-900">
                            {isFolder ? (
                              <button
                                onClick={() => handleOpenFolder(file)}
                                className="text-[11px] font-mono uppercase text-amber-400 hover:underline flex items-center gap-1"
                              >
                                <span>ফোল্ডার খুলুন</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ) : (
                              <a
                                href={file.webViewLink || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-mono uppercase text-amber-400 hover:underline flex items-center gap-1"
                                title="গুগল ড্রাইভে দেখুন"
                              >
                                <Eye className="w-3 h-3" />
                                <span>ড্রাইভে প্রিভিউ</span>
                              </a>
                            )}

                            {/* Delete Action (Triggers Confirmation Modal) */}
                            <button
                              onClick={() => setDeleteConfirmTarget(file)}
                              className="text-stone-500 hover:text-rose-400 p-1 transition-colors"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: CLIENT DELIVERY LOOKUP (EVENT ID / PHONE NUMBER) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'client-lookup' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-stone-900/40 p-2 border border-stone-800 focus-within:border-amber-500 transition-all">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLookupSearch()}
                      placeholder="মোবাইল নম্বর বা বুকিং আইডি দিন (যেমন: 01711223344)"
                      className="w-full pl-10 pr-4 py-3 bg-stone-950 text-white placeholder-stone-600 text-xs font-mono border border-stone-800 focus:outline-none focus:border-amber-500"
                      id="drive-lookup-input"
                    />
                  </div>
                  <button
                    onClick={() => handleLookupSearch()}
                    disabled={lookupLoading}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0 disabled:opacity-50 cursor-pointer"
                    id="drive-lookup-btn"
                  >
                    {lookupLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>সার্চ হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <FolderLock className="w-3.5 h-3.5" />
                        <span>ফাইল খুঁজুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Demo Test Buttons */}
              <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-xs text-stone-500 font-mono">
                <span className="text-[11px] uppercase tracking-wider">দ্রুত ডেমো টেস্ট:</span>
                <button
                  onClick={() => {
                    setSearchQuery('01711223344');
                    handleLookupSearch('01711223344');
                  }}
                  className="px-2.5 py-1 bg-stone-900/60 hover:bg-stone-800 text-amber-400 border border-stone-800 hover:border-amber-500/40 transition-colors text-[11px]"
                >
                  ওয়েডিং ড্রাইভ (01711223344)
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('01899887766');
                    handleLookupSearch('01899887766');
                  }}
                  className="px-2.5 py-1 bg-stone-900/60 hover:bg-stone-800 text-amber-400 border border-stone-800 hover:border-amber-500/40 transition-colors text-[11px]"
                >
                  হলুদ নাইট (01899887766)
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('01788055586');
                    handleLookupSearch('01788055586');
                  }}
                  className="px-2.5 py-1 bg-stone-900/60 hover:bg-stone-800 text-amber-400 border border-stone-800 hover:border-amber-500/40 transition-colors text-[11px]"
                >
                  ১৫০০৳ ভিডিওগ্রাফি (01788055586)
                </button>
              </div>
            </div>

            {/* Error Alert */}
            {lookupError && (
              <div className="max-w-2xl mx-auto p-4 bg-rose-950/20 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-300">{lookupError}</p>
                  <p className="text-[11px] text-rose-400/70 mt-1">
                    কোন সমস্যা হলে সরাসরি ইমন ভাইয়ের সাথে যোগাযোগ করুন:{' '}
                    <a href={`tel:${OWNER_INFO.phone}`} className="underline font-bold">
                      {OWNER_INFO.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Delivery Results Card */}
            {deliveryData && (
              <div className="max-w-3xl mx-auto bg-stone-900/30 border border-amber-500/50 p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                {/* Top Status */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      BOOKING ID: {deliveryData.id}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-stone-100 mt-2.5">
                      {deliveryData.eventTitle}
                    </h3>
                    <p className="text-xs text-stone-400 font-light mt-0.5">
                      ক্লায়েন্ট: <strong className="text-stone-200">{deliveryData.clientName}</strong> • <span className="font-mono">{deliveryData.clientPhone}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono uppercase tracking-wider">
                      <CheckCircle className="w-3 h-3" />
                      {deliveryData.status}
                    </span>
                    <p className="text-xs text-stone-400 mt-1.5 flex items-center justify-end gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      {deliveryData.eventDate}
                    </p>
                  </div>
                </div>

                {/* Delivery Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                  <div className="p-3.5 bg-stone-950 border border-stone-800 text-center">
                    <ImageIcon className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-2xl font-serif font-bold text-white">{deliveryData.totalPhotos}</p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">এডিটেড ফটো</p>
                  </div>

                  <div className="p-3.5 bg-stone-950 border border-stone-800 text-center">
                    <Film className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-2xl font-serif font-bold text-white">{deliveryData.totalVideos}</p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">সিনেমাটিক ভিডিও</p>
                  </div>

                  <div className="p-3.5 bg-stone-950 border border-stone-800 text-center">
                    <Sparkles className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-lg font-serif font-bold text-white mt-1">LIFETIME</p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">ড্রাইভ স্টোরেজ</p>
                  </div>

                  <div className="p-3.5 bg-stone-950 border border-stone-800 text-center">
                    <span className="text-lg font-serif font-bold text-amber-400 mt-1 block">4K / HD</span>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mt-1">ফুল রেজোলিউশন</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={deliveryData.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all text-center"
                    id="btn-open-google-drive-link"
                  >
                    <FolderLock className="w-4 h-4" />
                    <span>গুগল ড্রাইভ ফোল্ডার খুলুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {deliveryData.highlightReel && (
                    <button
                      onClick={() => setSelectedVideoModal(deliveryData.highlightReel || null)}
                      className="py-3.5 px-5 bg-transparent hover:bg-stone-800 text-stone-200 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-stone-700 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>হাইলাইটস রিলস দেখুন</span>
                    </button>
                  )}
                </div>

                {/* Revision / Re-edit Request Toggle */}
                <div className="mt-6 pt-4 border-t border-stone-800">
                  {!revisionRequested ? (
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                      <span className="text-stone-400 font-light">
                        কোন ছবি বা ভিডিওতে বাড়তি কালার এডিটিং অথবা পরিবর্তন চান?
                      </span>
                      <button
                        onClick={() => setRevisionRequested(true)}
                        className="text-amber-400 hover:underline font-mono text-[11px] uppercase tracking-wider flex items-center gap-1"
                      >
                        রিভিশন / পরিবর্তনের অনুরোধ পাঠান →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 p-4 bg-stone-950 border border-stone-800">
                      <p className="text-xs font-semibold text-stone-200">
                        কী পরিবর্তন চান তা লিখুন (যেমন: ছবির নম্বর বা গানের পরিবর্তন):
                      </p>
                      <textarea
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                        placeholder="আপনার বার্তা লিখুন..."
                        rows={2}
                        className="w-full p-2.5 bg-stone-900 text-xs text-white border border-stone-700 focus:outline-none focus:border-amber-500 font-light"
                      />
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/8801788055586?text=${encodeURIComponent(
                            `আসসালামু আলাইকুম ইমন ভাই, বুকিং আইডি: ${deliveryData.id} (${deliveryData.clientName})-এ রিভিশন রিকোয়েস্ট: ${revisionNote}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5"
                        >
                          হোয়াটসঅ্যাপে পাঠান
                        </a>
                        <button
                          onClick={() => setRevisionRequested(false)}
                          className="px-3 py-2 bg-stone-800 text-stone-400 text-xs font-mono uppercase hover:text-white"
                        >
                          বাতিল
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Feature Cards about Google Drive Policy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          <div className="p-6 bg-stone-900/20 border border-stone-800">
            <h4 className="text-sm font-serif font-bold text-stone-100 mb-2 flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-400" />
              হাই-স্পিড ওরিজিনাল কোয়ালিটি
            </h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              কোন প্রকার কম্প্রেশন বা কোয়ালিটি লস ছাড়া ক্যামেরা থেকে ডাইরেক্ট 4K ও হাই-রেজোলিউশন ফটো ড্রাইভ থেকে ডাউনলোড করতে পারবেন।
            </p>
          </div>

          <div className="p-6 bg-stone-900/20 border border-stone-800">
            <h4 className="text-sm font-serif font-bold text-stone-100 mb-2 flex items-center gap-2">
              <FolderLock className="w-4 h-4 text-amber-400" />
              সিকিউর ফ্যামিলি শেয়ারিং
            </h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              এক ক্লিকে গুগল ড্রাইভ লিংক কপি করে দেশ ও বিদেশের যেকোনো আত্মীয়-স্বজন বা বন্ধুদের সাথে সরাসরি শেয়ার করা যায়।
            </p>
          </div>

          <div className="p-6 bg-stone-900/20 border border-stone-800">
            <h4 className="text-sm font-serif font-bold text-stone-100 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              আজীবন ব্যাকআপ নিশ্চয়তা
            </h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              এলাইভ ইভেন্টের প্রতিটি গ্রাহকের স্মৃতি আমাদের প্রাইভেট ক্লাউড ও গুগল ড্রাইভে সুরক্ষিত থাকে আজীবন।
            </p>
          </div>
        </div>
      </div>

      {/* MANDATORY User Confirmation Dialog for Destructive Operations */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-rose-500/60 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-serif font-bold text-stone-100">
                ফাইল মুছে ফেলার নিশ্চিতকরণ
              </h4>
            </div>

            <p className="text-xs text-stone-300 font-light leading-relaxed">
              আপনি কি নিশ্চিত যে আপনি আপনার গুগল ড্রাইভ থেকে{' '}
              <strong className="text-rose-300 font-mono">"{deleteConfirmTarget.name}"</strong> ফাইলটি স্থায়ীভাবে মুছে ফেলতে চান?
            </p>

            <div className="p-3 bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-400 space-y-1">
              <div>ধরন: {deleteConfirmTarget.mimeType}</div>
              <div>সাইজ: {formatFileSize(deleteConfirmTarget.size)}</div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono uppercase tracking-wider border border-stone-800"
              >
                বাতিল
              </button>
              <button
                onClick={handleExecuteDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                id="btn-confirm-delete-drive-file"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>মুছে ফেলা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>হ্যাঁ, মুছে ফেলুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Preview */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 max-w-2xl w-full p-4 relative">
            <button
              onClick={() => setSelectedVideoModal(null)}
              className="absolute top-2 right-3 text-stone-400 hover:text-white text-xl font-bold p-1 z-10"
            >
              ✕
            </button>
            <h4 className="text-sm font-serif font-bold text-white mb-2">হাইলাইটস রিলস প্রিভিউ</h4>
            <div className="aspect-video overflow-hidden bg-black">
              <video
                src={selectedVideoModal}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
