# ai-or-die

**AI or DIE: Series** — talks, workshops and material by Dr. Lofi Dewanto on how AI, LLMs and AI agents
change software development, organisations and our lives as a whole.

Published with GitHub Pages: <https://lofidewanto.github.io/ai-or-die/>

## Contents

| Page | Description |
|---|---|
| [Workshop AI or DIE Jakarta](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11/) ([Bahasa Indonesia](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11/?lang=id)) | Landing page for the one-day workshop in Jakarta, 19, 20 or 21 November 2026 (TBD) — Indonesian / English |
| [Workshop AI or DIE Academia](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11-academia/) ([Bahasa Indonesia](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11-academia/?lang=id)) | Alternative 1 (green): 3-hour academic edition, theory first with hands-on examples — 100 seats, IDR 50.000 |
| [Workshop AI or DIE Executive](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11-executive/) ([Bahasa Indonesia](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11-executive/?lang=id)) | Alternative 2 (purple): 5-hour executive edition for leaders and managers, hands-on managerial work — 30 seats, IDR 1.500.000 |
| [Career timeline](https://lofidewanto.github.io/ai-or-die/cv-lofi-dewanto.html) | Dr. Lofi Dewanto, 1995–2026 |
| [Career timeline — green dark](https://lofidewanto.github.io/ai-or-die/cv-lofi-dewanto-green-dark.html) | Same content in a dark design with green accents |

---

## Workshop AI or DIE — Jakarta, November 2026

> **AI or DIE. One Day. Your Choice.**
> AI does not add features. It changes how software is built — and it changes our lives as a whole.

### At a glance

| | |
|---|---|
| **Date** | 19, 20 or 21 November 2026 — **to be confirmed** |
| **Time** | 09:30 – 17:00 WIB |
| **Venue** | Jakarta (to be confirmed) — reliable Wi-Fi for 50+ laptops required |
| **Fee** | **IDR 100.000** per person, fixed price — includes lunch, two coffee breaks, materials, certificate |
| **Seats** | Max. **50 participants**, 5 mentors (about 1 mentor per 10 participants) |
| **Language** | Bahasa Indonesia (the website can switch between Indonesian and English) |
| **Trainer** | Dr. Lofi Dewanto — Java & open-source pioneer, enterprise architect, advisor to Mova Tech / Mova Intelligence |

### Registration and questions

- **Register:** Google Form — <https://forms.gle/gsvDgE4x2zncKwJ77>
  Payment instructions (QRIS / bank transfer) follow by WhatsApp or email; the seat is confirmed after payment.
  The form closes automatically after 50 registrations.
- **Questions:** WhatsApp Mova — [+62 851-2133-6927](https://wa.me/6285121336927) (Monday–Friday, 09:00–18:00 WIB)

### Prerequisites

Every participant brings their **own laptop** with an **AI agent installed** — everything runs over the internet, no local models:

- **OpenCode** with free models — free OpenCode Zen models or free NVIDIA models from [build.nvidia.com](https://build.nvidia.com), **or**
- **Claude Code** with Claude models (e.g. Opus, Sonnet) — requires a Claude subscription
- A **GitHub account** for the spec-driven development exercise
- For Session 5: JDK 21, Maven, Git, an IDE and a free NVIDIA API key

*Info:* GitHub Copilot also has a free plan (*Copilot Free*) with a limited monthly quota; it is not used as the main agent in the workshop.

Full installation guide (Bahasa Indonesia): [participant-setup.md](workshop-jakarta-2026-11/participant-setup.md)

### Agenda

| Time | Session |
|---|---|
| 09:30 – 10:00 | Registration, coffee, Wi-Fi and agent check |
| 10:00 – 10:45 | **01 — Introduction: AI or DIE** — Disrupted, Irrelevant, Extinct or AI-native; six months of building software with AI agents; TOE framework; maturity model up to agentic AI; RAD → MDA → low-code → AI agents |
| 10:45 – 11:45 | **02 — Theory: AI, LLMs and agents** — how an LLM is made, AGI, anatomy of an agent (memory, RAG, tools, MCP), apps vs. services vs. agents, the agent landscape |
| 11:45 – 12:30 | **03a — Software development with AI agents** — OpenCode / Claude Code, spec-driven development (specify → plan → tasks → implement), live demo from GitHub issue to finished feature |
| 12:30 – 13:30 | Lunch, networking & Dzuhur break |
| 13:30 – 14:30 | **03b — Beyond code** — agents for presentations, stock-market (saham) analysis *(learning only, no investment advice)*, research and documents |
| 14:30 – 15:10 | **04 — Security and agents** — agent server vs. client, rights, sandboxes (Docker, NVIDIA OpenShell), secrets, prompt injection, human in the loop, UU PDP |
| 15:10 – 15:25 | Coffee & Ashar break |
| 15:25 – 16:35 | **05 — Your own agent with Spring Boot & Spring AI** — "Warung Digital" restaurant assistant: `ChatClient`, memory, RAG, `@Tool`, MCP, NVIDIA models |
| 16:35 – 17:00 | **06 — The future & closing** — product builder, micro-teams, the mindset shift; "Don't DIE, or at least DIE Hard"; Q&A, certificates, group photo |

### Built on real cases

Conversational-AI agents delivered by Mova Intelligence for Indonesian businesses:
MakanChat (restaurant & food), Mandaya Hospital (healthcare), Galva & Kaze Rice (eCommerce), Goldenrama (travel & tourism).

### Files

| File | Purpose |
|---|---|
| [workshop-jakarta-2026-11/index.html](workshop-jakarta-2026-11/index.html) | Bilingual landing page (Mova Intelligence style, light/dark mode, EN / ID switch, `?lang=id`) |
| [workshop-jakarta-2026-11-academia/index.html](workshop-jakarta-2026-11-academia/index.html) | Alternative 1: academic edition, same design in green |
| [workshop-jakarta-2026-11-executive/index.html](workshop-jakarta-2026-11-executive/index.html) | Alternative 2: executive edition, same design in purple |
| [workshop-jakarta-2026-11/README.md](workshop-jakarta-2026-11/README.md) | Full workshop plan: learning outcomes, session details, budget, organisation checklist, risks |
| [workshop-jakarta-2026-11/participant-setup.md](workshop-jakarta-2026-11/participant-setup.md) | Installation guide for participants (Bahasa Indonesia) |
| [workshop-jakarta-2026-11/registration-form.gs](workshop-jakarta-2026-11/registration-form.gs) | Google Apps Script that creates the registration form, the response sheet and the auto-close at 50 registrations |

### Background

The workshop is based on the keynote *"AI or DIE: Die Zukunft der Softwareentwicklung"*
(viadee Round Table, Cologne, June 2026) and the webinar *"AI or DIE: The Digital Library"* for
Perpustakaan Nasional RI (May 2026). It closes a circle: the first Jakarta workshop by Lofi Dewanto
was *MDA and Java* at INIXINDO in 2006 — twenty years later, *AI and Java*.

## Contact

[LinkedIn](https://www.linkedin.com/in/dr-lofi-dewanto-5812a012/) ·
[GitHub](https://github.com/lofidewanto) ·
[Medium](https://lofidewanto.medium.com/) ·
[Sessionize](https://sessionize.com/dewanto/) ·
[Mova Intelligence](https://mova-intelligence.com)

## License

See [LICENSE](LICENSE).
