import { useState, useEffect, useCallback } from 'react';
import Lightbox from './Lightbox';

interface Photo {
  id: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  apiUrl?: string;
}

export default function PhotoGallery({
  apiUrl = 'https://knsfeilz9j.execute-api.us-east-1.amazonaws.com/dev/photos',
}: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch photos');
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load photos');
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [apiUrl]);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (selectedIndex === 0) {
      setSelectedIndex(photos.length - 1);
    }
  }, [selectedIndex, photos.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (selectedIndex === photos.length - 1) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return;

      switch (e.key) {
        case 'Escape':
        case 'q':
          closeLightbox();
          break;
        case 'ArrowLeft':
        case 'h':
          goToPrevious();
          break;
        case 'ArrowRight':
        case 'l':
          goToNext();
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, goToPrevious, goToNext]);

  if (loading) {
    return (
      <div className="gallery-loading">
        <span className="loading-text">Loading photos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-error">
        <span className="error-text">Error: {error}</span>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="gallery-empty">
        <span className="empty-text">No photos found.</span>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className="gallery-item"
            onClick={() => openLightbox(index)}
            aria-label={`View photo ${index + 1}`}
          >
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              alt=""
              loading="lazy"
              className="gallery-image"
            />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          photo={photos[selectedIndex]}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
          currentIndex={selectedIndex}
          totalCount={photos.length}
        />
      )}

      <style>{`
        .gallery-loading,
        .gallery-error,
        .gallery-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          color: var(--es-grey);
        }

        .gallery-error {
          color: var(--es-red);
        }

        .gallery-grid {
          column-count: 4;
          column-gap: var(--es-space-3);
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            column-count: 3;
          }
        }

        @media (max-width: 768px) {
          .gallery-grid {
            column-count: 2;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            column-count: 1;
          }
        }

        .gallery-item {
          display: block;
          width: 100%;
          padding: 0;
          margin: 0 0 var(--es-space-3);
          border: 1px solid var(--es-border);
          background: var(--es-bg2);
          cursor: pointer;
          break-inside: avoid;
          transition: border-color var(--es-duration-fast) var(--es-easing);
        }

        .gallery-item:hover,
        .gallery-item:focus {
          border-color: var(--es-green);
          outline: none;
        }

        .gallery-image {
          display: block;
          width: 100%;
          height: auto;
        }
      `}</style>
    </>
  );
}
