# 01: Dual-Track Foundation, Appwrite Service Layer & Switcher Shell

**What to build:** An interactive dual-aesthetic shell that allows visitors to switch between `🎬 Cinema Reel` and `⚡ Data Engine` tracks at any time. It provides global styling tokens for filmic dark and cyber-technical modes, an Appwrite data layer with resilient mock fallbacks so the site works immediately without configuration, and a responsive navigation header.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] Next.js 16 environment setup with `appwrite` and `node-appwrite` dependencies.
- [x] Appwrite client and server modules with endpoint and project configuration.
- [x] Universal data service with curated seed data fallback for offline or unconfigured states.
- [x] Global styling tokens in CSS supporting both Cinema (obsidian/amber) and Data (grid/cyan) aesthetics.
- [x] Track Context provider managing active track state (`cinema` vs `data`).
- [x] Persistent Navigation Header with interactive Track Switcher.
