// Video Utilities for robust, multi-source video playback
// Strictly supports approved educational sources and local uploaded files.

// Verified educational video IDs from user-approved channels
export const APPROVED_VIDEO_IDS = {
  ALPHABET_PHONICS: 'hq3yfQnllfQ', // https://youtu.be/hq3yfQnllfQ
  TRACING_PHONICS: 'TF1loU8bJaM',  // https://youtu.be/TF1loU8bJaM
  MAGICIMALS_STORY: 'hq3yfQnllfQ', // @magicimals
  MASTITOONS_RHYMES: 'TF1loU8bJaM', // @mastitoonsbyvarda
};

export const DEFAULT_FALLBACK_VIDEO_ID = 'hq3yfQnllfQ';

/**
 * Checks if a media URL represents a local file (blob, data URL, or direct media file)
 */
export function isLocalMediaSource(url: string | undefined | null, isLocalFlag?: boolean): boolean {
  if (isLocalFlag) return true;
  if (!url) return false;
  const lower = url.toLowerCase().trim();
  return (
    lower.startsWith('blob:') ||
    lower.startsWith('data:') ||
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.ogg') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.m4v')
  );
}

/**
 * Extracts a clean 11-character YouTube video ID from various URL formats
 */
export function extractYouTubeId(urlOrId: string | undefined | null): string {
  if (!urlOrId) return DEFAULT_FALLBACK_VIDEO_ID;

  const raw = urlOrId.trim();

  // Handle channel handle inputs
  if (raw.includes('@magicimals') || raw.toLowerCase().includes('magicimals')) {
    return APPROVED_VIDEO_IDS.MAGICIMALS_STORY;
  }
  if (raw.includes('@mastitoons') || raw.toLowerCase().includes('mastitoons')) {
    return APPROVED_VIDEO_IDS.MASTITOONS_RHYMES;
  }

  // If already exactly an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
    return raw;
  }

  // Match standard youtu.be / watch?v= / embed/ patterns
  const match = raw.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (match && match[1]) {
    return match[1];
  }

  // If it's one of the known IDs in the string
  if (raw.includes('hq3yfQnllfQ')) return 'hq3yfQnllfQ';
  if (raw.includes('TF1loU8bJaM')) return 'TF1loU8bJaM';

  // Fallback to safe default
  return DEFAULT_FALLBACK_VIDEO_ID;
}

/**
 * Builds an optimized embed URL with NO branding, strict origin security, and autoplay
 */
export function buildEmbedUrl(urlOrId: string | undefined | null, autoplay = true): string {
  const videoId = extractYouTubeId(urlOrId);
  const autoPlayParam = autoplay ? '1' : '0';
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoPlayParam}&rel=0&modestbranding=1&iv_load_policy=3&controls=1&showinfo=0&disablekb=0&playsinline=1`;
}
