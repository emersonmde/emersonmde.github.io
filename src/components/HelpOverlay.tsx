import { useEffect, useRef } from 'react';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpOverlay({ isOpen, onClose }: HelpOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault();
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      overlayRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="help-overlay"
      onClick={onClose}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      <div className="help-panel" onClick={(e) => e.stopPropagation()}>
        {/* TUI border */}
        <div className="help-border-top">
          <span>┌─ </span>
          <span className="help-title">keyboard shortcuts</span>
          <span className="help-line"> ─</span>
          <span>┐</span>
        </div>

        <div className="help-content-wrapper">
          <span className="help-v-border">│</span>
          <div className="help-content">
            <section className="help-section">
              <h3 className="section-title">Navigation</h3>
              <div className="shortcut-list">
                <div className="shortcut">
                  <kbd>j</kbd> / <kbd>↓</kbd>
                  <span>Move down</span>
                </div>
                <div className="shortcut">
                  <kbd>k</kbd> / <kbd>↑</kbd>
                  <span>Move up</span>
                </div>
                <div className="shortcut">
                  <kbd>Enter</kbd>
                  <span>Open selected</span>
                </div>
                <div className="shortcut">
                  <kbd>Esc</kbd>
                  <span>Close / collapse</span>
                </div>
              </div>
            </section>

            <section className="help-section">
              <h3 className="section-title">Projects</h3>
              <div className="shortcut-list">
                <div className="shortcut">
                  <kbd>g</kbd>
                  <span>Open GitHub</span>
                </div>
                <div className="shortcut">
                  <kbd>d</kbd>
                  <span>Open demo/docs</span>
                </div>
              </div>
            </section>

            <section className="help-section">
              <h3 className="section-title">Photos</h3>
              <div className="shortcut-list">
                <div className="shortcut">
                  <kbd>←</kbd> / <kbd>h</kbd>
                  <span>Previous photo</span>
                </div>
                <div className="shortcut">
                  <kbd>→</kbd> / <kbd>l</kbd>
                  <span>Next photo</span>
                </div>
                <div className="shortcut">
                  <kbd>q</kbd>
                  <span>Close lightbox</span>
                </div>
              </div>
            </section>

            <section className="help-section">
              <h3 className="section-title">Commands</h3>
              <div className="shortcut-list">
                <div className="shortcut">
                  <kbd>/</kbd>
                  <span>Focus command input</span>
                </div>
                <div className="shortcut">
                  <kbd>Tab</kbd>
                  <span>Autocomplete</span>
                </div>
                <div className="shortcut">
                  <kbd>?</kbd>
                  <span>Toggle this help</span>
                </div>
              </div>
            </section>
          </div>
          <span className="help-v-border">│</span>
        </div>

        <div className="help-border-bottom">
          <span>└</span>
          <span className="help-line">─</span>
          <span>┘</span>
        </div>

        <div className="help-footer">
          Press <kbd>?</kbd> or <kbd>Esc</kbd> to close
        </div>
      </div>

      <style>{`
        .help-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(24, 24, 25, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--es-space-4);
        }

        .help-panel {
          max-width: 500px;
          width: 100%;
        }

        .help-border-top,
        .help-border-bottom {
          display: flex;
          color: var(--es-border-focus);
          font-family: var(--es-font-mono);
          white-space: nowrap;
        }

        .help-title {
          color: var(--es-green);
        }

        .help-line {
          flex-grow: 1;
          overflow: hidden;
        }

        .help-line::before {
          content: '────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────';
          white-space: nowrap;
        }

        .help-content-wrapper {
          display: flex;
        }

        .help-v-border {
          color: var(--es-border-focus);
          font-family: var(--es-font-mono);
        }

        .help-content {
          flex-grow: 1;
          padding: var(--es-space-4);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--es-space-6);
        }

        .help-section {
          min-width: 0;
        }

        .section-title {
          color: var(--es-green);
          font-size: var(--es-text-sm);
          font-weight: var(--es-font-bold);
          margin-bottom: var(--es-space-2);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .shortcut-list {
          display: flex;
          flex-direction: column;
          gap: var(--es-space-1);
        }

        .shortcut {
          display: flex;
          gap: var(--es-space-2);
          font-size: var(--es-text-sm);
          color: var(--es-grey);
        }

        .shortcut kbd {
          background: var(--es-bg2);
          border: 1px solid var(--es-border);
          border-radius: 2px;
          padding: 0 var(--es-space-1);
          font-family: var(--es-font-mono);
          font-size: var(--es-text-xs);
          color: var(--es-fg);
          min-width: 1.5em;
          text-align: center;
        }

        .shortcut span {
          flex-grow: 1;
        }

        .help-footer {
          text-align: center;
          color: var(--es-grey-dim);
          font-size: var(--es-text-xs);
          margin-top: var(--es-space-3);
        }

        .help-footer kbd {
          background: var(--es-bg2);
          border: 1px solid var(--es-border);
          border-radius: 2px;
          padding: 0 var(--es-space-1);
          font-family: var(--es-font-mono);
          font-size: var(--es-text-xs);
          color: var(--es-fg);
        }

        @media (max-width: 500px) {
          .help-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
