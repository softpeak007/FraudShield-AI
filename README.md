# FraudShield AI — Next-Gen Agentic Fraud Case Management Platform
### 🏆 Designed to Win: UiPath AgentHack Track 1 (UiPath Maestro Case Management)

FraudShield AI is an enterprise-grade platform built to solve high-velocity financial fraud. By combining server-side cognitive intelligence via the **Gemini 3.5 API** with **UiPath Maestro Case Management** robotic pipelines, the system monitors transactions, investigates anomalies, generates clean evidence dossiers, manages active risk ratings, and handles critical human-in-the-loop decisions with a transparent cryptographic audit trail.

---

## 🚀 Key Platform Features

1. **Intelligent Resilient Core (Gemini 3.5 / 3.1 Fallbacks)**
   * Outfitted with server-side forensic analysis built directly on `@google/genai` with automatic model fallback (`gemini-3.5-flash` to `gemini-3.1-flash-lite`).
   * Configured with exponential backoff retry mechanics to bypass 503 unavailable spikes, protecting real-time system responses.

2. **Enterprise Multi-Role Interface (RBAC Portal)**
   * High-density interactive HUD with a built-in smartphone simulator.
   * Toggle between 5 enterprise roles to see custom, tailored control boards:
     * **Admin**: View SQL database ERD schemas, security metrics, and API webhooks.
     * **Fraud Analyst**: Inject live incursions and trigger Gemini forensic reports.
     * **Investigator**: Master case Kanban list, check forensic evidence lists, and process handoffs.
     * **Compliance Officer**: SLA verification clocks, compliance rules checklists, and automated SAR templates.
     * **Executive Viewer**: Visual risk index indices, financial impact stats ($ saved), and SLA tracking dials.

3. **UiPath Maestro Workflow Progress Timeline**
   * Live visualizer showing active case transitions: `Intake` ➔ `Evidence Collection` ➔ `Under Scan` ➔ `Human Review` ➔ `Resolution`.

4. **Transparent Audit Logging Engine**
   * Absolute logging of systems, security overrides, and AI copilot interactions.

5. **Acoustic Co-Cognitive Soundscapes**
   * Futuristic audio synthesis feedback upon click, success, alarm, or hacker diagnostic triggers.

---

## 📂 Architecture Guides
* All technical requirement plans, PRD, user stories (100+ categories), AWS infrastructure layouts, detailed agent prompts, and presentation slide structures are persisted inside **[`/DOCS_ARCH.md`](./DOCS_ARCH.md)**.

---

## 🛠️ Getting Started & Local Development

### 1. Configure Secrets in `.env`
Ensure you have the required server secret key in your workspace environment:
```env
GEMINI_API_KEY=your_google_genai_api_key_here
```

### 2. Verify and Compile
```bash
# Run ESLint validation
npm run lint

# Build production assets
npm run build
```

---

## 🏆 Hackathon Strategic Overview
FraudShield AI satisfies every primary criterion for the AgentHack:
* **Business Impact**: Saves thousands in compliance fees and dramatically reduces the risk of account takeovers.
* **Platform Completeness**: Direct model resilience layer, robust Next.js App routing, visual database schema dashboards, and a complete, clean responsive workspace.
