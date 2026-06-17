# FraudShield AI — Complete Enterprise Architecture & Planning Blueprint
## Active Hub: UiPath Maestro Case Management — Track 1 (Enterprise-Grade Strategic Framework)

---

## SECTION 1: EXECUTIVE SUMMARY

### Product Vision
**FraudShield AI** represents the horizon of autonomous financial defense: an enterprise-grade, Multi-Agent Fraud Detection, Auditing, and Intelligent Case Orchestration system. By marrying deep cognitive intelligence (Gemini 3.5 Large Language Models) with industry-trusted robotic automation and execution architecture (UiPath Maestro Case, UiPath orchestrators), FraudShield AI eliminates structural investigation lag, reduces high-velocity capital takeovers within seconds, and empowers compliance teams through rigorous human-in-the-loop oversight.

### Product Mission
To safeguard global banking, Web3, and payment rails through continuous predictive cognitive audits, fully auditable digital forensics records, and autonomous agent coordination, keeping compliance costs low and trust high.

### Problem Statement
Modern financial networks operate at milliseconds, but traditional enterprise risk auditing takes days. Legacy solutions suffer from:
1. **Disconnected Operations**: Siloed security systems, databases, and core payment processors.
2. **False Alarm Fatigue**: Security analysts spend up to 70% of their day reviewing safe transactions due to primitive rule-based filters.
3. **Investigation Latency**: Collecting client records, geo-logs, IP verification, and device fingerprints requires manually fetching records across multiple servers.
4. **Muted Compliance Execution**: Suspicious Activity Reports (SAR) must be drafted manually, delaying regulatory submission.

### The Value Proposition
FraudShield AI changes the paradigm from **reactive remediation** to **autonomous proactive verification**:
* **Immediate Ingestion & Scan**: Detect anomalous transactions instantly and activate the threat mitigation pipeline.
* **Agentic Multi-Agent Brain**: 6 specialized cognitive agents collaborate automatically using Gemini server-side infrastructure to collect evidence and score threat risk.
* **UiPath Maestro Central Orchestrator**: Uses robotic processes and business rule transitions to handle secure background tasks, API relays, and escalate tickets to human analysts.
* **100% Comprehensive Audit Trail**: Every log, AI decision, and manual Override is signed cryptographically and persisted into a relational database.

---

## SECTION 2: PRODUCT REQUIREMENTS DOCUMENT (PRD)

### A. Product Overview
FraudShield AI coordinates multi-agent cognitive intelligence with UiPath robotic pipelines to detect security alerts, execute fraud audits, organize evidence logs, and process critical cases through strict human-approved pathways.

### B. Target Users & Roles
1. **System Administrator**: Full system settings, audit logs inspection, API keys provisioning, and role assignment.
2. **Fraud Analyst (Triage Specialist)**: Live incursion/alerts feed scan, micro-triage, and routing.
3. **Investigator**: Master cases supervisor, evidence dossier reviewer, mitigation control.
4. **Compliance Officer**: Regulatory SLA validator, SAR draft filing, auditor of system health metrics.
5. **Executive Viewer**: High-level risk score analytics, financial lock mitigation sums.

### C. Functional Requirements (FR)
* **FR-1 [Ingestion]**: Real-time transaction scanning from API.
* **FR-2 [AI Forensics]**: On-demand Gemini 3.5 audits parsing device IP, cookies, and geographic velocity.
* **FR-3 [Case Pipeline]**: Relational kanban cases matching: Intake, Evidence Collection, Investigation, Review, Escalation, Resolution.
* **FR-4 [Security Lock]**: Instant block & freeze actions deactivating physical/digital cards.
* **FR-5 [Audit Logging]**: Mandatory cryptographic logging of every administrative, analyst, or AI agent action.

### D. Non-Functional Requirements (NFR)
* **NFR-1 [Security]**: Role-Based Access Control (RBAC) securing all client views.
* **NFR-2 [Performance]**: API request latency < 1.5s under concurrent loads.
* **NFR-3 [Resilience]**: Smart AI-model fallbacks (Gemini-3.5-flash to Gemini-3.1-flash-lite) with exponential backoffs to conquer 503 limit drops.
* **NFR-4 [Availability]**: 99.9% uptime on active shield-ing components.

### E. Detailed User Stories & Acceptance Criteria

We outline the primary operational epics of FraudShield AI below:

1. **Epic: Secure Threat Ingestion**
   * *User Story*: As a Fraud Analyst, I want anomalous transactions to show up in the live feed immediately with a clear risk score, so I know which issues require urgent attention.
   * *Acceptance Criteria*: Alerts must highlight severity (CRITICAL/SUSPICIOUS), map geographical anomalies, and link to a distinct case record.

2. **Epic: Server-Side Generative Forensic Report**
   * *User Story*: As an Investigator, I want to trigger a Gemini core audit on any transaction, so that I receive an immediate breakdown of device fingerprints and proposed security proposals.
   * *Acceptance Criteria*: Clicking 'Trigger Gemini Audit' queries server-side routes, returns a comprehensive JSON string with reasoning, anomalies, and risk score, and increments logs.

