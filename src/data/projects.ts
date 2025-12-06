export interface Project {
  name: string;
  language: string;
  languageColor: string;
  description: string;
  shortDescription: string;
  tags: string[];
  github: string;
  demo?: string;
  docs?: string;
}

export const projects: Project[] = [
  {
    name: 'coppermind',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'Client-side semantic search',
    description:
      'Hybrid search engine combining vector similarity (HNSW) with BM25 keyword matching, fused via Reciprocal Rank Fusion. Compiles to WASM and runs JinaBERT embeddings client-side using Candle. Zero server dependencies.',
    tags: ['wasm', 'ml', 'search'],
    github: 'https://github.com/emersonmde/coppermind',
    demo: 'https://errorsignal.dev/coppermind/',
  },
  {
    name: 'anchor-chain',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'LLM orchestration framework',
    description:
      'Type-safe LLM workflow orchestration with compile-time chain validation. Async-first design enables parallel node execution. Supports OpenAI and Anthropic with a unified trait-based interface.',
    tags: ['llm', 'async', 'crate'],
    github: 'https://github.com/emersonmde/anchor-chain',
    docs: 'https://docs.rs/anchor-chain',
  },
  {
    name: 'daedalus',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'Bare-metal kernel for RPi4',
    description:
      'AArch64 kernel running on Raspberry Pi 4 (BCM2711/Cortex-A72). Implements exception handling at EL2, PL011 UART driver, and an interactive shell. No OS, no std - just registers and memory.',
    tags: ['kernel', 'arm64', 'no_std'],
    github: 'https://github.com/emersonmde/daedalus',
    docs: 'https://emersonmde.github.io/daedalus/',
  },
  {
    name: 'railyard',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'Raft consensus implementation',
    description:
      'Raft consensus protocol built on Tonic gRPC. Implements leader election, log replication, and membership changes. Designed as a reusable building block for distributed systems requiring strong consistency.',
    tags: ['distributed', 'consensus', 'grpc'],
    github: 'https://github.com/emersonmde/railyard',
    docs: 'https://docs.rs/railyard',
  },
  {
    name: 'nenya',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'Adaptive PID rate limiter',
    description:
      'Rate limiter using a PID controller for dynamic limit adjustment based on traffic patterns. Sliding window TPS calculation with configurable Kp/Ki/Kd tuning. Includes Sentinel, a gRPC sidecar service.',
    tags: ['pid', 'grpc', 'crate'],
    github: 'https://github.com/emersonmde/nenya',
    docs: 'https://docs.rs/nenya',
  },
  {
    name: 'atium',
    language: 'rust',
    languageColor: 'var(--es-orange)',
    shortDescription: 'Computer algebra system',
    description:
      'CAS with expression parsing, algebraic simplification, and symbolic manipulation. Renders mathematical output via Typst. Supports term rewriting, expression flattening, and like-term combination.',
    tags: ['math', 'parser', 'typst'],
    github: 'https://github.com/emersonmde/atium',
    demo: 'https://emersonmde.github.io/atium/atium/index.html',
  },
];
