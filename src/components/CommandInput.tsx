import { useState, useRef, useEffect, useCallback } from 'react';
import { executeCommand, getCompletions, setCurrentPath } from '../lib/commands';

interface CommandInputProps {
  initialPath?: string;
}

interface HistoryEntry {
  command: string;
  output: string;
}

export default function CommandInput({ initialPath = '~/projects' }: CommandInputProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [completions, setCompletions] = useState<string[]>([]);
  const [selectedCompletion, setSelectedCompletion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set initial path
  useEffect(() => {
    setCurrentPath(initialPath);
  }, [initialPath]);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;

    const result = executeCommand(input);

    // Add to history
    if (result.output || !result.navigate) {
      setHistory((prev) => [
        ...prev,
        { command: input, output: result.output },
      ]);
    }

    // Handle navigation
    if (result.navigate) {
      if (result.navigate.startsWith('http')) {
        window.open(result.navigate, '_blank');
      } else {
        window.location.href = result.navigate;
      }
    }

    // Handle clear
    if (result.clear) {
      setHistory([]);
    }

    setInput('');
    setHistoryIndex(-1);
    setCompletions([]);
  }, [input]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          if (completions.length > 0) {
            // Apply completion
            const parts = input.split(/\s+/);
            parts[parts.length - 1] = completions[selectedCompletion];
            setInput(parts.join(' '));
            setCompletions([]);
          } else {
            handleSubmit();
          }
          break;

        case 'Tab':
          e.preventDefault();
          const comps = getCompletions(input);
          if (comps.length === 1) {
            // Single completion - apply it
            const parts = input.split(/\s+/);
            parts[parts.length - 1] = comps[0];
            setInput(parts.join(' '));
            setCompletions([]);
          } else if (comps.length > 1) {
            // Multiple completions - show dropdown
            setCompletions(comps);
            setSelectedCompletion(0);
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (completions.length > 0) {
            setSelectedCompletion((prev) =>
              prev > 0 ? prev - 1 : completions.length - 1
            );
          } else if (history.length > 0) {
            const newIndex =
              historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
            setHistoryIndex(newIndex);
            setInput(history[history.length - 1 - newIndex]?.command || '');
          }
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (completions.length > 0) {
            setSelectedCompletion((prev) =>
              prev < completions.length - 1 ? prev + 1 : 0
            );
          } else if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(history[history.length - 1 - newIndex]?.command || '');
          } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            setInput('');
          }
          break;

        case 'Escape':
          e.preventDefault();
          setCompletions([]);
          setInput('');
          break;

        case 'c':
          if (e.ctrlKey) {
            e.preventDefault();
            setInput('');
            setCompletions([]);
          }
          break;
      }
    },
    [input, history, historyIndex, completions, selectedCompletion, handleSubmit]
  );

  // Focus input when / is pressed
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="command-terminal">
      {/* History output */}
      {history.length > 0 && (
        <div className="command-history">
          {history.map((entry, i) => (
            <div key={i} className="history-entry">
              <div className="history-command">
                <span className="prompt">λ</span> {entry.command}
              </div>
              {entry.output && (
                <pre className="history-output">{entry.output}</pre>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input line */}
      <div className="command-input-wrapper">
        <span className="prompt">λ</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setCompletions([]);
          }}
          onKeyDown={handleKeyDown}
          className="command-input"
          placeholder="type a command..."
          aria-label="Command input"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="cursor cursor-blink">▌</span>
      </div>

      {/* Completions dropdown */}
      {completions.length > 0 && (
        <div className="completions-dropdown">
          {completions.map((comp, i) => (
            <button
              key={comp}
              className={`completion-item ${i === selectedCompletion ? 'selected' : ''}`}
              onClick={() => {
                const parts = input.split(/\s+/);
                parts[parts.length - 1] = comp;
                setInput(parts.join(' '));
                setCompletions([]);
                inputRef.current?.focus();
              }}
            >
              {comp}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .command-terminal {
          font-family: var(--es-font-mono);
          font-size: var(--es-text-sm);
        }

        .command-history {
          max-height: 200px;
          overflow-y: auto;
          margin-bottom: var(--es-space-2);
          border-bottom: 1px solid var(--es-border-dim);
          padding-bottom: var(--es-space-2);
        }

        .history-entry {
          margin-bottom: var(--es-space-2);
        }

        .history-command {
          color: var(--es-grey);
        }

        .history-output {
          color: var(--es-fg);
          white-space: pre-wrap;
          margin: var(--es-space-1) 0 0 var(--es-space-4);
          font-family: inherit;
        }

        .command-input-wrapper {
          display: flex;
          align-items: center;
          gap: var(--es-space-2);
        }

        .prompt {
          color: var(--es-green);
          flex-shrink: 0;
        }

        .command-input {
          flex-grow: 1;
          background: transparent;
          border: none;
          color: var(--es-fg);
          font-family: inherit;
          font-size: inherit;
          padding: 0;
          outline: none;
        }

        .command-input::placeholder {
          color: var(--es-grey-dim);
        }

        .cursor {
          color: var(--es-fg);
          flex-shrink: 0;
        }

        .completions-dropdown {
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          background: var(--es-bg2);
          border: 1px solid var(--es-border);
          border-radius: 2px;
          margin-bottom: var(--es-space-2);
          max-height: 150px;
          overflow-y: auto;
        }

        .completion-item {
          display: block;
          width: 100%;
          padding: var(--es-space-1) var(--es-space-2);
          text-align: left;
          background: none;
          border: none;
          color: var(--es-fg);
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
        }

        .completion-item:hover,
        .completion-item.selected {
          background: var(--es-bg3);
          color: var(--es-green);
        }
      `}</style>
    </div>
  );
}
