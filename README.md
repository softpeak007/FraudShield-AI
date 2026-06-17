# FraudShield AI

## Agentic Fraud Case Management Platform

### Built for UiPath AgentHack 2026 — Agentic Case Management

FraudShield AI is an AI-powered fraud investigation and case management platform designed to help organizations identify suspicious activities, accelerate investigations, and support human-in-the-loop decision making.

The platform combines AI-assisted analysis powered by Google Gemini with structured case management workflows, transparent audit trails, and governance-focused review processes. FraudShield AI demonstrates how intelligent systems and human expertise can work together to improve fraud investigation operations.

---

## Problem Statement

Financial institutions process thousands of transactions every second, making it difficult to quickly identify and investigate suspicious activities.

Traditional fraud management systems often face challenges such as:

* High false-positive rates
* Manual investigation workflows
* Fragmented case management
* Limited audit visibility
* Slow resolution times
* Complex compliance requirements

FraudShield AI addresses these challenges through AI-assisted investigation support and structured case management workflows.

---

## Solution Overview

FraudShield AI provides a centralized workspace where analysts, investigators, compliance teams, and executives can collaborate throughout the fraud investigation lifecycle.

Core workflow:

**Intake → Evidence Collection → Analysis → Human Review → Resolution**

This workflow is designed around UiPath Maestro Case Management concepts and demonstrates governed case progression with human oversight.

---

## Key Features

### AI-Assisted Fraud Analysis

* Transaction evaluation
* Risk assessment support
* Investigation summaries
* Evidence analysis assistance
* Recommended next actions

### Structured Case Management

* Case creation and tracking
* Investigation lifecycle management
* Human review checkpoints
* Resolution workflows
* Audit-ready activity history

### Multi-Role Enterprise Dashboard

#### Administrator

* Platform monitoring
* System visibility
* Governance controls

#### Fraud Analyst

* Transaction review
* Risk analysis
* Case creation

#### Investigator

* Evidence review
* Investigation management
* Resolution processing

#### Compliance Officer

* Compliance verification
* Audit support
* Policy review

#### Executive Viewer

* Operational insights
* Risk visibility
* Business reporting

### Audit & Governance

* User activity tracking
* Case history logging
* Investigation transparency
* Governance-focused workflows

---

## Technical Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Framer Motion

### AI Layer

* Google Gemini API
* Server-side AI processing
* Intelligent retry handling
* Automatic model fallback support

### Deployment

* Vercel
* GitHub

---

## Resilient AI Infrastructure

FraudShield AI includes a resilient AI processing layer designed to improve reliability during temporary service interruptions.

Features include:

* Automatic retry handling
* Exponential backoff strategy
* Graceful error recovery
* Intelligent model fallback support

---

## Getting Started

### Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Lint Project

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

---

## Project Documentation

Additional project resources are available in:

```text
DOCS_ARCH.md
```

Documentation includes:

* Product Requirements Document (PRD)
* Technical Requirements Document (TRD)
* App Flow Documentation
* UI/UX Design Brief
* Backend Schema Design
* Implementation Plan
* Architecture Documentation

---

## Live Demo & Resources

### Live Application

https://fraud-shield-ai-eta.vercel.app/

### GitHub Repository

https://github.com/softpeak007/FraudShield-AI

### Demo Video

https://youtube.com/shorts/Mrs-IPlhX8Y?si=ZHfFht-upDVhZIvC

---

## Hackathon Alignment

FraudShield AI demonstrates:

* Agentic Case Management
* Human-in-the-Loop Review
* Workflow Orchestration Concepts
* Governance & Auditability
* AI-Assisted Fraud Investigation
* Enterprise Case Management Principles

---

## What We Learned

Building FraudShield AI highlighted the importance of combining AI capabilities with human oversight, governance, transparency, and structured workflows when designing enterprise systems.

---

## Future Roadmap

Planned future enhancements include:

* Real-time transaction ingestion
* Advanced risk scoring models
* Multi-agent investigation workflows
* Expanded compliance reporting
* Enhanced analytics dashboards
* Enterprise authentication and access controls

---

## License

MIT License