3. **Epic: UiPath Case Progress Workflow**
   * *User Story*: As a Compliance Officer, I want the system to escalate active cases through structured stages (Intake, Investigation, Review) tracked by UiPath Maestro, so that we remain 100% compliant with BSA limits.
   * *Acceptance Criteria*: Case changes must update SLA status and log signatures.

---

## SECTION 3: TECHNICAL REQUIREMENTS DOCUMENT (TRD)

### System Architecture Layout

```
                        [Next.js 15 Client Web App]
                                     |
                       (API Layer - JWT Auth Shield)
                                     |
                       [Next.js Server API Routes]
                         /           |           \
         [Gemini API Client]   [Prisma / SQL]   [UiPath Maestro]
         (Cognitive Audits)    (Data Schema)    (Case Workflows)
```

### Technology Matrix
* **Frontend**: Next.js 15 (App Router with Server Components), React, Tailwind CSS, lucide-react icons, and motion/react for smooth interaction transitions.
* **Backend Utilities**: Next.js API Routes (`app/api/*`) for server-side abstraction.
* **Cognitive Engine**: `@google/genai` TypeScript SDK utilizing `gemini-3.5-flash` with dual fallbacks to `gemini-3.1-flash-lite` for ultimate live reliability.
* **Database Representation**: Relational standard schemas mapped with Prisma ORM and SQLite/PostgreSQL, featuring unique keys, indices, and audit-stamped schemas.
* **Orchestration**: Represented as UiPath Maestro case records, SLA clocks, and robot actions.

---

## SECTION 4: COMPLETE APP FLOW

1. **Executive HUD Home Screen**: Shows top-level health details (latency, accuracy, active firewall state) with an interactive phone simulator reflecting a mobile security administrator dashboard.
2. **Operations Dashboard Tab**:
   * *Inputs*: Scenario selection ("Impossible Travel Velocity", "ATO Biometric Bypass Drain", "Credit Mule Micro Test").
   * *Actions*: Trigger custom transactions which load immediately into the phone simulator.
   * *Status*: Active threat level is represented by concentric SVG glowing gauges (Safe: 38%, Elev: 64%, Extreme: 94%).
3. **Interactive Case Workspace View**: List of active fraud tickets. Highlights assignment names, mitigation actions, and permits moving cases through intake and resolution states.
4. **Chat Failsafe Terminal**: Operator chat linking to 'Aegis-9 AI Copilot'. Prompts call API routes with resilience logic.

---

## SECTION 5: UI/UX DESIGN BRIEF

* **Color Palette**: Cyber Dark theme. Deep Obsidian canvas backgrounds (`#05070a`), translucent glass panels (`bg-white/5 border-white/10 backdrop-blur-md`), vibrant hazard indicators (Neon Cyan for safe, Royal Violet for elevated, Crimson Red for extreme threat alerts).
* **Typography**: Clean, tech-forward feel. "Inter" or adaptive sans-serif for principal interfaces, paired with "JetBrains Mono" (`font-mono`) for numerical values, system timestamps, and database hashes.
* **Elevations & Shadows**: Distinct card groupings utilizing custom indigo and cyan glow reflections (`glow-cyan`, `glow-rose`) to emphasize cognitive recommendations.

---

## SECTION 6: COMPLETE POSTGRESQL DATABASE SCHEMA

```sql
-- Users Table: Identity records with strict Role indicators
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  user_role VARCHAR(100) NOT NULL, -- 'Admin', 'Fraud Analyst', 'Investigator', 'Compliance Officer', 'Executive Viewer'
  mfa_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cases Table: Core ticket tracker managed via UiPath Maestro
CREATE TABLE cases (
  id VARCHAR(255) PRIMARY KEY,
  alert_id VARCHAR(255),
  status VARCHAR(100) NOT NULL, -- 'Intake', 'Evidence Collection', 'Under Scan', 'Human Review', 'Escalated', 'Closed & Resolved'
  assignee_id VARCHAR(255),
  sla_target_hours INT DEFAULT 24,
  risk_rating INT NOT NULL,
  compliance_checked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assignee_id) REFERENCES users(id)
);

-- Evidence Table: Collection logs of fingerprints and IP routing reports
CREATE TABLE evidence (
  id VARCHAR(255) PRIMARY KEY,
  case_id VARCHAR(255) NOT NULL,
  evidence_type VARCHAR(100) NOT NULL, -- 'IP Geolocation', 'Device Fingerprint', 'Biometric Signature'
  file_payload TEXT, -- Base64 hashes or simulation records
  secure_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

-- AuditLogs Table: Persistent ledger of all security overrides
CREATE TABLE audit_logs (
  id VARCHAR(255) PRIMARY KEY,
  time_stamp VARCHAR(100) NOT NULL,
  action_type VARCHAR(100) NOT NULL, -- 'SYSTEM', 'ALERTS', 'COGNITIVE', 'SECURITY'
  description TEXT NOT NULL,
  operator_role VARCHAR(100) NOT NULL
);
```

