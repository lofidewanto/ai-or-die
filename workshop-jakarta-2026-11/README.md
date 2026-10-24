# AI or DIE — One-Day Workshop, Jakarta (November 2026)

> **AI, LLMs and agents in one day — from the why to your own agent**
> Hands-on workshop by Dr. Lofi Dewanto — Java & open-source pioneer, enterprise architect,
> and advisor to Mova Tech / Mova Intelligence.

| | |
|---|---|
| **Date** | 19, 20 or 21 November 2026 — **to be confirmed** (Thu / Fri / Sat) |
| **Time** | 09:30 – 17:00 WIB |
| **Venue** | Jakarta, TBC (co-working space / campus lab with power at every seat) |
| **Fee** | **IDR 100.000** per person, fixed price (no early bird) — includes coffee breaks, lunch, materials, certificate |
| **Seats** | **Limited to 50 participants** — personal mentoring with 5 mentors |
| **Language** | Bahasa Indonesia only (the website can switch between Indonesian and English) |
| **Prerequisite** | Your own laptop with **OpenCode** (free OpenCode Zen models or free NVIDIA models from build.nvidia.com) **or Claude Code** (Claude models such as Opus) installed — see [participant-setup.md](participant-setup.md) (in Bahasa Indonesia) |
| **Venue must have** | Reliable Wi-Fi for 50+ laptops — no local models, everything runs over the internet |
| **Registration** | Google Form <https://forms.gle/gsvDgE4x2zncKwJ77> — questions via WhatsApp Mova [+62 851-2133-6927](https://wa.me/6285121336927) |

### Alternatives

This plan describes the full-day workshop. Two shorter alternatives use the same design and setup:

