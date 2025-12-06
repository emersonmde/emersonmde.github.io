export interface Project {
  name: string;
  language: string;
  languageColor: string;
  description: string;
  shortDescription: string;
  stars: number;
  github: string;
  demo?: string;
  docs?: string;
}

export const projects: Project[] = [
  {
    name: 'coppermind',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'Semantic search with WASM',
    description:
      'Browser-based semantic search using Rust, WASM, and local ML inference. Runs entirely in the browser with no server-side processing. Uses ONNX Runtime for embedding generation and HNSW for vector similarity search.',
    stars: 12,
    github: 'https://github.com/emersonmde/coppermind',
    demo: 'https://emersonmde.github.io/coppermind/',
    docs: 'https://emersonmde.github.io/coppermind/docs/',
  },
  {
    name: 'reprisedb',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'LSM Tree key-value store',
    description:
      'A Log-Structured Merge Tree (LSM Tree) based key-value storage engine written in Rust. Implements a memtable with red-black tree, sorted string tables (SSTables), and compaction strategies.',
    stars: 8,
    github: 'https://github.com/emersonmde/reprisedb',
    docs: 'https://emersonmde.github.io/reprisedb/',
  },
  {
    name: 'railyard',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'Raft consensus algorithm',
    description:
      'An implementation of the Raft consensus algorithm in Rust. Provides leader election, log replication, and safety guarantees for distributed systems.',
    stars: 5,
    github: 'https://github.com/emersonmde/railyard',
    docs: 'https://emersonmde.github.io/railyard/',
  },
  {
    name: 'nenya',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'Distributed rate limiter',
    description:
      'A distributed rate limiting library implementing the token bucket algorithm. Designed for high-throughput systems with support for sliding windows and configurable policies.',
    stars: 4,
    github: 'https://github.com/emersonmde/nenya',
    docs: 'https://emersonmde.github.io/nenya/',
  },
  {
    name: 'touchstone',
    language: 'c',
    languageColor: 'var(--es-grey)',
    shortDescription: 'SQL database engine',
    description:
      'A SQL database engine written in C. Implements a B-tree storage engine, query parser, and basic SQL operations. Built as an educational project to understand database internals.',
    stars: 1,
    github: 'https://github.com/emersonmde/touchstone',
  },
  {
    name: 'chip8-emulator',
    language: 'c',
    languageColor: 'var(--es-grey)',
    shortDescription: 'CHIP-8 emulator',
    description:
      'A CHIP-8 emulator written in C. Implements the full instruction set, display rendering, and input handling. Includes a debugger and step-through execution mode.',
    stars: 1,
    github: 'https://github.com/emersonmde/chip8-emulator',
  },
];
