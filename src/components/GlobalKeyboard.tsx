import { useState, useEffect, useCallback } from 'react';
import HelpOverlay from './HelpOverlay';

export default function GlobalKeyboard() {
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleHelp = useCallback(() => {
    setHelpOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        toggleHelp();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleHelp]);

  return <HelpOverlay isOpen={helpOpen} onClose={() => setHelpOpen(false)} />;
}
