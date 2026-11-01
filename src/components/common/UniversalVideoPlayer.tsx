import React, { useState, useEffect } from 'react';
import { Play, RefreshCw, ShieldAlert } from 'lucide-react';
import { isLocalMediaSource, buildEmbedUrl } from '../../utils/videoUtils';
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
      {/* PLAYER DISPLAY */}
      {isLocalFile ? (
        resolvedLocalUrl ? (
          <video
            key={`${resolvedLocalUrl}-${reloadKey}`}
            src={resolvedLocalUrl}
            controls
            autoPlay={autoPlay}
            playsInline
            poster={poster}
            className="w-full h-full object-contain bg-black"
            onError={() => setHasError(true)}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
            <Play className="w-12 h-12 text-blue-400 mb-2 animate-bounce" />
            <p className="text-sm font-black">Loading local video file...</p>
          </div>
        )
      ) : embedUrl ? (
        /* The container clips the top 56px to completely hide the YouTube title bar and channel logo */
        <div className="relative w-full h-full overflow-hidden bg-black">
          <iframe
            key={`${embedUrl}-${reloadKey}`}
            src={embedUrl}
            title={title}
            className="w-full border-0 absolute"
            style={{
              top: '-56px',
              left: '0',
              width: '100%',
              height: 'calc(100% + 56px)',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
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