| Format | Page | Registration | Time (WIB) | Seats | Fee | For |
|---|---|---|---|---|---|---|
| Full-day workshop | [English](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11/) · [Bahasa Indonesia](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11/?lang=id) | [Google Form](https://forms.gle/gsvDgE4x2zncKwJ77) | 09:30 – 17:00 (one day) | 50 | IDR 100.000 | Developers, tech leads, students — build your own agent with Spring AI |
| Alternative 1 — Academia (green) | [English](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11-academia/) · [Bahasa Indonesia](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11-academia/?lang=id) | [Google Form](https://forms.gle/AsKs1reZgAb57D8z9) | 09:30 – 12:30 (3 hours) | 100 | IDR 50.000 | Students, lecturers, researchers — theory first, with hands-on examples |
| Alternative 2 — Executive (purple) | [English](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11-executive/) · [Bahasa Indonesia](https://lofidewanto.github.io/ai-or-die/workshop-jakarta-2026-11-executive/?lang=id) | [Google Form](https://forms.gle/ojSTAxPxdameJVgaA) | 09:30 – 14:30 (5 hours) | 30 | IDR 1.500.000 | Leaders and managers — hands-on managerial work and an AI roadmap |

---

## 1. Why this workshop

*AI or DIE* is the message from the keynote at the viadee Round Table in Cologne (June 2026)
and the Perpustakaan Nasional RI webinar (May 2026): AI does not just add features — it changes
how software is built and how organisations work. Teams that adapt thrive; teams that ignore it
fall behind.

This workshop turns that message into practice. Participants leave not with slides, but with a
**working AI agent they built themselves** — the same "Chat as Code" approach Mova Intelligence
uses for real Indonesian businesses (restaurants, hospitals, e-commerce, travel, agriculture).

It also closes a circle: the first Jakarta workshop by Lofi Dewanto was *MDA and Java* at
INIXINDO in 2006. Twenty years later — *AI and Java*.

## 2. Who it is for

**Exclusive, small, and committed.** The paid seat filters for people who actually want to build.

- Software developers (Java preferred; any language with basic OOP is fine)
- Tech leads / architects evaluating AI agents for their company
- Students in their final year of Informatics / Information Systems
- Founders & product people of SMEs who want to understand what is really possible
  (they can pair with a developer during the hands-on parts)

**Not for:** complete beginners in programming who want to build the Spring AI agent alone
(sessions 1–4 and 6 need no coding).

## 3. Learning outcomes

By 17:00 every participant can:

1. Explain why AI is a matter of *AI or DIE* — and what it means for their job and company.
2. Explain how an LLM is made, what an AI agent is (LLM, memory, RAG, tools, MCP) and what makes AI *agentic*.
3. Use an AI agent such as **OpenCode** or **Claude Code** for spec-driven software development.
4. Use agents beyond code: presentations, stock-market (saham) analysis, research, documents.
5. Name the security risks of agents and apply the basic protections (least privilege, sandbox, secrets, human in the loop).
6. Build their own agent with **Spring Boot + Spring AI** using NVIDIA models (or Claude).
7. Describe how roles and teams change: from developer to "product builder".

## 4. Agenda

| Time | Session | Format |
|---|---|---|
| 09:30 – 10:00 | **Registration, coffee, setup check** — Wi-Fi login; check OpenCode / Claude Code runs | Setup |
| 10:00 – 10:45 | **1 — Introduction: AI or DIE** | Talk |
| 10:45 – 11:45 | **2 — Theory: AI, LLMs and agents** | Talk + Q&A |
| 11:45 – 12:30 | **3a — Software development with AI agents (OpenCode / Claude Code, SDD)** | Live demo + hands-on |
| 12:30 – 13:30 | Lunch & networking (+ Dzuhur break) | |
| 13:30 – 14:30 | **3b — Beyond code: agents for everyday work** | Hands-on |
| 14:30 – 15:10 | **4 — Security and agents: what matters** | Talk + demo |
| 15:10 – 15:25 | Coffee break (+ Ashar break) | |
| 15:25 – 16:35 | **5 — Build your own agent with Spring Boot & Spring AI** | Hands-on |
| 16:35 – 17:00 | **6 — The future & closing** — Q&A, certificates, group photo | Talk |

### Session details

**1 — Introduction: AI or DIE (45 min)**

Based on the keynote *"AI or DIE: Die Zukunft der Softwareentwicklung"* (viadee Round Table, Cologne, June 2026).
- *Disrupted. Irrelevant. Extinct.* — the old way vs. the AI-native way across the SDLC
  (plan → requirements → design → implement → test → deploy → operate → evolve)
- Six months of experience building software with AI agents
- The TOE framework as the map for the day: **Technology** (LLM, AI agents, agentic AI),
  **Organisation** (DevSecOps, agile, roles), **Environment** (requirements, costs, process)
- Maturity model of digital transformation: digitalisation → digital transformation → automation →
  augmented intelligence → **AI agents and agentic AI**
- History of software development: RAD → MDA / MDSD → low-code / no-code → AI agents

**2 — Theory: AI, LLMs and agents (60 min)**
- What an LLM is — "a clever parrot for text prediction" — and the holy grail: AGI
- How an LLM is built: pre-training and fine-tuning (based on Andrej Karpathy's *Deep Dive into LLMs*)
- Mental models for agents: Jarvis (Iron Man), the Star Trek computer
- Anatomy of an agent: LLM as brain, system message, chat memory, context retriever / RAG, tools, security
- Training agents: tools (real-time), RAG (weekly updates), fine-tuning (stable knowledge)
- Apps vs. services vs. AI agents; agentic AI — autonomy, multi-step work and revision
- MCP (Model Context Protocol) — the "USB-C for AI"
- The agent landscape: Claude, OpenCode, GitHub Copilot, ChatGPT, Gemini, Manus, OpenClaw, Hermes Agent, …

**3a — Software development with AI agents (45 min)**
- Macro and micro process of software development — where agents fit
- IDE-centred (imperative) vs. conversation-centred (descriptive) work
- **Spec-driven development (SDD):** specify → plan → tasks → implement; functional and technical specifications
- Live demo with OpenCode / Claude Code: implement a GitHub issue *autonomously* — analyse the user story,
  write an implementation plan, implement, test, commit
  (demo repository: [demo-ai-or-die-softwareentwicklung](https://github.com/lofidewanto/demo-ai-or-die-softwareentwicklung))
- Participants try it on a small user story

**3b — Beyond code: agents for everyday work (60 min)**

Participants pick one challenge and solve it with an agent:
- **Presentation:** generate a slide deck from a short brief
- **Stock market (saham):** collect public data on IDX stocks, compare key figures, write a summary
  *(for learning only — not investment advice)*
- **Research & documents:** summarise sources, draft a report, automate a document workflow
- **Other possibilities:** data analysis, spreadsheets, server administration, personal assistants

Short round: what worked, what did not, where a human must stay in the loop.

**4 — Security and agents: what matters (40 min)**
- Agent server vs. agent client — the biggest difference: a client agent can do everything *you* can
- Attention: rights, deleting data, installing software, running any system command
- Least privilege: restrict the agent's rights if you do not want it to do everything
- The "agent cake": secure notebook → sandbox (Docker, NVIDIA OpenShell) → agent → editors / tools / Git
- Secrets and tokens (e.g. GitHub PAT), prompt injection, reviewing what agents produce
- Data protection: which data you send to cloud models, Indonesian data regulation (UU PDP)

**5 — Build your own agent with Spring Boot & Spring AI (70 min)**
- Low-code / no-code vs. "love-code": when to build your own agent in Java
- Concrete example **"Warung Digital"** — a WhatsApp-style assistant for a fictional Jakarta restaurant
  (menu, opening hours, orders, reservations)
- Spring AI `ChatClient` with NVIDIA models from build.nvidia.com (OpenAI-compatible API) — or Claude via Spring AI Anthropic
- Conversation memory per customer
- RAG over the restaurant's menu and FAQ
- `@Tool` methods: check stock, calculate an order total, create a reservation
- Connect to an MCP server
- Checkpoint branches so everyone can catch up
- "Eat your own agent food": step 1 build software with agents, step 2 build agents with that knowledge

**6 — The future & closing (25 min)**
- One role for everything? The "product builder" and micro-teams of three people
- DevSecOps, internal developer platforms and agile stay — the way we work inside them changes
- The mindset shift: from imperative "small-small" thinking to descriptive "big" thinking
- *"Don't DIE — or at least DIE Hard."*
- Q&A, certificates, group photo

**Stretch goals** (for fast participants, in the repo): connect the Spring AI agent to WhatsApp/Telegram,
deploy it with Docker, add evaluation tests for the agent's answers.

## 5. Why IDR 100.000 — the "exclusive" model

The fee is deliberately low enough to be accessible, but high enough to mean commitment.

- **Commitment, not profit:** free events in Jakarta typically see 40–60 % no-shows; a paid seat
  keeps the room full of people who want to build.
- **Focused group:** max. 50 seats → mentor ratio of about 1 : 10 with five mentors.
- **What participants get:**
  - Full day of hands-on labs with the speaker
  - Lunch, two coffee breaks
  - Workshop repository with all labs and solutions (GitHub)
  - Slides, prompts and spec templates
  - Certificate of participation
  - Access to an alumni WhatsApp/Telegram group for follow-up questions

### Rough budget (50 participants)

| Item | Estimate (IDR) |
|---|---|
| Income: 50 × 100.000 | 5.000.000 |
| Lunch + 2 coffee breaks (~ 70.000 / person) | – 3.500.000 |
| Printing (handouts, certificates, name tags) | – 500.000 |
| Buffer | 1.000.000 |

Venue and speaker are assumed sponsored / pro bono (e.g. by Mova Tech or a partner campus).
If a paid venue is needed, look for a sponsor.

## 6. Organisation checklist

**4 weeks before (by 22 Oct 2026 — overdue, do now)**
- [ ] Confirm the date (19, 20 or 21 November) and venue (power outlets, **reliable Wi-Fi for 50+ laptops**, projector, 50+ seats)
- [ ] Open registration (form + payment via QRIS / bank transfer)
- [ ] Announce on LinkedIn, Medium, Mova Tech channels, Java/JUG Indonesia communities

**2 weeks before (by 5 Nov 2026)**
- [ ] Finalise workshop repository and test all labs on Windows, macOS, Linux
- [ ] Send [participant-setup.md](participant-setup.md) to registered participants
- [ ] Recruit 5 mentors (e.g. Mova Tech team, local JUG members)

**1 week before (by 12 Nov 2026)**
- [ ] Reminder + setup-check message; collect participants' laptop OS
- [ ] Test the venue Wi-Fi with an AI agent session (bandwidth, no blocked ports)
- [ ] Print handouts, name tags, certificates; confirm catering (halal, vegetarian option)

**On the day**
- [ ] Hotspot backup in case venue Wi-Fi fails
- [ ] Record the keynote for the YouTube channel
- [ ] Collect feedback form before certificates are handed out

**After**
- [ ] Share slides, recording, and solutions; open the alumni group
- [ ] Offer follow-up mentoring for participants' own agent projects
- [ ] Write a Medium post: *"AI or DIE in Jakarta — what 50 developers built in one day"*

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Slow or failing Wi-Fi blocks the AI agents | Venue Wi-Fi tested beforehand; mobile hotspot backup; installation done at home as a prerequisite |
| Weak laptops (8 GB RAM or less) | Use small models (e.g. `qwen2.5:3b` / `llama3.2:3b`); pair participants |
| Mixed skill levels | Each lab has a checkpoint branch to catch up; stretch goals for the fast ones |
| Low registrations | Partner with campuses & JUG; LinkedIn post with the 2006 → 2026 story |
| Agents answering wrongly in Bahasa Indonesia | Test prompts & models beforehand; discuss it openly as a learning point |
