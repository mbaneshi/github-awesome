# GitHub Awesome — Daily Trending OSS Study & Product Lab

A daily practice of studying trending open-source projects, learning from them, and building commercial products with **Rust + SvelteKit**.

Inspired by [GitHub Awesome](https://www.youtube.com/@githubawesome) YouTube channel.

## Our Products (Rust Backend + SvelteKit Embedded Frontend)

| Product | Description | Status |
|---------|-------------|--------|
| **[Codeilus](https://github.com/mbaneshi/codeilus)** | Single Rust binary that turns any codebase into an interactive, gamified learning experience. 16 crates, Axum + SvelteKit 5, tree-sitter, AI narration. | Active |
| **[AgentForge HQ](https://github.com/mbaneshi/agentforge-hq)** | Self-improving AI workforce platform. 100+ agent personas, org chart, governance, 12 Rust crates. | Active |
| **[Platform](https://github.com/mbaneshi/platform)** | 14-product unified platform consolidating all codebases into a layered business ecosystem. | Planning |

## Architecture

```
┌─────────────────────────────────┐
│         SvelteKit 5 UI          │
│   (embedded in Rust binary)     │
├─────────────────────────────────┤
│        Rust Backend (Axum)      │
│  API + WebSocket + Static Files │
├─────────────────────────────────┤
│  SQLite / tree-sitter / LLMs   │
└─────────────────────────────────┘
```

Single binary. No separate frontend server. Ship and deploy as one executable.

## Trending Repos — 19 March 2026

Today's 34 trending projects from [GitHub Awesome](https://www.youtube.com/@githubawesome):

| # | Project | Description |
|---|---------|-------------|
| 1 | [Remodex](https://github.com/Emanuele-web04/remodex) | UI component library |
| 2 | [app-store-screenshots](https://github.com/ParthJadhav/app-store-screenshots) | App Store screenshot generator |
| 3 | [chrome-cdp-skill](https://github.com/pasky/chrome-cdp-skill) | Chrome DevTools Protocol skill |
| 4 | [gstack](https://github.com/garrytan/gstack) | Stack for building apps |
| 5 | [agent-kit](https://github.com/KeyID-AI/agent-kit) | AI agent toolkit |
| 6 | [pi-autoresearch](https://github.com/davebcn87/pi-autoresearch) | Automated research on Pi |
| 7 | [skales](https://github.com/skalesapp/skales) | Skales app |
| 8 | [CLI-Anything](https://github.com/HKUDS/CLI-Anything) | CLI interface for anything |
| 9 | [mcp2cli](https://github.com/knowsuchagency/mcp2cli) | MCP to CLI bridge |
| 10 | [mem9](https://github.com/mem9-ai/mem9) | AI memory system |
| 11 | [GSD 2](https://github.com/gsd-build/gsd-2) | Get Stuff Done v2 |
| 12 | [TADA](https://github.com/HumeAI/tada) | Hume AI's TADA |
| 13 | [ATLAS](https://github.com/chrisworsey55/atlas) | ATLAS project |
| 14 | [OpenSquirrel](https://github.com/Infatoshi/OpenSquirrel) | Open source squirrel |
| 15 | [temm1e](https://github.com/nagisanzenin/temm1e) | temm1e project |
| 16 | [AutoKernel](https://github.com/RightNow-AI/autokernel) | Automated kernel optimization |
| 17 | [AutoResearchClaw](https://github.com/aiming-lab/AutoResearchClaw) | Automated research tool |
| 18 | [Mouser](https://github.com/TomBadash/Mouser) | Mouse automation |
| 19 | [Founders Kit](https://github.com/avinash201199/founders-kit) | Startup founders toolkit |
| 20 | [slides-grab](https://github.com/vkehfdl1/slides-grab) | Slide presentation grabber |
| 21 | [Tome](https://github.com/tomehq/tome) | Tome project |
| 22 | [ghost-os](https://github.com/ghostwright/ghost-os) | Ghost operating system |
| 23 | [Animated Icons](https://github.com/gorkem-bwl/animated-icons) | Animated icon library |
| 24 | [MetaClaw](https://github.com/aiming-lab/MetaClaw) | Meta research claw |
| 25 | [Skir](https://github.com/gepheum/skir) | Skir framework |
| 26 | [Understand Anything](https://github.com/Lum1104/Understand-Anything) | Universal understanding |
| 27 | [lossless-claw](https://github.com/martian-engineering/lossless-claw) | Lossless data tool |
| 28 | [OneCLI](https://github.com/onecli/onecli) | One CLI to rule them all |
| 29 | [OpenJarvis](https://github.com/open-jarvis/OpenJarvis) | Open source Jarvis assistant |
| 30 | [Auto-claude-code-research-in-sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | Automated Claude Code research |
| 31 | [OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | Multi-agent interaction |
| 32 | [Agent Safehouse](https://github.com/eugene1g/agent-safehouse) | Agent safety sandbox |
| 33 | [nah](https://github.com/manuelschipper/nah) | nah utility |
| 34 | [autoresearch](https://github.com/uditgoenka/autoresearch) | Claude autoresearch |

## Previous Trending Collections

| Date | Location | Count | Highlights |
|------|----------|-------|------------|
| 17-March | `/Users/bm/cod/trend/17-march` | 13+ | cognee, OpenViking, InsForge, browser, claude-code |
| 16-March | `/Users/bm/cod/trend/16-march` | 3 | coder, mindsdb, posthog |
| 10-March | `/Users/bm/cod/trend/10-march` | 10 | agentforge-hq, AstrBot, openclaw, paperclip |
| 5-March | `/Users/bm/cod/trend/5-march` | 7 | codebuff, hve-core, MoneyPrinterV2, shannon |
| 4-March | `/Users/bm/cod/trend/4-march` | 16 | agentscope, LMCache, ReMe, airi |
| 2-March | `/Users/bm/cod/trend/2-march` | 8 | airi, markitdown, OpenSandbox, servo |
| 26-Feb | `/Users/bm/cod/trend/26-feb` | 10 | claude-flow, deer-flow, SpacetimeDB, Scrapling |
| 20-Feb | `/Users/bm/cod/trend/20-feb` | 15 | OctoBot, khoj, rembg, evershop |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Rust (Axum) |
| Frontend | SvelteKit 5 (embedded in binary) |
| Embedding | rust-embed / include_dir |
| Database | SQLite |
| AI | Claude / OpenAI / Ollama |
| Deployment | Single binary / Docker |

## Monetization Strategy

1. **Open Core** — Free OSS base, paid premium features
2. **Hosted/Cloud** — Managed SaaS versions
3. **Support & Consulting** — Enterprise plans
4. **Marketplace** — Plugins and integrations

## Workflow

```
Daily: Study trending repos (GitHub Awesome YouTube)
       ↓
Clone & analyze → Extract patterns & ideas
       ↓
Build products (Rust + SvelteKit) → Open source
       ↓
Monetize via Open Core / SaaS / Consulting
```

## License

MIT

---

*Daily OSS study. Rust + SvelteKit products. Open source first. Ship fast.*
