import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App safely (singleton)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider with Google Drive scopes
export const provider = new GoogleAuthProvider();

export const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
];

DRIVE_SCOPES.forEach((scope) => {
  provider.addScope(scope);
});

// Flag to track sign-in in flight
let isSigningIn = false;
// In-memory token cache (never stored in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

// Auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // User logged in but token not yet in memory from popup
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve access token from Google');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Drive API Types
export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  owners?: { displayName: string; emailAddress: string; photoLink?: string }[];
  shared?: boolean;
}

export interface DriveListResponse {
  files: DriveFileItem[];
  nextPageToken?: string;
}

// Fetch files from Google Drive
export const fetchDriveFiles = async (
  token: string,
  options: {
    folderId?: string;
    filterType?: 'all' | 'images' | 'videos' | 'folders';
    searchQuery?: string;
    pageSize?: number;
  } = {}
): Promise<DriveListResponse> => {
  const { folderId, filterType = 'all', searchQuery = '', pageSize = 24 } = options;

  let queryParts: string[] = ['trashed = false'];

  if (folderId) {
    queryParts.push(`'${folderId}' in parents`);
  }

  if (filterType === 'images') {
    queryParts.push("mimeType contains 'image/'");
  } else if (filterType === 'videos') {
    queryParts.push("mimeType contains 'video/'");
  } else if (filterType === 'folders') {
    queryParts.push("mimeType = 'application/vnd.google-apps.folder'");
  }

  if (searchQuery.trim()) {
    const escaped = searchQuery.replace(/'/g, "\\'");
    queryParts.push(`name contains '${escaped}'`);
  }

  const q = queryParts.join(' and ');
  const fields = 'nextPageToken, files(id, name, mimeType, size, modifiedTime, thumbnailLink, webViewLink, webContentLink, iconLink, owners, shared)';
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    q
  )}&pageSize=${pageSize}&orderBy=folder,modifiedTime desc&fields=${encodeURIComponent(
    fields
  )}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Google Drive API error (${res.status})`);
  }

  return res.json();
};

// Create a new folder in Google Drive (e.g. for an Event or Client)
export const createDriveFolder = async (
  token: string,
  folderName: string,
  parentFolderId?: string
): Promise<DriveFileItem> => {
  const metadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const res = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,mimeType,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'ফোল্ডার তৈরি করতে ব্যর্থ হয়েছে');
  }

  return res.json();
};

// Upload a photo or video file directly to Google Drive
export const uploadFileToDrive = async (
  token: string,
  file: File,
  parentFolderId?: string,
  onProgress?: (progress: number) => void
): Promise<DriveFileItem> => {
  const metadata: any = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', file);

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,thumbnailLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'ফাইল আপলোড ব্যর্থ হয়েছে');
  }

  if (onProgress) onProgress(100);
  return res.json();
};

// Delete a file from Google Drive (MUST be preceded by UI confirmation dialog)
export const deleteDriveFile = async (
  token: string,
  fileId: string
): Promise<boolean> => {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok && res.status !== 204) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'ফাইল মুছতে ব্যর্থ হয়েছে');
  }

  return true;
};
