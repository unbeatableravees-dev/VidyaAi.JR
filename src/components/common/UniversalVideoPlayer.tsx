import React, { useState, useEffect } from 'react';
import { Play, Sparkles, RefreshCw, Volume2, ShieldAlert } from 'lucide-react';
import { isLocalMediaSource, extractYouTubeId, buildEmbedUrl } from '../../utils/videoUtils';
import { LmsMediaStorage } from '../../services/lmsMediaStorage';

interface UniversalVideoPlayerProps {
  src?: string;
  isLocal?: boolean;
  localFileId?: string;
  title?: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
}

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  src,
  isLocal = false,
  localFileId,
  title = 'Educational Lesson',
  className = '',
  poster,
  autoPlay = true,
}) => {
  const [resolvedLocalUrl, setResolvedLocalUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const isLocalFile = isLocal || Boolean(localFileId) || isLocalMediaSource(src);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    if (isLocalFile && localFileId) {
      LmsMediaStorage.getMediaUrl(localFileId)
        .then((url) => {
          if (isMounted) {
            if (url) {
              setResolvedLocalUrl(url);
            } else if (src) {
              setResolvedLocalUrl(src);
            } else {
              setHasError(true);
            }
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            if (src) setResolvedLocalUrl(src);
            else setHasError(true);
            setIsLoading(false);
          }
        });
    } else if (isLocalFile && src) {
      setResolvedLocalUrl(src);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [src, isLocalFile, localFileId, reloadKey]);

  const embedUrl = !isLocalFile ? buildEmbedUrl(src, autoPlay) : null;

  return (
    <div className={`relative aspect-video w-full bg-slate-950 overflow-hidden shadow-2xl select-none flex flex-col justify-between ${className}`}>
      {/* 1. TOP BRANDED SHIELD OVERLAY (Masks external logos & headers seamlessly) */}
      <div className="absolute top-0 left-0 right-0 z-20 h-10 bg-gradient-to-b from-slate-950/90 via-slate-900/60 to-transparent px-4 flex items-center justify-between pointer-events-none transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-wider text-white drop-shadow">
            Vidya AI Kids • HD Player
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-sm text-[10px] font-black text-white shadow-xs">
            {isLocalFile ? 'Local File' : 'Interactive Stream'}
          </span>
        </div>
      </div>

      {/* 2. PLAYER DISPLAY */}
      {isLocalFile ? (
        resolvedLocalUrl ? (
          <video
            key={`${resolvedLocalUrl}-${reloadKey}`}
            src={resolvedLocalUrl}
            controls
            autoPlay={autoPlay}
            playsInline
            poster={poster}
            className="w-full h-full object-contain bg-black z-10"
            onError={() => setHasError(true)}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center z-10">
            <Play className="w-12 h-12 text-blue-400 mb-2 animate-bounce" />
            <p className="text-sm font-black">Loading local video file...</p>
          </div>
        )
      ) : embedUrl ? (
        <iframe
          key={`${embedUrl}-${reloadKey}`}
          src={embedUrl}
          title={title}
          className="w-full h-full border-0 z-10 relative"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center z-10">
          <ShieldAlert className="w-12 h-12 text-amber-400 mb-2" />
          <p className="text-sm font-black">Video source not found</p>
        </div>
      )}

      {/* Error state overlay */}
      {hasError && (
        <div className="absolute inset-0 z-30 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center text-white">
          <ShieldAlert className="w-12 h-12 text-rose-500 mb-3" />
          <h4 className="text-sm font-black">Unable to play video source</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Please check your file or network connection. Tap below to reload.
          </p>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload Player
          </button>
        </div>
      )}
    </div>
  );
};
