Here’s your **updated GitHub README.md** with both **Live Demo + YouTube Demo Video properly integrated** and polished for hackathon submission:

---

# 🛡️ FraudShield AI

### Enterprise AI Fraud Detection & BPMN Orchestration System

FraudShield AI is a **real-time, AI-powered fraud detection and orchestration platform** built using **UiPath API Workflows + Maestro BPMN**. It detects suspicious activity, assigns risk scores, generates human-readable AI explanations, and automatically triggers security actions like alerts, monitoring routing, and incident creation.

---

# 🌐 Live Demo

👉 [https://fraud-shield-ai-eta.vercel.app/](https://fraud-shield-ai-eta.vercel.app/)

---

# 🎥 Demo Video

👉 [https://youtu.be/H7th0TsKur4?si=36abYWbMvUtlolQ4](https://youtu.be/H7th0TsKur4?si=36abYWbMvUtlolQ4)

---

# ❗ Problem

Modern digital systems face increasingly complex fraud patterns that traditional rule-based systems cannot handle effectively.

Key challenges include:

* Delayed fraud detection (not real-time)
* Lack of automated response workflows
* No unified orchestration between security tools
* High dependency on manual analyst review
* Poor visibility and fragmented audit trails
* Limited explainability of fraud decisions

---

# 💡 Solution

FraudShield AI solves these problems using an **end-to-end automated fraud intelligence system**:

### Core Capabilities:

* ⚡ Real-time fraud scoring (0–100)
* 🤖 LLM-based fraud explanation engine
* 🌍 Impossible travel detection
* 📱 Device fingerprint validation
* 🔁 Behavioral anomaly detection
* 🚨 Automatic alerting for High/Critical events
* 🎫 ServiceNow incident creation
* 📊 SIEM / monitoring system integration
* 📧 SendGrid email notifications
* 📈 Scheduled fraud intelligence reporting
* 🔄 BPMN-based orchestration using Maestro
* ⏱ Timeout + retry resilience system

---

# 🏗️ Architecture

```text
External Event (Login / Transaction)
            │
            ▼
   FraudShield Scorer (AI Engine)
            │
            ▼
 Risk Classification Gateway (BPMN)
   ├── Low Risk → Monitor Only
   ├── Medium Risk → Review Queue
   └── High/Critical →
         ├── SIEM Push
         ├── ServiceNow Incident
         ├── Email Alert
            │
            ▼
        Audit Logging Layer
            │
            ▼
     Fraud Intelligence Reports
```

---

# 🔄 Workflow Components

## 1. FraudShield Scorer

* Analyzes login, transaction, and behavior data
* Computes risk score (0–100)
* Detects anomalies (geo-velocity, device mismatch, brute force)
* Generates LLM explanation for transparency
* Returns structured JSON decision

---

## 2. Fraud Monitor Push

* Routes fraud events to monitoring systems
* Sends data to SIEM / dashboards
* Applies severity-based queue routing
* Includes retry and failure handling

---

## 3. ServiceNow Incident Engine

* Automatically creates security incidents for Critical fraud
* Sends structured forensic details
* Enables SOC team response workflow

---

## 4. Fraud Report Generator

* Runs on scheduled triggers (daily/hourly)
* Aggregates fraud logs
* Computes risk analytics:

  * Total events
  * Risk distribution
  * Top fraud reasons
  * Blocked vs allowed actions
* Sends automated email reports via SendGrid

---

# 🔀 BPMN Orchestration (Maestro)

* Message Start Event (Fraud Event Received)
* FraudShield Scorer Service Task
* 30s Timeout Boundary Event (fallback handling)
* Risk Gateway (Low / Medium / High)
* Parallel Execution (Critical Path):

  * SIEM Push
  * ServiceNow Incident
  * Email Alert
* Audit Join Gateway
* End Event

---

# 🧪 Test Scenarios

### 🟢 Low Risk

* Normal login from known device
* Expected: Allow + Log only

### 🟡 Medium Risk

* New device + moderate anomaly
* Expected: Review Queue + Monitoring

### 🔴 High/Critical Risk

* Impossible travel + brute force attack
* Expected:

  * Block action
  * ServiceNow incident created
  * Email alert sent
  * SIEM push triggered

---

# ⚙️ Tech Stack

* UiPath API Workflows
* Maestro BPMN Orchestration
* JavaScript (Scoring + Logic Engine)
* SendGrid Email API
* ServiceNow Incident API
* REST APIs
* JSON-based workflow engine
* SIEM / Monitoring integrations

---

# 📊 Business Impact

* ⏱ Faster fraud detection (real-time)
* 🧠 AI-assisted decision transparency
* 🔁 Fully automated security response
* 📉 Reduced manual analyst workload
* 📚 Complete audit and compliance trail
* 🚨 Faster SOC incident response

---

# 🚀 Future Enhancements

* Graph-based fraud detection engine
* ML behavioral risk scoring model
* Kafka event streaming layer
* Real-time fraud dashboard
* Multi-region deployment support
* Advanced LLM fraud investigator agent

---

# 📄 License

This project is intended for demonstration and hackathon purposes. Production deployment requires proper security hardening and compliance configuration.

---

# 👨‍💻 Built For

**UiPath AgentHack 2026**

AI • Automation • BPMN Orchestration • Cybersecurity • Intelligent Systems

---


