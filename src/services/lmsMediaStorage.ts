// IndexedDB storage service for local files (videos, PDFs, images, docs)
// Enables storing large files (100MB+) locally without hitting localStorage 5MB quota.

const DB_NAME = 'vidya_lms_media_db_v1';
const STORE_NAME = 'media_blobs';
const DB_VERSION = 1;

interface StoredMediaRecord {
  id: string;
  name: string;
  type: string;
  size: number;
  data: Blob;
  createdAt: number;
}

// In-memory cache of object URLs to avoid recreating them constantly
const objectUrlCache = new Map<string, string>();

function openMediaDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const LmsMediaStorage = {
  /**
   * Save a local file (video, PDF, etc.) into IndexedDB
   * Returns a generated media ID
   */
  async saveLocalFile(file: File): Promise<string> {
    const db = await openMediaDB();
    const mediaId = `media_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const record: StoredMediaRecord = {
      id: mediaId,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      data: file,
      createdAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);

      req.onsuccess = () => {
        // Cache the Object URL immediately
        const blobUrl = URL.createObjectURL(file);
        objectUrlCache.set(mediaId, blobUrl);
        resolve(mediaId);
      };
      req.onerror = () => reject(req.error);
    });
  },

  /**
   * Get an active Object URL for a given media ID
   */
  async getMediaUrl(mediaId: string): Promise<string | null> {
    if (!mediaId) return null;

    // Check memory cache first
    if (objectUrlCache.has(mediaId)) {
      return objectUrlCache.get(mediaId)!;
    }

    try {
      const db = await openMediaDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(mediaId);

        req.onsuccess = () => {
          const record = req.result as StoredMediaRecord | undefined;
          if (record && record.data) {
            const blobUrl = URL.createObjectURL(record.data);
            objectUrlCache.set(mediaId, blobUrl);
            resolve(blobUrl);
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  },

  /**
   * Delete a stored media file by ID
   */
  async deleteMedia(mediaId: string): Promise<void> {
    if (!mediaId) return;

    if (objectUrlCache.has(mediaId)) {
      URL.revokeObjectURL(objectUrlCache.get(mediaId)!);
      objectUrlCache.delete(mediaId);
    }

    try {
      const db = await openMediaDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(mediaId);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      // Ignored
    }
  },

  /**
   * Format file size to human readable (KB, MB)
   */
  formatFileSize(bytes: number): string {
    if (!bytes || bytes <= 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  },
};