---

## SECTION 7: API LAYER DESIGN

### 1. Ingestion of Dynamic Scenarios
* **POST `/api/gemini/analyze`**
  * *Request Body*:
    ```json
    {
      "transaction": {
        "id": "tx-5082",
        "merchant": "COINBASE SECURE",
        "amount": 9800.0,
        "location": "Lagos, NG",
        "category": "Instant Asset Withdrawal"
      }
    }
    ```
  * *Response Payload*:
    ```json
    {
      "verdict": "CRITICAL",
      "riskScore": 94,
      "summary": "ATO digital wallet drain immediately after credential reset.",
      "anomalies": ["Device Fingerprint Bypass", "High-Velocity Capital Outflow"],
      "recommendation": "IMMEDIATE CARD BLOCK & MANDATORY SMS OTP CHALLENGE"
    }
    ```

---

## SECTION 8: AI MULTI-AGENT COLLABORATION WORKFLOW

1. **Fraud Detection Agent**: Constantly listens to incoming transactions, checking geographic distance anomalies in database files.
2. **Cognitive Risk Scoring Agent**: Assesses user behavior heuristics versus normal historic averages, generating a unified risk rating (1 to 100).
3. **Evidence Extraction Agent**: Fetches browser user-agent tokens, VPN network relays, and biometric signatures.
4. **UiPath Coordinator Agent**: Dispatches structured webhooks directly to the UiPath Orchestrator queue.

---

## SECTION 9: UIPATH MAESTRO CASE MANAGEMENT LIFECYCLE

```
[ALERT INTAKE] ---> [ROBOT VALIDATION] ---> [AGENT INVESTIGATION]
                                                   |
                                                   v
[TICKET CLOSED] <--- [AUTO EXCLUSION] <--- [HUMAN PANEL DECISION]
```
1. **Intake Queue Rule**: Any case with a risk score above 65 is structured automatically as a high-priority incident inside UiPath Maestro.
2. **Validation Stage**: Robots execute automated lookup on the active CRM database.
3. **Escalation SLA Boundary**: If human review is pending for more than 15 minutes, automated triggers escalate coordinates to Section compliance authorities.

---

## SECTION 10: MONOREPO STRUCTURE

```
├── app/
│   ├── api/
│   │   └── gemini/
│   │       ├── analyze/     # Core sever fallback-backed transaction scanners
│   │       └── chat/        # Aegis-9 Interactive chatbot router
│   ├── globals.css          # Tailwind CSS variable declarations
│   ├── layout.tsx           # Layout viewport wrappers
│   └── page.tsx             # Sovereign dashboard & smartphone workspace
├── lib/
│   ├── utils.ts             # Tailwind CSS variable optimization tools
│   └── gemini.ts            # GoogleGenAI resilient fallback & backoff logic
└── package.json             # App dependencies
```

---

## SECTION 11: IMPLEMENTATION ROADMAP & SPRINT CALIBRATION
* **Phase 1 [Calibration]**: Completed. Multi-model resilience algorithms deployed.
* **Phase 2 [Enterprise Workspace]**: Role selector integration, dynamic case assignments, interactive compliance checklists, live audit systems, database schema visualizers, and beautiful styling.
* **Phase 3 [UiPath Connection]**: Direct production endpoints linked with webhook endpoints.

---

## SECTION 12: HACKATHON WINNING PRESENTATION DECK & DEMO SCRIPT

### 5-Minute Live Demo Flow
1. **0:00 - 1:00 [The Problem Statement]**: Detail the nightmare of false alerts and long manual investigations.
2. **1:00 - 2:30 [The Actionable HUD Screen]**: Demonstrate the interactive phone screen. Switch between the "Fraud Analyst" and "Investigator" persona. Show how the whole system adapts dynamically!
3. **2:30 - 4:00 [Autonomous Audit Flow]**: Trigger high-threat events ("Impossible Travel Velocity", "ATO Biometric Bypass Drain") and watch Gemini investigate live under real-time network backoffs.
4. **4:00 - 5:00 [Compliance & Orchestration Close]**: Show the generated compliance ledger audit trails, proof of role permissions, fully mapped PostgreSQL ERD tables, and the completed UiPath case timeline.

---

## SECTION 13: DEVELOPMENT CHECKLIST
- [x] Resilient Gemini 3.5 server-side API endpoints with dual model fallbacks.
- [x] Custom exponential retry algorithms preventing API unavailability.
- [x] Multi-Role Access Control (RBAC) Switcher panel.
- [x] Interactive Case Management Kanban board inside the dashboard workspace.
- [x] Live PostgreSQL database ERD & schemas schema viewer.
- [x] Compliance SLA audit checklist with responsive status displays.
- [x] Full audit trails ledger with interactive search filter logs.
- [x] Fluid layout design utilizing Tailwind CSS, lucide icons, and motion.
