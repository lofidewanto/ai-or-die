# AI or DIE — One-Day Workshop, Jakarta (November 2026)

> **From Chat to Agent: build your own AI customer-service agent in one day**
> Hands-on workshop by Dr. Lofi Dewanto — Java & open-source pioneer, enterprise architect,
> and advisor to Mova Tech / Mova Intelligence.

| | |
|---|---|
| **Date** | Saturday, 14 November 2026 *(proposed — alternative: 21 November)* |
| **Time** | 08:30 – 17:00 WIB |
| **Venue** | Jakarta, TBC (co-working space / campus lab with power at every seat) |
| **Fee** | **IDR 100.000** per person — includes coffee breaks, lunch, materials, certificate |
| **Seats** | **Limited to 30 participants** — small group, personal mentoring |
| **Language** | Bahasa Indonesia & English (slides in English) |
| **Bring** | Your own laptop, pre-installed per [participant-setup.md](participant-setup.md) |

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

**Not for:** complete beginners in programming who want to work solo on the labs.

## 3. Learning outcomes

By 17:00 every participant can:

1. Explain the shift *from applications to agents* — and what it means for their job and company.
2. Run a Large Language Model **locally** with Ollama (no cloud cost, no data leaves the laptop).
3. Build a customer-service chatbot in **Spring Boot + LangChain4j** ("Chat as Code").
4. Give the bot memory, business knowledge (RAG) and **tools** it can call — turning a chatbot into an agent.
5. Connect the agent to external systems via **MCP (Model Context Protocol)**.
6. Use an AI coding assistant to speed up their own development — and know its limits.
7. Sketch a realistic AI-agent use case for their own organisation.

## 4. Agenda

| Time | Session | Format |
|---|---|---|
| 08:30 – 09:00 | **Registration, coffee, setup check** — volunteers fix laptop issues; offline USB with models & dependencies | Setup |
| 09:00 – 09:45 | **Keynote: AI or DIE — The Future of Software Development** | Talk |
| 09:45 – 10:30 | **Lab 1 — Hello, local LLM** | Hands-on |
| 10:30 – 10:45 | Coffee break | |
| 10:45 – 12:00 | **Lab 2 — Chat as Code: your first customer-service bot** | Hands-on |
| 12:00 – 13:00 | Lunch & networking (+ Dzuhur break) | |
| 13:00 – 14:15 | **Lab 3 — From chatbot to agent: knowledge & tools** | Hands-on |
| 14:15 – 15:00 | **Lab 4 — MCP: plug your agent into the world** | Hands-on |
| 15:00 – 15:15 | Coffee break (+ Ashar break) | |
| 15:15 – 16:00 | **Session 5 — AI-assisted software engineering** | Demo + hands-on |
| 16:00 – 16:40 | **Session 6 — Your use case: canvas & lightning pitches** | Group work |
| 16:40 – 17:00 | **Wrap-up, Q&A, certificates, group photo** | |

### Session details

**Keynote — AI or DIE (45 min)**
- Three decades, three platform shifts: desktop → web, monolith → cloud, application → agent
- What changes for developers, architects, and organisations — and what does not
- Real cases from Mova Intelligence: FeedSnap AI (restaurants), Mandaya Hospital, Galva & Kaze Rice,
  Goldenrama, Fantasia Raja Naga
- Lessons from enterprise modernisation (DEVK monolith → Kubernetes/AWS) applied to AI adoption

**Lab 1 — Hello, local LLM (45 min)**
- Ollama basics: pull, run, prompt a model on your own laptop
- Prompting fundamentals: system prompt, temperature, context window
- Why local models matter: cost, privacy, Indonesian data regulations (UU PDP)

**Lab 2 — Chat as Code (75 min)**
- Spring Boot + LangChain4j project skeleton (provided)
- `@AiService` interfaces: the bot's behaviour defined as Java code
- Conversation memory per customer
- Use case for the day: **"Warung Digital"** — a WhatsApp-style assistant for a fictional
  Jakarta restaurant (menu, opening hours, orders)
- Checkpoint: every participant has a bot answering in Bahasa Indonesia

**Lab 3 — From chatbot to agent (75 min)**
- RAG: load the restaurant's menu & FAQ documents, embed, retrieve
- Tools (`@Tool`): check stock, calculate order total, create a reservation
- Guardrails: what the agent may and may not do; handling hallucinations
- Comparison: the same in Spring AI (short demo)

