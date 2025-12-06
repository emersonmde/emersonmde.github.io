import { useEffect, useRef } from 'react';

interface Photo {
  id: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

interface LightboxProps {
  photo: Photo;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

export default function Lightbox({
  photo,
  onClose,
  onPrevious,
  onNext,
  currentIndex,
  totalCount,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Focus trap
  useEffect(() => {
    overlayRef.current?.focus();
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleDownload = () => {
    // Get the highest resolution image from srcSet
    const srcSetParts = photo.srcSet.split(',');
    const highestRes = srcSetParts[srcSetParts.length - 1]?.trim().split(' ')[0] || photo.src;

    const link = document.createElement('a');
    link.href = highestRes;
    link.download = `photo-${photo.id}.jpg`;
    link.click();
  };

  return (
    <div
      ref={overlayRef}
      className="lightbox-overlay"
      onClick={handleOverlayClick}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${currentIndex + 1} of ${totalCount}`}
    >
      <div className="lightbox-container">
        {/* TUI-style panel border */}
        <div className="lightbox-border-top">
          <span>┌─ </span>
          <span className="lightbox-title">photo-{photo.id}</span>
          <span className="lightbox-line"> ─</span>
          <span>┐</span>
        </div>

        <div className="lightbox-content">
          <span className="lightbox-v-border">│</span>
          <div className="lightbox-image-wrapper">
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(max-width: 640px) 95vw, 80vw"
              alt=""
              className="lightbox-image"
            />
          </div>
          <span className="lightbox-v-border">│</span>
        </div>

        <div className="lightbox-border-bottom">
          <span>└</span>
          <span className="lightbox-line">─</span>
          <span>┘</span>
        </div>

        {/* Controls */}
        <div className="lightbox-controls">
          <button
            className="lightbox-btn"
            onClick={onPrevious}
            aria-label="Previous photo"
          >
            ← prev
          </button>

          <span className="lightbox-counter">
            {currentIndex + 1} / {totalCount}
          </span>

          <button
            className="lightbox-btn"
            onClick={handleDownload}
            aria-label="Download photo"
          >
            [download]
          </button>

          <button
            className="lightbox-btn"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            [close]
          </button>

          <button
            className="lightbox-btn"
            onClick={onNext}
            aria-label="Next photo"
          >
            next →
          </button>
        </div>

        {/* Keyboard hints */}
        <div className="lightbox-hints">
          <span>←/→ or h/l navigate</span>
          <span>esc or q close</span>
        </div>
      </div>

      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(24, 24, 25, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--es-space-4);
        }

        .lightbox-container {
          display: flex;
          flex-direction: column;
          max-width: 90vw;
          max-height: 90vh;
        }

        .lightbox-border-top,
        .lightbox-border-bottom {
          display: flex;
          color: var(--es-border-focus);
          font-family: var(--es-font-mono);
          white-space: nowrap;
        }

        .lightbox-title {
          color: var(--es-green);
        }

        .lightbox-line {
          flex-grow: 1;
          overflow: hidden;
        }

        .lightbox-line::before {
          content: '────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────';
          white-space: nowrap;
        }

        .lightbox-content {
          display: flex;
          flex-grow: 1;
          min-height: 0;
        }

        .lightbox-v-border {
          color: var(--es-border-focus);
          font-family: var(--es-font-mono);
        }

        .lightbox-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--es-space-4);
          min-width: 0;
          min-height: 0;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
        }

        .lightbox-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--es-space-4);
          padding: var(--es-space-3) 0;
          flex-wrap: wrap;
        }

        .lightbox-btn {
          background: none;
          border: none;
          color: var(--es-blue);
          font-family: var(--es-font-mono);
          font-size: var(--es-text-sm);
          cursor: pointer;
          padding: var(--es-space-1) var(--es-space-2);
          transition: color var(--es-duration-fast) var(--es-easing);
        }

        .lightbox-btn:hover {
          color: var(--es-green);
        }

        .lightbox-counter {
          color: var(--es-grey);
          font-size: var(--es-text-sm);
        }

        .lightbox-hints {
          display: flex;
          justify-content: center;
          gap: var(--es-space-6);
          color: var(--es-grey-dim);
          font-size: var(--es-text-xs);
        }

        @media (max-width: 640px) {
          .lightbox-hints {
            display: none;
          }

          .lightbox-controls {
            gap: var(--es-space-2);
          }
        }
      `}</style>
    </div>
  );
}