**Lab 4 — MCP (45 min)**
- What MCP is and why it became the "USB-C for AI"
- Connect the agent to an MCP server (e.g. file system / calendar for reservations)
- Expose your own service as an MCP tool

**Session 5 — AI-assisted software engineering (45 min)**
- Live demo: extending the workshop project with an AI coding assistant
- Participants try it on a small task (add a new tool to their agent)
- Discussion: code quality, testing, security, ownership — "AI writes, you are responsible"

**Session 6 — Your use case (40 min)**
- Groups of 3–4 fill an *AI Agent Canvas*: users, channel (WhatsApp/Telegram/web), knowledge,
  tools, risks, success metric
- 2-minute lightning pitches; feedback from Lofi
- Best canvas gets a 30-minute follow-up online mentoring session

**Stretch goals** (for fast participants, in the repo): connect to the real WhatsApp/Telegram API,
deploy with Docker, add evaluation tests for the agent's answers.

## 5. Why IDR 100.000 — the "exclusive" model

The fee is deliberately low enough to be accessible, but high enough to mean commitment.

- **Commitment, not profit:** free events in Jakarta typically see 40–60 % no-shows; a paid seat
  keeps the room full of people who want to build.
- **Small group:** max. 30 seats → mentor ratio of about 1 : 8 with three assistants.
- **What participants get:**
  - Full day of hands-on labs with the speaker
  - Lunch, two coffee breaks
  - Workshop repository with all labs and solutions (GitHub)
  - Slides and the AI Agent Canvas template
  - Certificate of participation
  - Access to an alumni WhatsApp/Telegram group for follow-up questions
- **Early-bird option (optional):** first 10 seats at IDR 75.000 to create momentum.

### Rough budget (30 participants)

| Item | Estimate (IDR) |
|---|---|
| Income: 30 × 100.000 | 3.000.000 |
| Lunch + 2 coffee breaks (~ 70.000 / person) | – 2.100.000 |
| Printing (canvas, certificates, name tags) | – 300.000 |
| USB sticks for offline setup (5 ×) | – 400.000 |
| Buffer | 200.000 |

Venue and speaker are assumed sponsored / pro bono (e.g. by Mova Tech or a partner campus).
If a paid venue is needed, look for a sponsor or raise the cap to 40 seats.

## 6. Organisation checklist

**4 weeks before (by 17 Oct 2026 — overdue, do now)**
- [ ] Confirm date and venue (power outlets, Wi-Fi, projector, 30+ seats)
- [ ] Open registration (form + payment via QRIS / bank transfer)
- [ ] Announce on LinkedIn, Medium, Mova Tech channels, Java/JUG Indonesia communities

**2 weeks before (by 31 Oct 2026)**
- [ ] Finalise workshop repository and test all labs on Windows, macOS, Linux
- [ ] Send [participant-setup.md](participant-setup.md) to registered participants
- [ ] Recruit 3 assistants (e.g. Mova Tech team, local JUG members)

**1 week before (by 7 Nov 2026)**
- [ ] Reminder + setup-check message; collect participants' laptop OS
- [ ] Prepare USB sticks: JDK, Maven repo cache, Ollama installers, model files
- [ ] Print canvases, name tags, certificates; confirm catering (halal, vegetarian option)

**On the day**
- [ ] Hotspot backup in case venue Wi-Fi fails
- [ ] Record the keynote for the YouTube channel
- [ ] Collect feedback form before certificates are handed out

**After**
- [ ] Share slides, recording, and solutions; open the alumni group
- [ ] Follow-up mentoring for the best use-case canvas
- [ ] Write a Medium post: *"AI or DIE in Jakarta — what 30 developers built in one day"*

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Slow Wi-Fi blocks model/dependency downloads | Mandatory pre-setup; offline USB sticks; small models (≈ 2–4 GB) |
| Weak laptops (8 GB RAM or less) | Use small models (e.g. `qwen2.5:3b` / `llama3.2:3b`); pair participants |
| Mixed skill levels | Each lab has a checkpoint branch to catch up; stretch goals for the fast ones |
| Low registrations | Partner with campuses & JUG; early-bird; LinkedIn post with the 2006 → 2026 story |
| Agents answering wrongly in Bahasa Indonesia | Test prompts & models beforehand; discuss it openly as a learning point |
