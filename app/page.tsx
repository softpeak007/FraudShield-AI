"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Activity,
  User,
  Home,
  Bell,
  Briefcase,
  Cpu,
  Terminal,
  Zap,
  Play,
  Check,
  X,
  Lock,
  Unlock,
  Globe,
  MapPin,
  CreditCard,
  Smartphone,
  Volume2,
  VolumeX,
  Send,
  Loader2,
  Sparkles,
  Radio,
  Database,
  ArrowRight,
  TrendingDown,
  Clock,
  RefreshCw,
  Search,
  Filter,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  Layers,
  ChevronRight,
  UserCheck,
  Compass,
  FileText,
  Sliders,
  CheckSquare,
  HelpCircle,
  Settings,
  Menu,
  Upload,
  Paperclip,
  Trash2,
  Plus,
  LogOut
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";

// Interfaces
interface Alert {
  id: string;
  customer: string;
  merchant: string;
  amount: number;
  timestamp: string;
  category: string;
  location: string;
  riskScore: number;
  severity: "CRITICAL" | "SUSPICIOUS" | "SAFE";
  anomalies: string[];
  aiSummary: string;
  recommendation: string;
  caseId: string;
  status: "In Review" | "Approved" | "Blocked & Frozen" | "Escalated";
  deviceIp: string;
  deviceHeader: string;
  analystNotes?: string;
  timeline?: { time: string; event: string; status: string }[];
  evidenceFiles?: string[];
}

// Static deterministic sequence counters declared outside of component body for hook purity
let logCounterSequence = 1000;
let alertCounterSequence = 5200;

function createLogItem(category: "SYSTEM" | "ALERTS" | "SECURITY" | "INTELLIGENCE", text: string) {
  logCounterSequence++;
  return {
    id: `log-${logCounterSequence}`,
    time: new Date().toTimeString().split(" ")[0],
    category,
    text
  };
}

function getNextAlertIds() {
  alertCounterSequence++;
  return {
    randId: `TX-${alertCounterSequence}`,
    randCase: `CASE-${alertCounterSequence - 200}`
  };
}

function generateSandboxId() {
  return "SANDBOX-" + Math.floor(Math.random() * 9000 + 1000);
}

function generateSandboxCustomer() {
  return "Sandbox Account ID: " + Math.floor(Math.random() * 1000 + 1);
}

function generateSimulatorTxId() {
  return "TX-" + Math.floor(Math.random() * 9000 + 1000);
}

function generateSimulatorCaseId() {
  return "CASE-" + Math.floor(Math.random() * 9000 + 1000);
}

function generateSimulatorToken() {
  return "uipath-orchestrated-tok-" + Math.floor(Math.random() * 900000 + 100000);
}

function generateSimulatorSarHash() {
  return `sha255-sar-inc-${Math.floor(Math.random() * 90000 + 10000)}`;
}

export default function Page() {
  // Theme and UI States
  const [viewportMode, setViewportMode] = useState<"desktop" | "iphone" | "android">("desktop");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "Dashboard" | "Fraud Alerts" | "Cases" | "Analytics" | "Risk Intelligence" | "Compliance" | "Settings"
  >("Dashboard");
  const [mobileTab, setMobileTab] = useState<"home" | "alerts" | "cases" | "copilot">("home");
  const [selectedOrg, setSelectedOrg] = useState("Apex Global Bank Core");
  const [userRole, setUserRole] = useState<"Fraud Analyst" | "Investigator" | "Compliance Officer" | "Executive Viewer">("Fraud Analyst");
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState("18:05:00");
  const [globalSearch, setGlobalSearch] = useState("");
  const [notifyQueue, setNotifyQueue] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Corporate Credential Sign-in States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOperatorId, setLoginOperatorId] = useState("SEC-OPS-09");
  const [loginPasscode, setLoginPasscode] = useState("••••••••");
  const [loginState, setLoginState] = useState<"IDLE" | "AUTHENTICATING" | "DECRYPTING" | "ESTABLISHING" | "SUCCESS">("IDLE");
  const [loginLogs, setLoginLogs] = useState<string[]>([]);

  // File drag-and-drop state & ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // AI Multi-Agent Pipeline Simulator States
  const [isAgentSimulatorOpen, setIsAgentSimulatorOpen] = useState(false);
  const [simulatorPreset, setSimulatorPreset] = useState<"crypto" | "travel" | "micro" | "custom">("crypto");
  const [simulatorName, setSimulatorName] = useState("Hiroshi Tanaka");
  const [simulatorMerchant, setSimulatorMerchant] = useState("COINBASE LIQUIDITY ACCT");
  const [simulatorAmount, setSimulatorAmount] = useState(12450.00);
  const [simulatorLocation, setSimulatorLocation] = useState("Tokyo, JP (VPN Route)");
  const [simulatorIp, setSimulatorIp] = useState("103.4.18.25");
  const [simulatorHeader, setSimulatorHeader] = useState("Mozilla/5.0 (Macintosh; Intel Mac OS X 14)");
  const [simulatorStep, setSimulatorStep] = useState<"IDLE" | "INTAKE" | "INVESTIGATION" | "GRAPH" | "RISK" | "REPORT" | "UIPATH" | "RESOLVED">("IDLE");
  const [simulatorLogs, setSimulatorLogs] = useState<string[]>([]);
  const [pipelineProgress, setPipelineProgress] = useState(0);

  // Manual Case Creation States
  const [isCreateCaseOpen, setIsCreateCaseOpen] = useState(false);
  const [newCaseCustomer, setNewCaseCustomer] = useState("");
  const [newCaseMerchant, setNewCaseMerchant] = useState("");
  const [newCaseAmount, setNewCaseAmount] = useState("");
  const [newCaseCategory, setNewCaseCategory] = useState("Card Testing");
  const [newCaseLocation, setNewCaseLocation] = useState("United States");
  const [newCaseRiskScore, setNewCaseRiskScore] = useState(65);
  const [newCaseDeviceIp, setNewCaseDeviceIp] = useState("192.168.1.100");
  const [newCaseDeviceHeader, setNewCaseDeviceHeader] = useState("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0");

  const handleSimPresetChange = (preset: "crypto" | "travel" | "micro" | "custom") => {
    setSimulatorPreset(preset);
    playSound("click");
    if (preset === "crypto") {
      setSimulatorName("Hiroshi Tanaka");
      setSimulatorMerchant("COINBASE LIQUIDITY ACCT");
      setSimulatorAmount(12450.00);
      setSimulatorLocation("Tokyo, JP (VPN Route)");
      setSimulatorIp("103.4.18.25");
      setSimulatorHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 14)");
    } else if (preset === "travel") {
      setSimulatorName("Chloe Dubois");
      setSimulatorMerchant("SNCF RAILWAYS PARIS");
      setSimulatorAmount(345.80);
      setSimulatorLocation("London, UK (Geo-Velocity Jump)");
      setSimulatorIp("195.154.122.9");
      setSimulatorHeader("Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)");
    } else if (preset === "micro") {
      setSimulatorName("Alastair Ward");
      setSimulatorMerchant("GOOGLE TEMPORARY HOLD");
      setSimulatorAmount(1.00);
      setSimulatorLocation("Lagos, NG (Proxy Pool)");
      setSimulatorIp("102.89.3.44");
      setSimulatorHeader("OkHttp/4.12.0 Script Client");
    }
    setSimulatorStep("IDLE");
    setSimulatorLogs([]);
    setPipelineProgress(0);
  };

  const runAgentMaverickPipeline = async (
    overridePreset?: "crypto" | "travel" | "micro" | "custom",
    overrideName?: string,
    overrideMerchant?: string,
    overrideAmount?: number,
    overrideLocation?: string,
    overrideIp?: string,
    overrideHeader?: string,
    existingAlertId?: string
  ) => {
    if (simulatorStep !== "IDLE" && simulatorStep !== "RESOLVED") return;
    playSound("click");
    setSimulatorStep("INTAKE");
    setPipelineProgress(10);

    const isPresetValid = (p: any): p is "crypto" | "travel" | "micro" | "custom" => {
      return ["crypto", "travel", "micro", "custom"].includes(p);
    };

    const activePreset = isPresetValid(overridePreset) ? overridePreset : simulatorPreset;
    const activeName = (typeof overrideName === "string" && overrideName) ? overrideName : simulatorName;
    const activeMerchant = (typeof overrideMerchant === "string" && overrideMerchant) ? overrideMerchant : simulatorMerchant;
    const activeAmount = (typeof overrideAmount === "number" && !isNaN(overrideAmount)) ? overrideAmount : simulatorAmount;
    const activeLocation = (typeof overrideLocation === "string" && overrideLocation) ? overrideLocation : simulatorLocation;
    const activeIp = (typeof overrideIp === "string" && overrideIp) ? overrideIp : simulatorIp;
    const activeHeader = (typeof overrideHeader === "string" && overrideHeader) ? overrideHeader : simulatorHeader;

    if (isPresetValid(overridePreset)) setSimulatorPreset(overridePreset);
    if (typeof overrideName === "string" && overrideName) setSimulatorName(overrideName);
    if (typeof overrideMerchant === "string" && overrideMerchant) setSimulatorMerchant(overrideMerchant);
    if (typeof overrideAmount === "number" && !isNaN(overrideAmount)) setSimulatorAmount(overrideAmount);
    if (typeof overrideLocation === "string" && overrideLocation) setSimulatorLocation(overrideLocation);
    if (typeof overrideIp === "string" && overrideIp) setSimulatorIp(overrideIp);
    if (typeof overrideHeader === "string" && overrideHeader) setSimulatorHeader(overrideHeader);

    // Get Case IDs
    let targetAlertId = existingAlertId;
    let targetCaseId = "";

    setSimulatorLogs(["[INTAKE AGENT] Initiating transaction ingestion layer...", "[INTAKE AGENT] Ingesting transaction from customer: " + activeName]);
    await new Promise(resolve => setTimeout(resolve, 1200));

    // If there is no existing alert, we create and store it in the database now!
    if (!targetAlertId) {
      const { randId, randCase } = getNextAlertIds();
      targetAlertId = randId;
      targetCaseId = randCase;

      const initialAlert: Alert = {
        id: targetAlertId,
        customer: activeName,
        merchant: activeMerchant,
        amount: Number(activeAmount),
        timestamp: "Just now",
        category: activePreset === "crypto" ? "Account Drain attempt (Multi-Agent)" : activePreset === "travel" ? "Velocity Bypass (Multi-Agent)" : "Micro Charge Test (Multi-Agent)",
        location: activeLocation,
        riskScore: 20, // initial baseline risk score
        severity: "SAFE",
        anomalies: [],
        aiSummary: "Multi-agent automated compliance investigation in progress...",
        recommendation: "DIAGNOSTIC SCAN ACTIVE",
        caseId: targetCaseId,
        status: "In Review",
        deviceIp: activeIp,
        deviceHeader: activeHeader,
        analystNotes: "Case initiated via multi-agent platform simulator.",
        timeline: [
          { time: "Just now", event: "Intake Agent: Ingested & registered case", status: "Complete" }
        ]
      };
      setAlerts(prev => [initialAlert, ...prev]);
      setSelectedAlert(initialAlert);
    } else {
      // Find case id of existing target alert or mock one
      const existing = alerts.find(a => a.id === targetAlertId);
      targetCaseId = existing ? existing.caseId : generateSimulatorCaseId();
    }

    setSimulatorLogs(prev => [...prev, "[INTAKE AGENT] Dynamic check: structural validations parsed successfully.", "[INTAKE AGENT] Case successfully opened inside database. Assigned Tracking Case Id: " + targetCaseId]);
    
    // Step 2: Investigation Agent (Gemini live sweep!)
    setSimulatorStep("INVESTIGATION");
    setPipelineProgress(25);
    setSimulatorLogs(prev => [...prev, "[INVESTIGATION AGENT] Summoning Gemini 3.5-flash endpoint for deep forensic reasoning..."]);
    
    let geminiVerdict = "SUSPICIOUS";
    let geminiRisk = 75;
    let geminiReasoning = "Transaction velocity represents anomalous pattern matching common card-spoofing vectors.";
    let geminiAnomalies: string[] = ["Velocity Impossible Check", "Device Unverified Header"];
    let geminiRecommendation = "RE-AUTHENTICATE CUSTOMER VIA MFA CHALLENGE";
    let geminiSummary = "Multi-agent deep scan flagged proxy geolocational mismatches.";
    
    try {
      const mockTx = {
        id: targetAlertId,
        customer: activeName,
        merchant: activeMerchant,
        amount: Number(activeAmount),
        timestamp: "Just now",
        category: "Multi-Agent Security Scan",
        location: activeLocation,
        riskScore: 85,
        severity: "SUSPICIOUS" as const,
        anomalies: ["Unresolved Router Signature"],
        aiSummary: "Performing live evaluation.",
        recommendation: "MFA challenge recommended.",
        caseId: targetCaseId,
        status: "In Review" as const,
        deviceIp: activeIp,
        deviceHeader: activeHeader
      };
      
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction: mockTx })
      });
      
      if (response.ok) {
        const data = await response.json();
        geminiVerdict = data.verdict || "CRITICAL";
        geminiRisk = data.riskScore || 88;
        geminiReasoning = data.reasoning || "Anomalous multi-agent transaction signature detected.";
        geminiAnomalies = data.anomalies || ["Risk Factor Mismatch"];
        geminiRecommendation = data.recommendation || "IMMEDIATE CAPITAL FREEZE";
        geminiSummary = data.summary || "Case escalated via 5-agent compliance loop.";
      }
    } catch (_) {
      setSimulatorLogs(prev => [...prev, "[INVESTIGATION AGENT] WARNING: Dedicated server link throttled. Switched to secure fail-safe heuristic node."]);
    }
    
    setSimulatorLogs(prev => [...prev, `[INVESTIGATION AGENT] Gemini analysis complete. Calculated Risk Coefficient: ${geminiRisk}%. Verdict: ${geminiVerdict}.`, `[INVESTIGATION AGENT] Logged forensic reasoning: "${geminiReasoning.substring(0, 80)}..."`]);

    // Live update case in DB and Selected status
    setAlerts(prev => prev.map(a => {
      if (a.id === targetAlertId) {
        return {
          ...a,
          riskScore: geminiRisk,
          severity: geminiVerdict as any,
          anomalies: geminiAnomalies,
          aiSummary: geminiReasoning,
          recommendation: geminiRecommendation,
          timeline: [
            ...a.timeline!,
            { time: "Just now", event: "Investigation Agent: Gemini forensic analysis generated findings", status: "Complete" }
          ]
        };
      }
      return a;
    }));
    setSelectedAlert(prev => {
      if (prev && prev.id === targetAlertId) {
        return {
          ...prev,
          riskScore: geminiRisk,
          severity: geminiVerdict as any,
          anomalies: geminiAnomalies,
          aiSummary: geminiReasoning,
          recommendation: geminiRecommendation,
          timeline: [
            ...prev.timeline!,
            { time: "Just now", event: "Investigation Agent: Gemini forensic analysis generated findings", status: "Complete" }
          ]
        };
      }
      return prev;
    });

    // Step 3: Graph Analysis Agent
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSimulatorStep("GRAPH");
    setPipelineProgress(45);
    setSimulatorLogs(prev => [...prev, "[GRAPH AGENT] Querying active identity graphs for linked accounts and phone clusters...", "[GRAPH AGENT] Neo4j projection: scanning proximity clusters..."]);
    await new Promise(resolve => setTimeout(resolve, 1300));
    
    // Mapped correlation risk based on preset
    let graphOutcome = "Discovered linkage coordinates: 2 active accounts shared same hardware ID.";
    if (activePreset === "crypto") {
      graphOutcome = "Discovered active relationship network: customer IP matches known Darknet mule router coordinates. Mapped 3 proxy hops.";
    } else if (activePreset === "travel") {
      graphOutcome = "Discovered entity correlation: credit card used in 2 geographic regions simultaneously within 10 minutes.";
    } else if (activePreset === "micro") {
      graphOutcome = "Discovered high-frequency shell network: 14 newly generated micro-accounts registered under same banking terminal.";
    }
    setSimulatorLogs(prev => [...prev, `[GRAPH AGENT] Network linkage evaluated. ${graphOutcome}`]);

    // Live update case in DB and Selected status
    setAlerts(prev => prev.map(a => {
      if (a.id === targetAlertId) {
        return {
          ...a,
          timeline: [
            ...a.timeline!,
            { time: "Just now", event: `Graph Analysis Agent: Scanned entity correlation vectors - ${graphOutcome}`, status: "Complete" }
          ]
        };
      }
      return a;
    }));
    setSelectedAlert(prev => {
      if (prev && prev.id === targetAlertId) {
        return {
          ...prev,
          timeline: [
            ...prev.timeline!,
            { time: "Just now", event: `Graph Analysis Agent: Scanned entity correlation vectors - ${graphOutcome}`, status: "Complete" }
          ]
        };
      }
      return prev;
    });
    
    // Step 4: Risk Assessment Agent
    setSimulatorStep("RISK");
    setPipelineProgress(65);
    setSimulatorLogs(prev => [...prev, "[RISK AGENT] Applying enterprise compliance risk matrix metrics...", `[RISK AGENT] Merging Gemini Verdict [${geminiVerdict}] with Graph Association Index...`]);
    await new Promise(resolve => setTimeout(resolve, 1200));
    const computedFinalRisk = Math.min(100, Math.max(0, Math.round(geminiRisk + (activePreset === "crypto" ? 2 : 0))));
    const finalSeverity = computedFinalRisk > 80 ? "CRITICAL" : computedFinalRisk > 40 ? "SUSPICIOUS" : "SAFE";
    
    setSimulatorLogs(prev => [...prev, `[RISK AGENT] Computation concluded successfully. Final Computed Threat Risk Score: ${computedFinalRisk}% [${finalSeverity}]`]);

    // Live update case in DB and Selected status
    setAlerts(prev => prev.map(a => {
      if (a.id === targetAlertId) {
        return {
          ...a,
          riskScore: computedFinalRisk,
          severity: finalSeverity as any,
          timeline: [
            ...a.timeline!,
            { time: "Just now", event: `Risk Assessment Agent: Evaluated risk quotient & verdict`, status: finalSeverity === "CRITICAL" ? "Critical" : "Complete" }
          ]
        };
      }
      return a;
    }));
    setSelectedAlert(prev => {
      if (prev && prev.id === targetAlertId) {
        return {
          ...prev,
          riskScore: computedFinalRisk,
          severity: finalSeverity as any,
          timeline: [
            ...prev.timeline!,
            { time: "Just now", event: `Risk Assessment Agent: Evaluated risk quotient & verdict`, status: finalSeverity === "CRITICAL" ? "Critical" : "Complete" }
          ]
        };
      }
      return prev;
    });
    
    // Step 5: Report Agent
    setSimulatorStep("REPORT");
    setPipelineProgress(80);
    setSimulatorLogs(prev => [...prev, "[REPORT AGENT] Assembling formal FinCEN-104 Suspicious Activity Report (SAR)...", "[REPORT AGENT] Writing legal findings block to central database cache..."]);
    await new Promise(resolve => setTimeout(resolve, 1200));
    const sarHash = generateSimulatorSarHash();
    setSimulatorLogs(prev => [...prev, `[REPORT AGENT] SAR compiling finished successfully. Registered compliance document block with cryptographic integrity hash matching: [${sarHash}]`]);

    // Live update case in DB and Selected status
    setAlerts(prev => prev.map(a => {
      if (a.id === targetAlertId) {
        return {
          ...a,
          timeline: [
            ...a.timeline!,
            { time: "Just now", event: `Report Agent: Suspicious Activity Report (SAR) registered securely [Hash: ${sarHash}]`, status: "Complete" }
          ]
        };
      }
      return a;
    }));
    setSelectedAlert(prev => {
      if (prev && prev.id === targetAlertId) {
        return {
          ...prev,
          timeline: [
            ...prev.timeline!,
            { time: "Just now", event: `Report Agent: Suspicious Activity Report (SAR) registered securely [Hash: ${sarHash}]`, status: "Complete" }
          ]
        };
      }
      return prev;
    });
    
    // Step 6: UiPath Maestro Approval Integration
    setSimulatorStep("UIPATH");
    setPipelineProgress(90);
    setSimulatorLogs(prev => [...prev, `[UIPATH MAESTRO] Compiling Robotic queue integration payload...`, `[UIPATH MAESTRO] Dispatched secure task transaction payload to UiPath Orchestrator queue: 'mitigation_verification' ...`, `[UIPATH MAESTRO] Webhook handshake dispatched. Awaiting digital robotic confirmation token...`]);
    await new Promise(resolve => setTimeout(resolve, 1400));
    const token = generateSimulatorToken();
    setSimulatorLogs(prev => [...prev, `[UIPATH MAESTRO] Robotic response token received successfully: [${token}]. Robot confirms automatic card lock & capital freeze instructions.`]);

    // Live update case in DB and Selected status
    setAlerts(prev => prev.map(a => {
      if (a.id === targetAlertId) {
        return {
          ...a,
          status: "Blocked & Frozen",
          analystNotes: `Case resolved automatically via 5-Agent cognitive sweep. FinCEN SAR filed. UiPath Robot locked user account card (token: ${token}).`,
          timeline: [
            ...a.timeline!,
            { time: "Just now", event: `UiPath Maestro dispatch handshake executed successfully`, status: "Complete" }
          ]
        };
      }
      return a;
    }));
    setSelectedAlert(prev => {
      if (prev && prev.id === targetAlertId) {
        return {
          ...prev,
          status: "Blocked & Frozen",
          analystNotes: `Case resolved automatically via 5-Agent cognitive sweep. FinCEN SAR filed. UiPath Robot locked user account card (token: ${token}).`,
          timeline: [
            ...prev.timeline!,
            { time: "Just now", event: `UiPath Maestro dispatch handshake executed successfully`, status: "Complete" }
          ]
        };
      }
      return prev;
    });
    
    // Step 7: Completed Resolution
    setSimulatorStep("RESOLVED");
    setPipelineProgress(100);
    playSound("success");
    addLog("SECURITY", `Multi-Agent Pipeline: Automated resolution compiled successfully for case ${targetAlertId}.`);
    setSimulatorLogs(prev => [...prev, `[RESOLVED] COGNITIVE FLOW ENDED. Success! The generated case has been injected into your active dashboard table. Card frozen, threat vectors neutralized. Ready for next forensic command.`]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Filter & Sorted states for Case Management
  const [searchText, setSearchText] = useState("");
  const [filterRisk, setFilterRisk] = useState<"ALL" | "CRITICAL" | "SUSPICIOUS" | "SAFE">("ALL");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "In Review" | "Approved" | "Blocked & Frozen" | "Escalated">("ALL");
  const [sortBy, setSortBy] = useState<"riskScore" | "amount" | "id">("riskScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [bulkList, setBulkList] = useState<string[]>([]);

  // AI Copilot State
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "model"; content: string; time: string; suggestions?: string[] }[]>([
    {
      role: "model",
      content: `Welcome Operator. I am Aegis-9, your secure FraudShield AI Copilot. I have analyzed today's live transaction database.

Currently, I detect **1 Critical-severity threat vector**, **2 Suspicious account alerts**, and **1 Approved/Safe baseline** requiring review.

### **Current Security Assessment**
• **System Integrity Status**: Elevated Threat Risk Level
• **Analytical Confidence rating**: 95%
• **Core Threat Exposure**: Unexpected password resets followed by high-velocity liquid capital transfer patterns.

### **Recommended Risk Mitigation Actions**
• **Freeze Account**: Immediately lock active credit/debit card terminals for critically-rated transactions (e.g., Amara Okoronkwo).
• **Verify Customer Identity**: Deploy mandatory multi-factor SMS or physical email passkey challenges on suspicious pattern anomalies.
• **Terminate Active Sessions**: Revoke active user login tokens for automated Python scripting CLI endpoints.
• **Escalate to Investigator**: Compile forensically validated logs with raw network traces to fraud response specialists.

Proactively guiding your next workflow operation. Please select any analytical action below or supply custom query directives.`,
      time: "18:04:00",
      suggestions: [
        "🔍 Investigate suspicious entities",
        "📊 Show risk analysis",
        "🕸 Visualize fraud network",
        "📄 Generate case report",
        "⚠ Show critical alerts",
        "🧾 Review evidence",
        "📈 Predict future risk",
        "🏦 Analyze account activity",
        "🔗 Find hidden relationships",
        "✅ Recommend next actions"
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Interactive Core Databases (Alerts)
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "TX-5082",
      customer: "Amara Okoronkwo",
      merchant: "NEXUS CRYPTO EXCHANGE",
      amount: 14900.00,
      timestamp: "3 mins ago",
      category: "Account Drain Attempt",
      location: "Reykjavík, IS (Mullvad Relay)",
      riskScore: 96,
      severity: "CRITICAL",
      anomalies: ["Device Fingerprint Bypass", "High-Velocity Capital Outflow", "Tor Node Routed"],
      aiSummary: `EXECUTIVE SUMMARY
A critical-level alert was compiled for Amara Okoronkwo after detecting a sudden, high-velocity withdrawal sequence of $14,900.00 at NEXUS CRYPTO EXCHANGE via a known virtual proxy routing node. The sequence initiated just seconds after a password and biometric challenge bypass attempt.

CASE DETAILS
- Subject Account: Amara Okoronkwo
- Transaction Entity: NEXUS CRYPTO EXCHANGE
- Monitored Outflow: $14,900.00
- Region: Reykjavík, IS (Mullvad Relay)
- Network Terminal: 185.213.154.12
- Client Interface: Mozilla/5.0 (X11; Linux x86)

KEY RISK INDICATORS
- High-velocity asset liquidation pattern detected.
- Connection established via Mullvad VPN / Tor network node to mask physical location.
- Bypassed security checkpoints and failed credentials logs identified.

EVIDENCE FOUND
- Access log registers a password reset followed immediately by liquid capital transfer request.
- The transaction originates from a network address associated with automated darknet mule routers.

RISK ASSESSMENT
- Confidence Score: 96%
- Calculated Risk Level: Critical Fraud Threat

RECOMMENDED ACTIONS
- Freeze Account
- Terminate Active Sessions
- Escalate to Investigator

FINAL VERDICT
- CRITICAL FRAUD VIOLATION`,
      recommendation: "Freeze Account",
      caseId: "CASE-4902",
      status: "In Review",
      deviceIp: "185.213.154.12",
      deviceHeader: "Mozilla/5.0 (X11; Linux x86) AppleWebKit/537.36 Chrome/121",
      analystNotes: "Awaiting primary device ping. Verified proxy matching known Darknet mule router.",
      timeline: [
        { time: "3 mins ago", event: "Automated alert generated by Policy Node 14", status: "Critical" },
        { time: "2 mins ago", event: "Biometric override attempt identified", status: "Warning" },
        { time: "1 min ago", event: "AI forensic proxy scan loaded", status: "Complete" }
      ]
    },
    {
      id: "TX-5081",
      customer: "Guillaume Mercier",
      merchant: "PARIS TELECOM PORTAL",
      amount: 49.99,
      timestamp: "12 mins ago",
      category: "Card Verification Test",
      location: "Paris, France",
      riskScore: 68,
      severity: "SUSPICIOUS",
      anomalies: ["Velocity Impossible Travel", "Recurrent Subscription Probing"],
      aiSummary: `EXECUTIVE SUMMARY
A standard card-testing alert was triggered for Guillaume Mercier following a localized physical card verification request of $49.99 in Paris, registered less than 4 minutes after a valid cash ATM withdrawal took place in San Francisco.

CASE DETAILS
- Subject Account: Guillaume Mercier
- Transaction Entity: PARIS TELECOM PORTAL
- Monitored Outflow: $49.99
- Region: Paris, France
- Network Terminal: 93.184.216.34
- Client Interface: Safari/17.2 iOS (iPhone 15 Pro)

KEY RISK INDICATORS
- Impossible travel velocity: Physical swipe in Paris and ATM withdrawal in San Francisco occurred within 4 minutes.
- Transaction amount matches typical low-value merchant testing signals.

EVIDENCE FOUND
- Point of sale terminal verification logged in Paris (04) mismatched the user's active mobile device geolocation data.

RISK ASSESSMENT
- Confidence Score: 72%
- Calculated Risk Level: Suspicious Activity

RECOMMENDED ACTIONS
- Block Transaction
- Verify Customer Identity
- Escalate to Investigator

FINAL VERDICT
- SUSPICIOUS`,
      recommendation: "Verify Customer Identity",
      caseId: "CASE-4901",
      status: "In Review",
      deviceIp: "93.184.216.34",
      deviceHeader: "Safari/17.2 iOS (iPhone 15 Pro)",
      analystNotes: "Unusual travel velocity. Standard EMV token mismatch detected.",
      timeline: [
        { time: "12 mins ago", event: "Card swiped in physical terminal Paris 04", status: "Incomplete" },
        { time: "12 mins ago", event: "Flagged mismatch with active US IP address pool", status: "Warning" }
      ]
    },
    {
      id: "TX-5080",
      customer: "Eleanor Sterling",
      merchant: "WHOLE FOODS SOMA",
      amount: 114.50,
      timestamp: "45 mins ago",
      category: "Retail POS Purchase",
      location: "San Francisco, USA",
      riskScore: 4,
      severity: "SAFE",
      anomalies: [],
      aiSummary: `EXECUTIVE SUMMARY
A regular retail transaction at Whole Foods SOMA for $114.50 was analyzed and approved automatically.

CASE DETAILS
- Subject Account: Eleanor Sterling
- Transaction Entity: WHOLE FOODS SOMA
- Monitored Outflow: $114.50
- Region: San Francisco, USA
- Network Terminal: 12.43.195.88
- Client Interface: NFC ApplePay Reader #7712

KEY RISK INDICATORS
- None identified. Device parameters and location align with typical customer baseline.

EVIDENCE FOUND
- EMV Cryptogram verified successfully.
- Localized biometric keychain validation validated.

RISK ASSESSMENT
- Confidence Score: 99%
- Calculated Risk Level: Safe / Minimal Risk

RECOMMENDED ACTIONS
- No Action Required

FINAL VERDICT
- APPROVED`,
      recommendation: "No Action Required",
      caseId: "CASE-4900",
      status: "Approved",
      deviceIp: "12.43.195.88",
      deviceHeader: "NFC ApplePay Reader #7712",
      analystNotes: "Fully secure biometrics. Routine household spending.",
      timeline: [
        { time: "45 mins ago", event: "Physical point of sale approved using secure keychain", status: "Safe" }
      ]
    },
    {
      id: "TX-5079",
      customer: "Douglas Vance",
      merchant: "P2P MICRO-TRANSFER CO",
      amount: 1.45,
      timestamp: "1 hr ago",
      category: "Micro-Charge Sequence",
      location: "Moscow, RU (Proxy Node)",
      riskScore: 78,
      severity: "SUSPICIOUS",
      anomalies: ["Automated Script Signatures", "Pre-Liquidation Probe"],
      aiSummary: `EXECUTIVE SUMMARY
A card testing pattern signature was discovered on the account of Douglas Vance, involving a $1.45 micro-charge transfer via an automated scripting terminal based in Moscow.

CASE DETAILS
- Subject Account: Douglas Vance
- Transaction Entity: P2P MICRO-TRANSFER CO
- Monitored Outflow: $1.45
- Region: Moscow, RU (Proxy Node)
- Network Terminal: 185.70.185.15
- Client Interface: Python-requests/2.31.0 Scripting CLI

KEY RISK INDICATORS
- Non-standard browser header indicating automated Python scripting.
- Use of localized proxy servers to route connection requests.

EVIDENCE FOUND
- Server endpoint telemetry registered high-frequency, programmatic attempts to check valid tokens.

RISK ASSESSMENT
- Confidence Score: 78%
- Calculated Risk Level: Suspicious / High Probability Card Verification

RECOMMENDED ACTIONS
- Verify Customer Identity
- Block Transaction
- Escalate to Investigator

FINAL VERDICT
- SUSPICIOUS`,
      recommendation: "Verify Customer Identity",
      caseId: "CASE-4899",
      status: "In Review",
      deviceIp: "185.70.185.15",
      deviceHeader: "Python-requests/2.31.0 Scripting CLI",
      analystNotes: "",
      timeline: [
        { time: "1 hr ago", event: "Web endpoint transaction sequence triggered", status: "Flagged" }
      ]
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState<Alert>(alerts[0]);
  
  // Interactive Forensic Risk Analyzer States
  const [threatPreset, setThreatPreset] = useState<"crypto" | "travel" | "micro" | "custom">("crypto");
  const [threatInputMerchant, setThreatInputMerchant] = useState("NEXUS CRYPTO EXCHANGE");
  const [threatInputAmount, setThreatInputAmount] = useState(14900.00);
  const [threatInputCategory, setThreatInputCategory] = useState("Account Drain Attempt");
  const [threatInputLocation, setThreatInputLocation] = useState("Reykjavík, IS (Mullvad Relay)");
  const [threatInputIp, setThreatInputIp] = useState("185.213.154.12");
  const [threatInputHeader, setThreatInputHeader] = useState("Mozilla/5.0 (X11; Linux x86) AppleWebKit/537.36 Chrome/121");
  const [threatInputRiskScore, setThreatInputRiskScore] = useState(96);
  
  const [forensicState, setForensicState] = useState<"IDLE" | "SCANNING" | "COMPLETE" | "ERROR">("IDLE");
  const [forensicPayload, setForensicPayload] = useState<any>(null);
  
  // Interactive Risk Analytics Simulation States
  const [simTransactions, setSimTransactions] = useState(25000);
  const [simAttackRate, setSimAttackRate] = useState(0.85);
  const [simAiAccuracy, setSimAiAccuracy] = useState(94.0);
  const [simAvgTicket, setSimAvgTicket] = useState(180);

  const [isSandboxRunning, setIsSandboxRunning] = useState(false);
  
  const handlePresetChange = (preset: "crypto" | "travel" | "micro" | "custom") => {
    setThreatPreset(preset);
    playSound("click");
    if (preset === "crypto") {
      setThreatInputMerchant("NEXUS CRYPTO EXCHANGE");
      setThreatInputAmount(14900.00);
      setThreatInputCategory("Account Drain Attempt");
      setThreatInputLocation("Reykjavík, IS (Mullvad Relay)");
      setThreatInputIp("185.213.154.12");
      setThreatInputHeader("Mozilla/5.0 (X11; Linux x86) AppleWebKit/537.36 Chrome/121");
      setThreatInputRiskScore(96);
    } else if (preset === "travel") {
      setThreatInputMerchant("PARIS TELECOM PORTAL");
      setThreatInputAmount(49.99);
      setThreatInputCategory("Card Verification Test");
      setThreatInputLocation("Paris, France");
      setThreatInputIp("93.184.216.34");
      setThreatInputHeader("Safari/17.2 iOS (iPhone 15 Pro)");
      setThreatInputRiskScore(68);
    } else if (preset === "micro") {
      setThreatInputMerchant("P2P MICRO-TRANSFER CO");
      setThreatInputAmount(1.45);
      setThreatInputCategory("Micro-Charge Sequence");
      setThreatInputLocation("Moscow, RU (Proxy Node)");
      setThreatInputIp("185.70.185.15");
      setThreatInputHeader("Python-requests/2.31.0 Scripting CLI");
      setThreatInputRiskScore(78);
    }
    setForensicState("IDLE");
  };

  const runSandboxForensics = async () => {
    playSound("click");
    setIsSandboxRunning(true);
    setForensicState("SCANNING");
    addLog("INTELLIGENCE", `Aegis-9 sandbox simulation suite launched. Analyzing route ${threatInputIp}.`);
    
    // Simulate real high-tech terminal output step-by-step
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const mockTx = {
        id: generateSandboxId(),
        customer: generateSandboxCustomer(),
        merchant: threatInputMerchant,
        amount: Number(threatInputAmount),
        timestamp: "Just now",
        category: threatInputCategory,
        location: threatInputLocation,
        riskScore: Number(threatInputRiskScore),
        severity: Number(threatInputRiskScore) > 85 ? "CRITICAL" : Number(threatInputRiskScore) > 40 ? "SUSPICIOUS" : "SAFE",
        anomalies: [
          threatInputCategory,
          "Sandbox Telemetry Override",
          ...(Number(threatInputRiskScore) > 70 ? ["Impossible Velocity Probe", "Proxy Router Mismatch"] : [])
        ],
        deviceIp: threatInputIp,
        deviceHeader: threatInputHeader,
        status: "In Review"
      };
      
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction: mockTx })
      });
      
      const data = await response.json();
      
      setForensicPayload({
        id: mockTx.id,
        verdict: data.verdict || mockTx.severity,
        riskScore: data.riskScore || mockTx.riskScore,
        reasoning: data.reasoning || "Aegis-9 automated mitigation policy matched offline signature.",
        anomalies: data.anomalies && data.anomalies.length > 0 ? data.anomalies : mockTx.anomalies,
        recommendation: data.recommendation || "Initiate immediate security lock and verify customer credentials offline.",
        summary: data.summary || "Aegis-9 localized behavioral verification engine scanned custom endpoint routing."
      });
      
      setForensicState("COMPLETE");
      addLog("INTELLIGENCE", `Sandbox analysis complete. Risk calculated at ${data.riskScore || mockTx.riskScore}%.`);
      playSound("success");
    } catch (_) {
      setForensicState("ERROR");
      addLog("SYSTEM", "Sandbox forensic channel timeout. Fail-safe defense mechanism engaged.");
    } finally {
      setIsSandboxRunning(false);
    }
  };

  const [logs, setLogs] = useState<{ id: string; time: string; category: "SYSTEM" | "ALERTS" | "SECURITY" | "INTELLIGENCE"; text: string }[]>([
    { id: "1", time: "18:02:40", category: "SYSTEM", text: "FraudShield AI core security heuristics initialized." },
    { id: "2", time: "18:03:15", category: "SECURITY", text: "Verified TLS handshake with Federal SAR Regulatory portal." },
    { id: "3", time: "18:04:10", category: "ALERTS", text: "Anomalous capital outflow captured in Reykjavík node [TX-5082]." }
  ]);

  // Audio Synthesizer Engine
  const playSound = (type: "click" | "success" | "warning") => {
    if (!hapticsEnabled || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "success") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.setValueAtTime(1040, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "warning") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      }
    } catch (_) {}
  };

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync scroll on chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const addLog = (category: "SYSTEM" | "ALERTS" | "SECURITY" | "INTELLIGENCE", text: string) => {
    const freshLog = createLogItem(category, text);
    setLogs(prev => [freshLog, ...prev.slice(0, 19)]);
  };

  const handleAddEvidenceFiles = (fileList: FileList | null) => {
    if (!fileList || !selectedAlert) return;
    const newFiles = Array.from(fileList).map(f => f.name);
    if (newFiles.length === 0) return;

    setAlerts(prev =>
      prev.map(a => {
        if (a.id === selectedAlert.id) {
          const existing = a.evidenceFiles || [];
          return {
            ...a,
            evidenceFiles: [...existing, ...newFiles]
          };
        }
        return a;
      })
    );

    setSelectedAlert(prev => {
      if (!prev) return prev;
      const existing = prev.evidenceFiles || [];
      return {
        ...prev,
        evidenceFiles: [...existing, ...newFiles]
      };
    });

    newFiles.forEach(fileName => {
      addLog("SECURITY", `Associated file [${fileName}] securely uploaded & mapped to case ${selectedAlert.id}.`);
    });
    playSound("success");
  };

  // Simulation Injection
  const injectAlert = (type: "travel" | "crypto" | "biometric") => {
    playSound("warning");
    const { randId, randCase } = getNextAlertIds();
    let newItem: Alert;

    let preset: "crypto" | "travel" | "micro" = "crypto";
    let name = "";
    let merchant = "";
    let amount = 0;
    let location = "";
    let ip = "";
    let header = "";
    let category = "";
    let analystNotes = "";

    if (type === "travel") {
      preset = "travel";
      name = "Sarah Jenkins";
      merchant = "TOKYO METRO RAILWAY";
      amount = 88.50;
      location = "Tokyo, JP";
      ip = "203.0.113.67";
      header = "NFC EMV Terminal Class-2 v9";
      category = "Impossible Travel Velocity";
      analystNotes = "Suspicious geolocational velocity leap. Cardholder has no registered travel history.";
      setNotifyQueue("🚨 IMPOSSIBLE TRAVEL VELOCITY IDENTIFIED");
    } else if (type === "crypto") {
      preset = "crypto";
      name = "Marcus Vance";
      merchant = "BINANCE ASSET TRADER";
      amount = 19500.00;
      location = "Unknown Location (Tor Node)";
      ip = "109.201.154.2";
      header = "Tor Browser v13 - Linux x86_64";
      category = "High-value Escrow Liquidation";
      analystNotes = "Urgent account drain suspect. Cryptographic key bypass protocol matches known hacker kit.";
      setNotifyQueue("🚨 EMERGENCY: FRAUDULENT CRYPTO LIQUIDATION");
    } else {
      preset = "micro";
      name = "Elena Rostova";
      merchant = "STRIPE SAAS API GATEWAY";
      amount = 1.00;
      location = "Berlin, DE (NordVPN)";
      ip = "193.56.28.4";
      header = "Python/aiohttp client framework";
      category = "Card Testing Attack";
      analystNotes = "Suspected system harvesting test.";
      setNotifyQueue("⚠️ SUSPECTED CARD TESTING PATTERN");
    }

    newItem = {
      id: randId,
      customer: name,
      merchant,
      amount,
      timestamp: "Just now",
      category,
      location,
      riskScore: 20,
      severity: "SAFE",
      anomalies: [],
      aiSummary: "Multi-agent dynamic sandbox verification in progress...",
      recommendation: "DIAGNOSTIC SCAN COGNITIVE FLOW INITIALIZED",
      caseId: randCase,
      status: "In Review",
      deviceIp: ip,
      deviceHeader: header,
      analystNotes,
      timeline: [
        { time: "Just now", event: "Intake Agent: Ingested & registered case", status: "Complete" }
      ]
    };

    setAlerts(prev => [newItem, ...prev]);
    setSelectedAlert(newItem);
    addLog("ALERTS", `Alert Injected (In Review): ${newItem.category} mapped on ${newItem.id}.`);

    // Reset simulator visual metrics & Open modal
    setSimulatorStep("IDLE");
    setSimulatorLogs([]);
    setPipelineProgress(0);
    setIsAgentSimulatorOpen(true);

    // Run the cognitive orchestrator live with exact overrides and pass this item's ID
    runAgentMaverickPipeline(preset, name, merchant, amount, location, ip, header, randId);

    setTimeout(() => {
      setNotifyQueue(null);
    }, 4000);
  };

  // Resolution controls
  const updateAlertStatus = (id: string, newStatus: "In Review" | "Approved" | "Blocked & Frozen" | "Escalated") => {
    playSound("success");
    setAlerts(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = { ...item, status: newStatus };
          if (selectedAlert.id === id) {
            setSelectedAlert(updated);
          }
          return updated;
        }
        return item;
      })
    );
    addLog("SECURITY", `Mitigation step executed: Case ${id} changed to [${newStatus}] status.`);
  };

  const deleteAlert = (id: string) => {
    if (alerts.length <= 1) {
      playSound("warning");
      setNotifyQueue("⚠️ Cannot delete: At least one security case must remain in the ledger.");
      return;
    }
    playSound("warning");
    setAlerts(prev => {
      const updated = prev.filter(item => item.id !== id);
      if (selectedAlert && selectedAlert.id === id) {
        setSelectedAlert(updated[0]);
      }
      return updated;
    });
    addLog("SECURITY", `Case ${id} has been permanently deleted and purged from live session cache.`);
    setNotifyQueue(`🗑️ Case ${id} has been permanently deleted.`);
  };

  const addNewCase = () => {
    if (!newCaseCustomer.trim() || !newCaseMerchant.trim() || !newCaseAmount) {
      setNotifyQueue("⚠️ Please populate Customer Name, Merchant, and Amount fields.");
      return;
    }

    playSound("success");
    const randId = generateSimulatorTxId();
    const randCase = generateSimulatorCaseId();
    
    const parsedAmount = parseFloat(newCaseAmount) || 0.0;
    const score = Number(newCaseRiskScore) || 50;
    const sevValue = score >= 75 ? "CRITICAL" : score >= 40 ? "SUSPICIOUS" : "SAFE";

    const customNewCase: Alert = {
      id: randId,
      customer: newCaseCustomer,
      merchant: newCaseMerchant,
      amount: parsedAmount,
      location: newCaseLocation || "United States",
      timestamp: "Just now",
      status: "In Review",
      riskScore: score,
      severity: sevValue,
      category: newCaseCategory,
      anomalies: [
        score >= 70 ? "Unusual Outflow Spike" : "Manual Integration Audit Mapped",
      ],
      aiSummary: "Manual audit creation triggered. Select Multi-Agent evaluation pipeline to deep trace telemetry or authorize resolving actions.",
      recommendation: "Manual evaluation pending analyst directives.",
      caseId: randCase,
      deviceIp: newCaseDeviceIp || "192.168.1.100",
      deviceHeader: newCaseDeviceHeader || "Mozilla/5.0",
      analystNotes: "",
      timeline: [
        { time: "Just now", event: "Standard manual case integration recorded", status: "Incomplete" }
      ],
      evidenceFiles: []
    };

    setAlerts(prev => [customNewCase, ...prev]);
    setSelectedAlert(customNewCase);
    setIsCreateCaseOpen(false);

    // Reset fields
    setNewCaseCustomer("");
    setNewCaseMerchant("");
    setNewCaseAmount("");
    setNewCaseCategory("Card Testing");
    setNewCaseLocation("United States");
    setNewCaseRiskScore(65);
    setNewCaseDeviceIp("192.168.1.100");
    setNewCaseDeviceHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0");

    addLog("ALERTS", `Manual Case Created: ${customNewCase.customer} mapped under ID: ${customNewCase.id}.`);
    setNotifyQueue(`✅ Securely provisioned case registry for ${customNewCase.id}!`);
  };

  // Automated Forensic Analysis via Gemini API proxy
  const [isAiRunning, setIsAiRunning] = useState(false);
  const runAiForensics = async () => {
    playSound("click");
    setIsAiRunning(true);
    addLog("INTELLIGENCE", `Initializing Gemini deep-logic query on forensic item. ID: ${selectedAlert.id}`);
    
    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction: selectedAlert })
      });
      const data = await response.json();
      
      const updated = {
        ...selectedAlert,
        riskScore: data.riskScore || selectedAlert.riskScore,
        severity: data.verdict || selectedAlert.severity,
        aiSummary: data.reasoning || selectedAlert.aiSummary,
        recommendation: data.recommendation || selectedAlert.recommendation,
        anomalies: data.anomalies && data.anomalies.length > 0 ? data.anomalies : selectedAlert.anomalies
      };
      
      setAlerts(prev => prev.map(a => (a.id === selectedAlert.id ? updated : a)));
      setSelectedAlert(updated);
      addLog("INTELLIGENCE", "Gemini Deep Reasoning: Automated response matrices populated accurately.");
    } catch (_) {
      addLog("SYSTEM", "Gemini neural link dropped. Activating locally authorized backup reasoning.");
    } finally {
      setIsAiRunning(false);
    }
  };



  const submitCopilotMessage = async (userText: string) => {
    if (chatLoading || !userText.trim()) return;

    playSound("click");
    
    // We construct the new message first and add it to the state
    const userMsg = { role: "user" as const, content: userText, time: new Date().toTimeString().split(" ")[0] };
    
    // Use functional state updates to get the most up-to-date messages history list
    setChatMessages(prev => {
      const updatedMessages = [...prev, userMsg];
      
      // We start fetching from inside the state setter or right outside
      // To run properly with asynchronous fetch, we can use the current state
      return updatedMessages;
    });
    
    setChatLoading(true);

    try {
      // Get the current messages array for the backend API call
      // Wait, we need the accurate message history with the userMsg appended
      const currentFullHistory = [...chatMessages, userMsg];
      
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentFullHistory.map(m => ({ role: m.role, content: m.content })),
          currentThreatLevel: "ELEVATED",
          activeAlertsCount: alerts.filter(a => a.status === "In Review").length
        })
      });
      const data = await response.json();
      
      setChatMessages(prev => [
        ...prev,
        { 
          role: "model", 
          content: data.reply, 
          time: new Date().toTimeString().split(" ")[0],
          suggestions: data.suggestions && data.suggestions.length > 0 ? data.suggestions : [
            "🔍 Investigate suspicious entities",
            "📊 Show risk analysis",
            "🕸 Visualize fraud network",
            "📄 Generate case report",
            "✅ Recommend next actions"
          ]
        }
      ]);
      addLog("INTELLIGENCE", `Aegis-9 strategic compilation active for query: "${userText.substring(0, 30)}..."`);
    } catch (_) {
      setChatMessages(prev => [
        ...prev,
        {
          role: "model",
          content: `I have received your inquiry: "${userText}". Under local backup mode, FraudShield AI advises executing the following next steps:
• Freeze affected user credentials and card routes.
• Send client challenge links across active devices.
• Escalate anomalous patterns to legal counsel.`,
          time: new Date().toTimeString().split(" ")[0],
          suggestions: [
            "🔍 Investigate suspicious entities",
            "📊 Show risk analysis",
            "🕸 Visualize fraud network",
            "📄 Generate case report",
            "✅ Recommend next actions"
          ]
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Copilot dialogue flow
  const sendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const text = chatInput;
    setChatInput("");
    await submitCopilotMessage(text);
  };

  // Interactive Login sequence simulating enterprise-level zero-trust bypass clearance check
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loginState !== "IDLE") return;
    
    playSound("click");
    setLoginState("AUTHENTICATING");
    setLoginLogs([
      "🔋 Initiating zero-trust operator handshake override...",
      `🔑 Dispatching verification logs to centralized Aegis Auth Node [ID: ${loginOperatorId}]`
    ]);

    await new Promise(resolve => setTimeout(resolve, 600));
    setLoginState("DECRYPTING");
    setLoginLogs(prev => [
      ...prev,
      "⚡ Establishing secure TLS 1.3 cryptographic session link...",
      "🔐 Symmetrical payload challenge completed. AES-256 session compiled successfully."
    ]);

    await new Promise(resolve => setTimeout(resolve, 600));
    setLoginState("ESTABLISHING");
    setLoginLogs(prev => [
      ...prev,
      "🛰 Root administrative privileges verified for sector SEC-OPS.",
      "🕸 Seamlessly proxying active FraudShield command rails...",
      "🧠 Syncing secure server-side Aegis-9 live brain nodes..."
    ]);

    await new Promise(resolve => setTimeout(resolve, 600));
    setLoginState("SUCCESS");
    setLoginLogs(prev => [
      ...prev,
      "🚀 Authentication finalized. Command bridge initialized."
    ]);

    await new Promise(resolve => setTimeout(resolve, 300));
    playSound("success");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    playSound("warning");
    setIsLoggedIn(false);
    setLoginState("IDLE");
    setLoginLogs([]);
  };

  // Reset Mock Data
  const resetDatabase = () => {
    playSound("success");
    setAlerts([
      {
        id: "TX-5082",
        customer: "Amara Okoronkwo",
        merchant: "NEXUS CRYPTO EXCHANGE",
        amount: 14900.00,
        timestamp: "3 mins ago",
        category: "Account Drain Attempt",
        location: "Reykjavík, IS (Mullvad Relay)",
        riskScore: 96,
        severity: "CRITICAL",
        anomalies: ["Device Fingerprint Bypass", "High-Velocity Capital Outflow", "Tor Node Routed"],
        aiSummary: `EXECUTIVE SUMMARY
A critical-level alert was compiled for Amara Okoronkwo after detecting a sudden, high-velocity withdrawal sequence of $14,900.00 at NEXUS CRYPTO EXCHANGE via a known virtual proxy routing node. The sequence initiated just seconds after a password and biometric challenge bypass attempt.

CASE DETAILS
- Subject Account: Amara Okoronkwo
- Transaction Entity: NEXUS CRYPTO EXCHANGE
- Monitored Outflow: $14,900.00
- Region: Reykjavík, IS (Mullvad Relay)
- Network Terminal: 185.213.154.12
- Client Interface: Mozilla/5.0 (X11; Linux x86)

KEY RISK INDICATORS
- High-velocity asset liquidation pattern detected.
- Connection established via Mullvad VPN / Tor network node to mask physical location.
- Bypassed security checkpoints and failed credentials logs identified.

EVIDENCE FOUND
- Access log registers a password reset followed immediately by liquid capital transfer request.
- The transaction originates from a network address associated with automated darknet mule routers.

RISK ASSESSMENT
- Confidence Score: 96%
- Calculated Risk Level: Critical Fraud Threat

RECOMMENDED ACTIONS
- Freeze Account
- Terminate Active Sessions
- Escalate to Investigator

FINAL VERDICT
- CRITICAL FRAUD VIOLATION`,
        recommendation: "Freeze Account",
        caseId: "CASE-4902",
        status: "In Review",
        deviceIp: "185.213.154.12",
        deviceHeader: "Mozilla/5.0 (X11; Linux x86) AppleWebKit/537.36 Chrome/121",
        timeline: [
          { time: "3 mins ago", event: "Automated alert generated by Policy Node 14", status: "Critical" },
          { time: "2 mins ago", event: "Biometric override attempt identified", status: "Warning" }
        ],
        analystNotes: "Secured connection flagged on virtual relay host."
      },
      {
        id: "TX-5081",
        customer: "Guillaume Mercier",
        merchant: "PARIS TELECOM PORTAL",
        amount: 49.99,
        timestamp: "12 mins ago",
        category: "Card Verification Test",
        location: "Paris, France",
        riskScore: 68,
        severity: "SUSPICIOUS",
        anomalies: ["Velocity Impossible Travel", "Recurrent Subscription Probing"],
        aiSummary: `EXECUTIVE SUMMARY
A standard card-testing alert was triggered for Guillaume Mercier following a localized physical card verification request of $49.99 in Paris, registered less than 4 minutes after a valid cash ATM withdrawal took place in San Francisco.

CASE DETAILS
- Subject Account: Guillaume Mercier
- Transaction Entity: PARIS TELECOM PORTAL
- Monitored Outflow: $49.99
- Region: Paris, France
- Network Terminal: 93.184.216.34
- Client Interface: Safari/17.2 iOS (iPhone 15 Pro)

KEY RISK INDICATORS
- Impossible travel velocity: Physical swipe in Paris and ATM withdrawal in San Francisco occurred within 4 minutes.
- Transaction amount matches typical low-value merchant testing signals.

EVIDENCE FOUND
- Point of sale terminal verification logged in Paris (04) mismatched the user's active mobile device geolocation data.

RISK ASSESSMENT
- Confidence Score: 72%
- Calculated Risk Level: Suspicious Activity

RECOMMENDED ACTIONS
- Block Transaction
- Verify Customer Identity
- Escalate to Investigator

FINAL VERDICT
- SUSPICIOUS`,
        recommendation: "Verify Customer Identity",
        caseId: "CASE-4901",
        status: "In Review",
        deviceIp: "93.184.216.34",
        deviceHeader: "Safari/17.2 iOS (iPhone 15 Pro)",
        timeline: [{ time: "12 mins ago", event: "Impossible velocity conflict flagged", status: "Warning" }],
        analystNotes: ""
      },
      {
        id: "TX-5080",
        customer: "Eleanor Sterling",
        merchant: "WHOLE FOODS SOMA",
        amount: 114.50,
        timestamp: "45 mins ago",
        category: "Retail POS Purchase",
        location: "San Francisco, USA",
        riskScore: 4,
        severity: "SAFE",
        anomalies: [],
        aiSummary: `EXECUTIVE SUMMARY
A regular retail transaction at Whole Foods SOMA for $114.50 was analyzed and approved automatically.

CASE DETAILS
- Subject Account: Eleanor Sterling
- Transaction Entity: WHOLE FOODS SOMA
- Monitored Outflow: $114.50
- Region: San Francisco, USA
- Network Terminal: 12.43.195.88
- Client Interface: NFC ApplePay Reader #7712

KEY RISK INDICATORS
- None identified. Device parameters and location align with typical customer baseline.

EVIDENCE FOUND
- EMV Cryptogram verified successfully.
- Localized biometric keychain validation validated.

RISK ASSESSMENT
- Confidence Score: 99%
- Calculated Risk Level: Safe / Minimal Risk

RECOMMENDED ACTIONS
- No Action Required

FINAL VERDICT
- APPROVED`,
        recommendation: "No Action Required",
        caseId: "CASE-4900",
        status: "Approved",
        deviceIp: "12.43.195.88",
        deviceHeader: "NFC ApplePay Reader #7712",
        timeline: [],
        analystNotes: ""
      }
    ]);
    setSelectedAlert(alerts[0]);
    addLog("SYSTEM", "Clean demo metrics database re-seeded successfully.");
  };

  // Recharts Data Configuration
  const hourlyVolumeData = [
    { time: "08:00", volume: 940, fraudCases: 1 },
    { time: "10:00", volume: 1420, fraudCases: 3 },
    { time: "12:00", volume: 1810, fraudCases: 0 },
    { time: "14:00", volume: 2200, fraudCases: 4 },
    { time: "16:00", volume: 1650, fraudCases: 12 },
    { time: "18:00", volume: 2190, fraudCases: 5 }
  ];

  const spikeTrends = [
    { name: "Mon", attempts: 5 },
    { name: "Tue", attempts: 18 },
    { name: "Wed", attempts: 8 },
    { name: "Thu", attempts: 31 },
    { name: "Fri", attempts: 15 },
    { name: "Sat", attempts: 42 },
    { name: "Sun", attempts: 19 }
  ];

  const distributionScore = [
    { name: "Critical (90-100)", value: 4, color: "#EF4444" },
    { name: "Suspicious (50-89)", value: 9, color: "#F59E0B" },
    { name: "Safe (0-49)", value: 87, color: "#10B981" }
  ];

  const geoTrends = [
    { region: "North America", cases: 142, rate: "0.02%", severity: "LOW" },
    { region: "Western Europe", cases: 298, rate: "0.22%", severity: "MED" },
    { region: "Eastern Europe", cases: 541, rate: "1.45%", severity: "HIGH" },
    { region: "East Asia", cases: 198, rate: "0.08%", severity: "LOW" }
  ];

  // Logic processing for Cases table (Sorting & Searching)
  const filteredAlerts = alerts.filter(item => {
    const term = searchText.toLowerCase();
    const searchMatch =
      item.id.toLowerCase().includes(term) ||
      item.customer.toLowerCase().includes(term) ||
      item.merchant.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);

    const riskMatch =
      filterRisk === "ALL" ||
      (filterRisk === "CRITICAL" && item.severity === "CRITICAL") ||
      (filterRisk === "SUSPICIOUS" && item.severity === "SUSPICIOUS") ||
      (filterRisk === "SAFE" && item.severity === "SAFE");

    const statusMatch = filterStatus === "ALL" || item.status === filterStatus;

    return searchMatch && riskMatch && statusMatch;
  });

  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    
    if (typeof valA === "string") {
      return sortOrder === "asc" ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
    }
    return sortOrder === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
  });

  // Export to Simulated CSV
  const exportSimulatedCSV = () => {
    playSound("success");
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(alerts, null, 2))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "fraudshield_intelligence_ledger.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addLog("SYSTEM", "Exported cryptographic transactional schema ledger as JSON.");
  };

  // Bulk operation executor
  const runBulkMitigation = (action: "Approved" | "Blocked & Frozen" | "Escalated") => {
    if (bulkList.length === 0) return;
    playSound("success");
    setAlerts(prev =>
      prev.map(item => {
        if (bulkList.includes(item.id)) {
          return { ...item, status: action };
        }
        return item;
      })
    );
    addLog("SECURITY", `Bulk authorization action run on ${bulkList.length} items: status flipped to [${action}]`);
    setBulkList([]);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 font-mono animate-pulse">
            LOADING SECURE PROTOCOL...
          </p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050B18] font-sans text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 z-0"></div>
        
        {/* Soft neon blue glow elements */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-700 z-0"></div>
        
        {/* Login Page Top Header */}
        <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white relative overflow-hidden">
              <ShieldAlert className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-700 opacity-20"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white antialiased text-base">FraudShield AI</span>
                <span className="bg-blue-500/25 border border-blue-500/40 text-blue-400 font-mono text-[9px] uppercase px-1.5 py-0.2 rounded font-black">V4.9 PRO</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider">Aegis-9 Operator Gateway</span>
            </div>
          </div>
          
          <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10.5px] font-mono font-bold tracking-widest text-[#06B6D4] flex items-center gap-2 animate-pulse">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
            SYS STATUS: ONLINE
          </div>
        </header>

        {/* Main layout container */}
        <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 pt-2 pb-10">
          
          {/* Column A: Interactive Command Center Cybersecurity Illustration & Status feed */}
          <div className="hidden lg:flex flex-col flex-1 text-left space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-full text-[10px] font-mono uppercase font-black tracking-widest">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> Cognitive Threat Neutralizer
              </span>
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Zero-Trust Autonomous <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Fraud Defense Bridge
                </span>
              </h1>
              <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                Unlock the unified analytics deck of Aegis-9. Experience full multi-agent automated transaction scanning, live forensic risk correlation telemetry, and cognitive mitigation handshakes directly interfacing with physical merchant servers.
              </p>
            </div>

            {/* Immersive interactive status illustration dashboard */}
            <div className="bg-slate-900/50 hover:bg-slate-900/80 transition-all border border-slate-800 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md max-w-xl shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#06B6D4] rounded-full animate-ping"></span>
                  <span className="font-mono text-xs text-slate-300 font-extrabold uppercase tracking-wide">Live Threat Landscape Telemetry</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[9px] text-[#06B6D4] font-black">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 uppercase">Core Tunnel</span>
                </div>
              </div>

              {/* Graphic nodes representation */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl flex flex-col">
                  <span className="text-slate-400 font-mono text-[9px] uppercase font-bold">Risk Assessment</span>
                  <span className="text-xl font-extrabold tracking-tight text-[#EF4444] mt-1">CRITICAL</span>
                  <span className="text-[9px] text-slate-500 font-mono mt-1 font-bold">1 Active Threat</span>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl flex flex-col">
                  <span className="text-slate-400 font-mono text-[9px] uppercase font-bold">Threat Index</span>
                  <span className="text-xl font-extrabold tracking-tight text-yellow-400 mt-1 font-mono">ELEVATED</span>
                  <span className="text-[9px] text-slate-500 font-mono mt-1 font-bold">Level 4 Node</span>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl flex flex-col">
                  <span className="text-slate-400 font-mono text-[9px] uppercase font-bold">Active Shield</span>
                  <span className="text-xl font-extrabold tracking-tight text-[#06B6D4] mt-1 font-mono">AEGIS-9</span>
                  <span className="text-[9px] text-slate-500 font-mono mt-1 font-bold">All engines active</span>
                </div>
              </div>

              {/* Micro command scan bar */}
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl font-mono text-[11px] leading-relaxed relative overflow-hidden min-h-[96px] text-left">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent animate-pulse"></div>
                <div className="text-slate-400 flex items-center justify-between mb-1.5 border-b border-slate-900 pb-1 font-bold">
                  <span>FORENSIC TELEMETRY STREAM</span>
                  <span className="text-cyan-500 animate-pulse text-[9px]">● MONITORING ACTIVE</span>
                </div>
                <div className="space-y-1 text-slate-500 font-mono text-[9px]">
                  <div>[18:04:12] <span className="text-yellow-400 font-bold">WARN</span> Policy Node 14 flags Mullvad VPN node 185.xx.xx.xx.</div>
                  <div>[18:04:15] <span className="text-cyan-400 font-bold">INFO</span> Instantiating neural correlation query scan...</div>
                  <div>[18:04:22] <span className="text-[#EF4444] font-bold">CRIT</span> Account drain pattern mapped on Nex-Crypto transaction.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Glass Login Card */}
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 backdrop-blur-md bg-slate-900/60 hover:bg-slate-900/75 transition-all border border-slate-850 rounded-3xl p-8 w-full shadow-2xl shadow-blue-950/40"
            >
              <div className="flex justify-center mb-5">
                <span className="bg-blue-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-mono px-3 py-1 rounded-full uppercase font-black tracking-widest shadow-inner">
                  Secure Authentication Gateway
                </span>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-extrabold tracking-tight text-white font-sans">System Authorization</h2>
                <p className="text-xs text-slate-400 font-medium">
                  Unlock central command and active AI forensic channels
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5 mt-6 text-left">
                {/* Operator ID Input field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-400">
                    OPERATOR IDENTITY SIGNATURE
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={loginOperatorId}
                      onChange={(e) => setLoginOperatorId(e.target.value.toUpperCase())}
                      disabled={loginState !== "IDLE"}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-semibold rounded-2xl pl-10 pr-4 py-3 text-white transition outline-none font-mono tracking-wide"
                      placeholder="ENTER OPERATOR ID"
                    />
                  </div>
                </div>

                {/* Password / Passcode Input field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-400">
                    CONSOLE SECURITY CLEARANCE KEY
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      value={loginPasscode}
                      onChange={(e) => setLoginPasscode(e.target.value)}
                      disabled={loginState !== "IDLE"}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-semibold rounded-2xl pl-10 pr-4 py-3 text-white transition outline-none font-mono tracking-wide"
                      placeholder="ENTER CLEARANCE KEY"
                    />
                  </div>
                </div>

                {/* Secure Sign-in Logs Output Area if state changed from IDLE */}
                {loginState !== "IDLE" && (
                  <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-2xl font-mono text-[9px] leading-relaxed text-slate-400 space-y-1">
                    <div className="text-cyan-400 flex items-center justify-between border-b border-slate-900 pb-1 mb-1 font-bold font-mono">
                      <span>SECURE HANDSHAKE TELEMETRY</span>
                      <span>STATUS: {loginState}</span>
                    </div>
                    {loginLogs.map((log, lIdx) => (
                      <div key={lIdx} className="font-mono text-slate-300">
                        {log}
                      </div>
                    ))}
                  </div>
                )}

                {/* Neon Blue Authorize Sign-In Button */}
                <button
                  type="submit"
                  disabled={loginState !== "IDLE"}
                  className="w-full relative py-3.5 px-4 rounded-2xl text-xs font-bold tracking-wider uppercase cursor-pointer select-none transition-all duration-300 flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none border border-blue-500/20 overflow-hidden shadow-lg shadow-blue-600/25 active:scale-95 disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 hover:opacity-10 transition"></div>
                  {loginState === "IDLE" ? (
                    <>
                      <span>Unlock System Command Bridge</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : loginState === "SUCCESS" ? (
                    <>
                      <span>CONSOLE ACCESS GRANTED</span>
                      <Check className="w-4 h-4 text-green-400 animate-bounce" />
                    </>
                  ) : (
                    <>
                      <span>Securing Connection Tunnel...</span>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </main>

        <footer className="relative z-10 w-full text-center py-6 border-t border-slate-900 text-[9px] font-mono text-slate-500 tracking-wider">
          AUTHORIZED CORPORATE OPERATOR ACCESS ONLY • SECURITY COMPLIANCE STANDARDS COMPLIENT • AES-256 SECURED CRYPTO HANDSHAKE
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased flex flex-col selection:bg-blue-200">
      
      {/* 4-second top alert banner */}
      <AnimatePresence>
        {notifyQueue && (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#EF4444] text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 font-semibold border border-red-500/30 text-sm tracking-wide"
          >
            <AlertTriangle className="w-5 h-5 animate-bounce" />
            <span>{notifyQueue}</span>
            <button onClick={() => setNotifyQueue(null)} className="ml-4 hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer sovereign shell chassis container */}
      <div className="w-full mx-auto flex flex-col flex-1 h-screen overflow-hidden">
        
        {/* ================= BRAND TOP BAR HEADER ================= */}
        <header className="bg-[#0B1220] text-white border-b border-white/5 px-6 py-3 flex items-center justify-between shrink-0 h-16 z-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSidebarOpen(!sidebarOpen); playSound("click"); }}
              className="lg:hidden p-1.5 hover:bg-white/5 rounded-xl border border-white/10 text-slate-400 transition cursor-pointer mr-1"
              title="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5 text-slate-300" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white relative overflow-hidden">
              <ShieldAlert className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-700 opacity-20"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white antialiased text-base">FraudShield AI</span>
                <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 font-mono text-[9px] uppercase px-1.5 py-0.2 rounded font-black">V4.9 PRO</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Enterprise Security Command Dashboard</span>
            </div>
          </div>

          {/* Org & Simulation Switcher controls */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Viewport simulation tabs */}
            <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex items-center gap-1 text-xs">
              <span className="text-[10px] text-slate-400 px-2 uppercase font-mono tracking-wider font-bold">Simulator:</span>
              <button
                onClick={() => { playSound("click"); setViewportMode("desktop"); }}
                className={`py-1 px-3 rounded-lg transition font-medium ${viewportMode === "desktop" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"}`}
              >
                💻 Desktop Console
              </button>
              <button
                onClick={() => { playSound("click"); setViewportMode("iphone"); }}
                className={`py-1 px-3 rounded-lg transition font-medium flex items-center gap-1.5 ${viewportMode === "iphone" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"}`}
              >
                <Smartphone className="w-3.5 h-3.5" /> iPhone Simulator
              </button>
              <button
                onClick={() => { playSound("click"); setViewportMode("android"); }}
                className={`py-1 px-3 rounded-lg transition font-medium ${viewportMode === "android" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"}`}
              >
                🤖 Android UI
              </button>
            </div>

            {/* Clearance level toggler */}
            <div className="bg-white/5 border border-white/10 p-1.5 rounded-xl flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-slate-400 text-[9px] font-bold uppercase pl-1">CLEARANCE:</span>
              <select
                value={userRole}
                onChange={(e) => {
                  const role = e.target.value as any;
                  setUserRole(role);
                  playSound("success");
                  addLog("SYSTEM", `Session privilege shifted to ${role}. Core database metrics updated.`);
                }}
                className="bg-[#0B1220] border-0 outline-none text-blue-400 font-black cursor-pointer pr-4"
              >
                <option value="Fraud Analyst">🕵️ Analyst Level</option>
                <option value="Investigator">🔎 Investigator Level</option>
                <option value="Compliance Officer">⚖️ Compliance SAR</option>
                <option value="Executive Viewer">📊 Executive View</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Clock HUD */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 font-mono text-[11px] text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>UTC:</span>
              <span className="font-bold tracking-widest text-[#06B6D4]">{currentTime}</span>
            </div>

            <button
              onClick={() => { setHapticsEnabled(!hapticsEnabled); playSound("click"); }}
              className="p-2 hover:bg-white/5 rounded-xl border border-white/10 text-slate-400 transition"
              title="Toggle Synth Audio chime output"
            >
              {hapticsEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => { setCopilotOpen(!copilotOpen); playSound("click"); }}
              className="lg:hidden p-2 hover:bg-white/5 rounded-xl border border-white/10 text-slate-400 transition"
              title="Toggle Aegis AI Copilot panel"
            >
              <Sparkles className={`w-4 h-4 ${copilotOpen ? "text-blue-400 animate-pulse" : "text-slate-400"}`} />
            </button>

            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${userRole}&backgroundColor=0f172a`}
              alt="User bot icon"
              className="w-8 h-8 rounded-xl border border-white/10 bg-slate-900"
            />

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-slate-900/60 hover:bg-slate-950 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 rounded-xl transition flex items-center gap-1.5 cursor-pointer text-[10px] font-mono font-bold uppercase tracking-wider"
              title="Terminate Secure Session (Log Out)"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DISCONNECT</span>
            </button>
          </div>
        </header>

        {viewportMode === "desktop" ? (
          /* ========================================================
             ================= 💻 DESKTOP WORKSPACE LAYOUT =================
             ======================================================== */
          <div className="flex-1 flex overflow-hidden min-h-0 bg-[#F8FAFC]">
            
            {/* Background overlay for mobile drawer */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* --- LEFT NAVIGATION SIDEBAR PANEL --- */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B1220] text-slate-300 border-r border-white/5 flex flex-col justify-between shrink-0 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ height: "calc(100vh - 4rem)", top: "4rem" }}>
              
              {/* Menu items */}
              <div className="p-4 space-y-6">
                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-black tracking-wider pb-2 px-2.5">
                    Core Dashboard
                  </div>
                  <nav className="space-y-1">
                    {[
                      { id: "Dashboard", label: "Executive Comm Console", icon: Home },
                      { id: "Fraud Alerts", label: "Dynamic Risk Alerts", icon: AlertTriangle, badge: alerts.filter(a => a.status === "In Review").length },
                      { id: "Cases", label: "Investigations & Cases", icon: Briefcase },
                      { id: "Analytics", label: "Risk Analytics Ledger", icon: TrendingUp }
                    ].map(tab => {
                      const Icon = tab.icon;
                      const active = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => { playSound("click"); setActiveTab(tab.id as any); setSidebarOpen(false); setCopilotOpen(false); }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition duration-150 ${active ? "bg-blue-600 text-white shadow-md shadow-blue-600/10" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-500"}`} />
                            <span>{tab.label}</span>
                          </div>
                          {tab.badge !== undefined && tab.badge > 0 && (
                            <span className="bg-red-600/90 text-white text-[9px] font-mono font-black rounded-full px-2 py-0.5">
                              {tab.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-black tracking-wider pb-2 px-2.5">
                    Regulatory Systems
                  </div>
                  <nav className="space-y-1">
                    {[
                      { id: "Risk Intelligence", label: "Intelligence Widgets", icon: Cpu },
                      { id: "Compliance", label: "Regulatory Compliance", icon: FileText },
                      { id: "Settings", label: "Network Settings DB", icon: Settings }
                    ].map(tab => {
                      const Icon = tab.icon;
                      const active = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => { playSound("click"); setActiveTab(tab.id as any); setSidebarOpen(false); setCopilotOpen(false); }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition duration-150 ${active ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-500"}`} />
                            <span>{tab.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Scenario Injections */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="text-[9px] font-mono uppercase text-slate-500 font-bold tracking-widest px-2.5 mb-1 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-amber-400 animate-pulse" /> Inject Simulated Attacks
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 px-1.5">
                    <button
                      onClick={() => injectAlert("crypto")}
                      className="text-left font-mono text-[9.5px] bg-[#2563EB]/15 hover:bg-[#2563EB]/25 text-blue-400 p-2 rounded-lg border border-[#2563EB]/20 transition cursor-pointer flex items-center gap-1.5 font-bold"
                    >
                      <Layers className="w-3.5 h-3.5" /> Crypto Drain Bypass
                    </button>
                    <button
                      onClick={() => injectAlert("travel")}
                      className="text-left font-mono text-[9.5px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 p-2 rounded-lg border border-amber-500/10 transition cursor-pointer flex items-center gap-1.5 font-bold"
                    >
                      <MapPin className="w-3.5 h-3.5" /> High-Velocity Travel
                    </button>
                    <button
                      onClick={() => injectAlert("biometric")}
                      className="text-left font-mono text-[9.5px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 p-2 rounded-lg border border-emerald-500/10 transition cursor-pointer flex items-center gap-1.5 font-bold"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Card Testing probe
                    </button>
                  </div>
                </div>
              </div>

              {/* Secure Node Status Foot */}
              <div className="p-4 border-t border-white/5 space-y-3 font-mono text-[10px]">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center gap-1.5"><Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> CLOUD RELAY</span>
                  <span className="text-emerald-400 font-bold font-mono">SECURE</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                  <div className="text-[8px] text-slate-500 uppercase">Current User Session</div>
                  <div className="font-bold text-white tracking-wide truncate mt-0.5">giofrt7@gmail.com</div>
                  <div className="text-[8px] text-slate-500 uppercase mt-2">Active Database ID</div>
                  <div className="font-bold text-slate-300 font-mono text-[8.5px] truncate">db_20a46bab-9e31-42c4-8d3f</div>
                </div>
              </div>
            </aside>

            {/* --- CORE WORKSPACE CENTER --- */}
            <main className="flex-1 flex flex-col overflow-hidden min-h-0">
              
              {/* Dynamic scrollable canvas */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar bg-[#F8FAFC]">
                
                {/* 1. DASHBOARD VIEW */}
                {activeTab === "Dashboard" && (
                  <div className="space-y-6">
                    
                    {/* TITLE ROW */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                          <Compass className="w-5 h-5 text-blue-600" />
                          Security Operations Executive Console
                        </h1>
                        <p className="text-xs text-slate-500">Live monitoring coordinates covering 4 payment rails and instant consumer authentication loops.</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={resetDatabase}
                          className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Reload System Mock
                        </button>
                        <button
                          onClick={exportSimulatedCSV}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-white" /> Extract DB Ledger
                        </button>
                      </div>
                    </div>

                    {/* SECTION 1: EXECUTIVE KPI CARDS */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {[
                        { title: "Total Audits", value: "$41,085", sub: "Last 24h", trend: "+12.4%", status: "up", icon: CreditCard, color: "text-blue-700 bg-blue-50 border-blue-100" },
                        { title: "Active Risk Outflow", value: `$${alerts.filter(a => a.severity === "CRITICAL" && a.status === "In Review").reduce((sum, a) => sum + a.amount, 0).toLocaleString()}`, sub: "Blocked Attempts", trend: "-4.1%", status: "down", icon: AlertTriangle, color: "text-red-700 bg-red-50 border-red-100" },
                        { title: "In Review Flags", value: alerts.filter(a => a.status === "In Review").length.toString(), sub: "Needs urgent review", trend: "+2 new", status: "up", icon: Activity, color: "text-amber-750 bg-amber-50 border-amber-100" },
                        { title: "Approved Policy", value: alerts.filter(a => a.status === "Approved").length.toString(), sub: "Autonomous pass", trend: "99.8%", status: "up", icon: ShieldCheck, color: "text-emerald-750 bg-emerald-50 border-emerald-100" },
                        { title: "Avg Risk Index", value: Math.round(alerts.reduce((avg, cur) => avg + cur.riskScore, 0) / alerts.length).toString() + "%", sub: "Heuristic threshold", trend: "Safe range", status: "stable", icon: Cpu, color: "text-indigo-750 bg-indigo-50 border-indigo-100" },
                        { title: "Cognitive Accuracy", value: "99.94%", sub: "Gemini-3.5 flash", trend: "+0.02%", status: "up", icon: Sparkles, color: "text-cyan-750 bg-cyan-50 border-cyan-100" }
                      ].map((card, idx) => {
                        const Icon = card.icon;
                        return (
                          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 transition-all duration-300 hover:shadow-premium-md hover:border-slate-300 flex flex-col justify-between select-none shadow-premium-sm min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <span className="text-[10px] sm:text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider truncate" title={card.title}>{card.title}</span>
                              <div className={`p-1.5 rounded-xl border shrink-0 ${card.color}`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="text-lg sm:text-xl xl:text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap truncate tabular-nums leading-none" title={card.value}>{card.value}</div>
                              <div className="flex justify-between items-center mt-2.5 text-[10px] gap-1">
                                <span className="text-slate-500 font-medium truncate" title={card.sub}>{card.sub}</span>
                                <span className={`font-bold uppercase px-1 py-0.2 rounded font-mono shrink-0 ${card.status === "up" ? "text-emerald-700" : card.status === "down" ? "text-red-650" : "text-blue-700"}`}>
                                  {card.trend}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* SECTION 2: CHARTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Interactive volumetrics chart */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                              <Activity className="w-4 h-4 text-blue-600" />
                              Volume Mapping versus Attacks
                            </h3>
                            <span className="text-[9px] font-mono bg-blue-50 text-blue-600 font-bold px-1 rounded-sm border border-blue-100">REALTIME</span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 mb-4 leading-normal">Interactive ledger measuring raw checkout volume vs total anomalies flagged.</p>
                        </div>
                        <div className="w-full min-h-[208px] h-52 mt-2 min-w-0">
                          {isMounted && (
                            <ResponsiveContainer width="100%" height={208} minWidth={0}>
                              <AreaChart data={hourlyVolumeData}>
                                <defs>
                                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="#94A3B8" fontSize={9} tickLine={false} />
                                <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "12px", border: "1px solid #E2E8F0" }} />
                                <Area type="monotone" dataKey="volume" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVol)" name="Vol ($)" />
                                <Area type="monotone" dataKey="fraudCases" stroke="#EF4444" strokeWidth={1.5} fill="none" name="Anomaly Count" />
                              </AreaChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      {/* Spike Bar Chart */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-amber-500" />
                              Weekly Outflow Escalation Spikes
                            </h3>
                            <span className="text-[9px] font-mono bg-amber-50 text-amber-650 font-bold px-1 rounded-sm border border-amber-100">ATTACK VECTORS</span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 mb-4 leading-normal">Raw counting of distributed automated script attacks detected per weekday interval.</p>
                        </div>
                        <div className="w-full min-h-[208px] h-52 mt-2 min-w-0">
                          {isMounted && (
                            <ResponsiveContainer width="100%" height={208} minWidth={0}>
                              <BarChart data={spikeTrends}>
                                <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} />
                                <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "12px", border: "1px solid #E2E8F0" }} />
                                <Bar dataKey="attempts" fill="#F59E0B" radius={[4, 4, 0, 0]}>
                                  {spikeTrends.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 5 ? "#EF4444" : "#F59E0B"} />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      {/* Pie Risk Score Distribution */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                              <Cpu className="w-4 h-4 text-emerald-500" />
                              Systematic Security Risk Distribution
                            </h3>
                            <span className="text-[9px] font-mono bg-emerald-50 text-emerald-650 font-bold px-1 rounded-sm border border-emerald-100">AUDIT PROPORTION</span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 mb-4 leading-normal">Visual mapping of overall telemetry ledger separated by computed threat levels.</p>
                        </div>
                        <div className="h-52 w-full mt-2 flex flex-col md:flex-row items-center justify-around">
                          <div className="w-32 h-32 min-h-[128px] min-w-0">
                            {isMounted && (
                              <ResponsiveContainer width="100%" height={128} minWidth={0}>
                                <PieChart>
                                  <Pie
                                    data={distributionScore}
                                    innerRadius={38}
                                    outerRadius={56}
                                    paddingAngle={3}
                                    dataKey="value"
                                  >
                                    {distributionScore.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip contentStyle={{ fontSize: "10px", borderRadius: "8px" }} />
                                </PieChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                          <div className="space-y-1.5 text-xs text-slate-600 font-medium md:flex-1 md:pl-4">
                            {distributionScore.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                                <span className="text-[10.5px] text-slate-500 font-mono flex-1">{item.name}:</span>
                                <span className="font-extrabold text-slate-800">{item.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* SECTION 6: AI RISK INTELLIGENCE & WIDGET FEED */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                      
                      {/* Predictive trends and emerging vectors */}
                      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            <div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 leading-tight">AI Generated Forensic Insights</h3>
                              <p className="text-[10px] text-slate-400 mt-0.5">Automated detection of new credential syndicates mapped this afternoon.</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-bold">LATEST DECOY ANALYSIS</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-extrabold text-red-600 font-mono tracking-wide">VECTOR-ALPHA: MULTIPLEX ROUTERS</span>
                              <span className="text-[9px] font-mono bg-red-100 text-red-650 font-bold px-1 pb-0.2 rounded">HIGH THREAT</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              Decoys representing <strong>NEXUS CRYPTO PAYMENTS</strong> exhibit programmatic device header spoofing matching the &quot;GlowBug-12&quot; hacking suite. All biometric challenges bypass attempt patterns must be flagged automatically.
                            </p>
                          </div>

                          <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-extrabold text-blue-600 font-mono tracking-wide">VECTOR-BETA: VELOCITY COLLUSION</span>
                              <span className="text-[9px] font-mono bg-blue-100 text-blue-600 font-bold px-1 pb-0.2 rounded">CONTAINED</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              Cross-mule velocity networks detected routing between Paris and Reykjavík nodes. The automated policy core blocked 8 concurrent credential tests totaling over $140k. No capital leakage.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100/60 rounded-xl text-[11px] text-blue-800 leading-relaxed font-semibold flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-blue-600 animate-spin" />
                          <span>AI Recommendation Model: Force immediate multi-factor challenges (SMS / Authenticator app) on any client transaction routing through unidentified hosting provider IPs.</span>
                        </div>
                      </div>

                      {/* Interactive Geo-Heat ledger */}
                      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Global Fraud Heat Indices</h3>
                          <p className="text-[10.5px] text-slate-400 mb-4">Risk telemetry mapping per offshore clearing zones.</p>
                        </div>
                        <div className="space-y-3">
                          {geoTrends.map((node, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-slate-100 rounded-md flex items-center justify-center font-mono text-[9px] text-slate-650 font-bold">
                                  0{i+1}
                                </div>
                                <div>
                                  <div className="text-[11px] font-bold text-slate-800">{node.region}</div>
                                  <div className="text-[9px] text-slate-450 uppercase font-mono">Rate: {node.rate}</div>
                                </div>
                              </div>
                              <div className="text-[10px] font-mono text-right">
                                <div className="font-extrabold text-slate-800">{node.cases} cases</div>
                                <span className={`text-[8.5px] font-black uppercase px-1 py-0.2 rounded font-mono ${node.severity === "HIGH" ? "text-red-500 bg-red-50" : node.severity === "MED" ? "text-amber-500 bg-amber-50" : "text-emerald-500 bg-emerald-50"}`}>
                                  {node.severity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Data feeds synchronized via SWIFT node
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* 2. ALERTS FEED VIEW */}
                {activeTab === "Fraud Alerts" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                          Dynamic Active Alerts Matrix
                        </h1>
                        <p className="text-xs text-slate-500">Real-time transactions needing rapid analyst resolution. Block card, Approve, or Escalate to Investigation.</p>
                      </div>
                      <span className="text-[10.5px] font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-xl font-bold shadow-sm">
                        TOTAL IN REVIEW: {alerts.filter(a => a.status === "In Review").length} ITEMS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Alert Card grid (Left Column) */}
                      <div className="lg:col-span-6 space-y-4">
                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1 header-font">Flagged Items Queue</div>
                        <div className="space-y-3.5">
                          {alerts.map((item) => {
                            const active = selectedAlert.id === item.id;
                            return (
                              <div
                                key={item.id}
                                onClick={() => { playSound("click"); setSelectedAlert(item); }}
                                className={`p-4 rounded-2xl border transition duration-200 cursor-pointer flex flex-col justify-between ${active ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500" : "bg-white border-slate-200 hover:border-slate-350 shadow-sm"}`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-mono font-black text-slate-800">{item.id}</span>
                                      <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded uppercase ${item.severity === "CRITICAL" ? "bg-red-100 text-red-650" : item.severity === "SUSPICIOUS" ? "bg-amber-100 text-amber-650" : "bg-emerald-100 text-emerald-650"}`}>
                                        {item.severity} (Score: {item.riskScore})
                                      </span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-900 mt-1">{item.merchant}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-black text-slate-900">${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                    <span className="text-[9.5px] text-slate-400 block font-medium mt-0.5">{item.timestamp}</span>
                                  </div>
                                </div>

                                <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-normal">
                                  {item.aiSummary}
                                </p>

                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 text-[10px]">
                                  <span className="text-slate-450 font-semibold">{item.category} • {item.location}</span>
                                  <span className={`font-black uppercase font-mono px-2 py-0.5 rounded-full ${item.status === "Approved" ? "bg-emerald-100 text-emerald-600" : item.status === "Blocked & Frozen" ? "bg-red-100 text-red-600" : item.status === "Escalated" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}>
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Detail Pane (Focused alert) */}
                      <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-premium-md self-start space-y-6">
                        
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FOCUSED TELEMETRY VIEW</span>
                            <h2 className="text-md font-black text-slate-800 antialiased mt-0.5 tracking-tight">{selectedAlert.id} : {selectedAlert.merchant}</h2>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-black text-slate-900">${selectedAlert.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">{selectedAlert.location}</span>
                          </div>
                        </div>

                        {/* Mitigation Buttons (Top priority actions) */}
                        <div className="space-y-2.5">
                          <div className="text-[9.5px] uppercase font-black tracking-wider text-slate-400">Resolution Containment Matrix</div>
                          {selectedAlert.status === "In Review" ? (
                            <div className="grid grid-cols-3 gap-2.5">
                              <button
                                onClick={() => updateAlertStatus(selectedAlert.id, "Approved")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" /> Approve Tx
                              </button>
                              <button
                                onClick={() => updateAlertStatus(selectedAlert.id, "Blocked & Frozen")}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                              >
                                <X className="w-3.5 h-3.5" /> Block & Freeze
                              </button>
                              <button
                                onClick={() => updateAlertStatus(selectedAlert.id, "Escalated")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                              >
                                <ArrowRight className="w-3.5 h-3.5" /> Escalate Case
                              </button>
                            </div>
                          ) : (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                <div>
                                  <div className="text-xs font-black text-slate-800">MITIGATION COMPLETED</div>
                                  <div className="text-[9.5px] text-slate-450 mt-0.5">Status logged: <strong>{selectedAlert.status.toUpperCase()}</strong></div>
                                </div>
                              </div>
                              <button
                                onClick={() => updateAlertStatus(selectedAlert.id, "In Review")}
                                className="text-slate-500 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-[10.5px] font-bold transition cursor-pointer"
                              >
                                Re-Open
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Interactive Deep AI scans */}
                        <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Automated AI Forensic Report
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 font-bold">GEMINI 3.5 FLASH</span>
                          </div>
                          
                          <div className="text-[11.5px] text-slate-700 leading-relaxed font-sans whitespace-pre-wrap select-text space-y-2 bg-white/60 p-3.5 rounded-xl border border-slate-200/50">
                            {selectedAlert.aiSummary}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={runAiForensics}
                              disabled={isAiRunning}
                              className="w-full bg-blue-600 hover:bg-blue-750 text-white py-2 px-3 rounded-xl text-xs font-bold transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                            >
                              {isAiRunning ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Gathering Realtime Intelligence...
                                </>
                              ) : (
                                <>
                                  <Cpu className="w-3.5 h-3.5" /> Initialize Deeper Gemini Scan
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Customer Specifications */}
                        <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                          <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                            <span className="text-[9px] font-mono text-slate-400 uppercase block">CARDHOLDER / CLIENT</span>
                            <span className="text-slate-800 font-bold text-xs mt-0.5 block">{selectedAlert.customer}</span>
                          </div>
                          <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                            <span className="text-[9px] font-mono text-slate-400 uppercase block">RECOMMENDED MITIGATION</span>
                            <span className="text-blue-600 font-extrabold text-[10px] tracking-wide mt-0.5 block uppercase">{selectedAlert.recommendation}</span>
                          </div>
                          <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                            <span className="text-[9px] font-mono text-slate-400 uppercase block">NETWORK IP DEVICE</span>
                            <span className="text-slate-850 font-mono text-[10.5px] font-bold mt-0.5 block">{selectedAlert.deviceIp}</span>
                          </div>
                          <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                            <span className="text-[9px] font-mono text-slate-400 uppercase block">BROWSER HEADER</span>
                            <span className="text-slate-800 text-[9.5px] truncate block font-bold mt-0.5" title={selectedAlert.deviceHeader}>
                              {selectedAlert.deviceHeader}
                            </span>
                          </div>
                        </div>

                        {/* Anomalies listed */}
                        <div className="space-y-1.5">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Identified System Violations</div>
                          {selectedAlert.anomalies.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {selectedAlert.anomalies.map((an, i) => (
                                <span key={i} className="bg-red-50 text-red-650 border border-red-100 font-mono text-[9px] px-2 py-0.6 rounded-md font-bold">
                                  ⚠️ {an}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-mono text-[9px] px-2 py-0.5 rounded-md font-bold">
                              ✓ Secure chip telemetry. No anomalies flagged.
                            </span>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* 3. CASE MANAGEMENT & INVESTIGATION WORKSPACE */}
                {activeTab === "Cases" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                          Comprehensive Case Management Ledger
                        </h1>
                        <p className="text-xs text-slate-500">Enterprise data-first audit view. Filter, query, sort, batch resolve security incidents, and compile regulatory findings.</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => { playSound("click"); setIsCreateCaseOpen(true); }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-premium-sm flex items-center gap-1.5 select-none cursor-pointer"
                          id="btn-create-case-trigger"
                        >
                          <Plus className="w-4 h-4 text-emerald-100" />
                          <span>Create New Case</span>
                        </button>
                        <button
                          onClick={() => { playSound("click"); setIsAgentSimulatorOpen(true); }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-premium-sm flex items-center gap-2 select-none cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
                          <span>AI Multi-Agent Pipeline</span>
                        </button>
                      </div>
                    </div>

                    {/* Table Filters bar */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 select-none">
                      
                      <div className="flex flex-full md:flex-auto items-center gap-2 w-full md:w-auto bg-slate-50 border border-slate-150 rounded-xl px-3 py-2">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search Case ID, Customer, Merchant..."
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          className="bg-transparent border-0 outline-none text-xs w-full text-slate-800 placeholder:text-slate-400"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        
                        {/* Risk filter */}
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-150 p-1.5 rounded-xl text-xs">
                          <span className="text-[9.5px] text-slate-400 uppercase font-mono font-bold pl-2">Risk:</span>
                          <select
                            value={filterRisk}
                            onChange={(e: any) => setFilterRisk(e.target.value)}
                            className="bg-transparent text-slate-700 outline-none text-[11.5px] font-bold pr-2 cursor-pointer"
                          >
                            <option value="ALL">All Scores</option>
                            <option value="CRITICAL">🔴 Critical Risk</option>
                            <option value="SUSPICIOUS">🟡 Suspicious</option>
                            <option value="SAFE">🟢 Verified Safe</option>
                          </select>
                        </div>

                        {/* Status filter */}
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-150 p-1.5 rounded-xl text-xs">
                          <span className="text-[9.5px] text-slate-400 uppercase font-mono font-bold pl-2">Status:</span>
                          <select
                            value={filterStatus}
                            onChange={(e: any) => setFilterStatus(e.target.value)}
                            className="bg-transparent text-slate-700 outline-none text-[11.5px] font-bold pr-2 cursor-pointer"
                          >
                            <option value="ALL">All Statuses</option>
                            <option value="In Review">In Review</option>
                            <option value="Approved">Approved</option>
                            <option value="Blocked & Frozen">Blocked & Frozen</option>
                            <option value="Escalated">Escalated</option>
                          </select>
                        </div>

                        {/* Sort filter */}
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-150 p-1.5 rounded-xl text-xs">
                          <span className="text-[9.5px] text-slate-400 uppercase font-mono font-bold pl-2">Sort:</span>
                          <select
                            value={sortBy}
                            onChange={(e: any) => setSortBy(e.target.value)}
                            className="bg-transparent text-slate-700 outline-none text-[11.5px] font-bold cursor-pointer"
                          >
                            <option value="riskScore">By Risk Rating</option>
                            <option value="amount">By Amount</option>
                            <option value="id">By Transaction ID</option>
                          </select>
                          <button
                            onClick={() => { playSound("click"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}
                            className="text-primary hover:text-primary-dark font-black px-1 text-[11.5px] uppercase font-mono cursor-pointer"
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* Bulk Action indicator bar if items are checked */}
                    {bulkList.length > 0 && (
                      <div className="bg-blue-600 text-white rounded-xl px-4 py-3 shadow-md flex justify-between items-center text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="w-4.5 h-4.5 text-white" />
                          <span>Selected {bulkList.length} incidents. Select dynamic bulk mitigation containment:</span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <button
                            onClick={() => runBulkMitigation("Approved")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3.5 rounded-lg transition font-bold"
                          >
                            Bulk Approve
                          </button>
                          <button
                            onClick={() => runBulkMitigation("Blocked & Frozen")}
                            className="bg-[#EF4444] hover:bg-[#D93838] text-white py-1.5 px-3.5 rounded-lg transition font-bold"
                          >
                            Bulk Block
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SECTION 4 & 5: TABLE DETAILS SIDE-BY-SIDE */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Table of cases */}
                      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-premium-sm overflow-hidden select-none">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-50 text-slate-450 uppercase font-mono font-bold border-b border-slate-200">
                                <th className="p-3.5 w-10 text-center">
                                  <input
                                    type="checkbox"
                                    checked={bulkList.length === filteredAlerts.length && filteredAlerts.length > 0}
                                    onChange={(e) => {
                                      playSound("click");
                                      if (e.target.checked) {
                                        setBulkList(filteredAlerts.map(a => a.id));
                                      } else {
                                        setBulkList([]);
                                      }
                                    }}
                                    className="cursor-pointer"
                                  />
                                </th>
                                <th className="p-3.5 whitespace-nowrap">Case/Tx ID</th>
                                <th className="p-3.5 whitespace-nowrap">Customer Name</th>
                                <th className="p-3.5 whitespace-nowrap">Category Class</th>
                                <th className="p-3.5 text-center whitespace-nowrap">Risk Index</th>
                                <th className="p-3.5 whitespace-nowrap">Amount</th>
                                <th className="p-3.5 whitespace-nowrap">Status</th>
                                <th className="p-3.5 text-center whitespace-nowrap text-slate-450 uppercase font-mono font-bold">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedAlerts.length > 0 ? (
                                sortedAlerts.map((item) => {
                                  const selected = selectedAlert.id === item.id;
                                  const isChecked = bulkList.includes(item.id);
                                  return (
                                    <tr
                                      key={item.id}
                                      onClick={() => { playSound("click"); setSelectedAlert(item); }}
                                      className={`border-b border-slate-150 hover:bg-neutral-50 transition-colors cursor-pointer text-slate-700 ${selected ? "bg-blue-50/50 hover:bg-blue-50" : ""}`}
                                    >
                                      <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => {
                                            playSound("click");
                                            if (e.target.checked) {
                                              setBulkList(prev => [...prev, item.id]);
                                            } else {
                                              setBulkList(prev => prev.filter(x => x !== item.id));
                                            }
                                          }}
                                          className="cursor-pointer"
                                        />
                                      </td>
                                      <td className="p-3.5 font-bold text-slate-900 font-mono whitespace-nowrap">{item.id}</td>
                                      <td className="p-3.5 font-semibold text-slate-850 whitespace-nowrap">{item.customer}</td>
                                      <td className="p-3.5 text-slate-500 font-medium whitespace-nowrap">{item.category}</td>
                                      <td className="p-3.5 text-center whitespace-nowrap">
                                        <span className={`font-mono font-black text-[10.5px] px-2 py-0.5 rounded-full ${item.severity === "CRITICAL" ? "bg-red-50 text-red-650" : item.severity === "SUSPICIOUS" ? "bg-amber-50 text-amber-650" : "bg-emerald-50 text-emerald-650"}`}>
                                          {item.riskScore}%
                                        </span>
                                      </td>
                                      <td className="p-3.5 font-extrabold text-slate-900 text-right pr-6 whitespace-nowrap">${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                      <td className="p-3.5 whitespace-nowrap">
                                        <span className={`font-black uppercase tracking-wider text-[9px] font-mono px-2 py-0.5 rounded-full ${item.status === "Approved" ? "bg-emerald-50 text-emerald-600" : item.status === "Blocked & Frozen" ? "bg-red-50 text-red-650" : item.status === "Escalated" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
                                          {item.status}
                                        </span>
                                      </td>
                                      <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                                        <button
                                          onClick={() => deleteAlert(item.id)}
                                          className="text-slate-400 hover:text-red-650 hover:bg-red-50 transition p-1.5 rounded-lg cursor-pointer"
                                          title={`Delete Case ${item.id}`}
                                          id={`delete-row-btn-${item.id}`}
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan={8} className="p-10 text-center text-slate-400 font-mono text-xs">
                                    No transaction audit incidents matched your filter queries.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right: Section 5 Investigation Workspace Timeline & Notes */}
                      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-premium-sm space-y-5">
                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">INVESTIGATION WORKSPACE</span>
                            <span className="text-sm font-black text-slate-900 antialiased mt-0.5 block">Forensically Scan: {selectedAlert.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="bg-slate-100 text-slate-650 text-[10.5px] font-bold font-mono px-2.5 py-0.5 rounded-xl border border-slate-200/60">
                              {selectedAlert.caseId}
                            </span>
                            <button
                              onClick={() => deleteAlert(selectedAlert.id)}
                              className="text-slate-400 hover:text-red-650 hover:bg-red-50 p-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                              title={`Delete Case ${selectedAlert.id}`}
                              id="btn-delete-case-details"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Timeline chronological view */}
                        <div className="space-y-3">
                          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Incident Chronicle Milestones</div>
                          <div className="relative border-l border-slate-150 pl-3.5 ml-2.5 space-y-4">
                            {selectedAlert.timeline && selectedAlert.timeline.map((point, index) => (
                              <div key={index} className="relative select-none">
                                <span className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-white border-2 ${point.status === "Critical" ? "border-red-500 animate-pulse" : "border-slate-300"}`} />
                                <div className="text-[10.5px] font-mono text-slate-400 uppercase">{point.time}</div>
                                <p className="text-xs font-bold text-slate-800 leading-tight mt-0.5">{point.event}</p>
                              </div>
                            ))}
                            <div className="relative leading-none">
                              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-dashed border-blue-400" />
                              <span className="text-[11px] text-blue-500 font-semibold cursor-pointer py-1 block hover:underline" onClick={runAiForensics}>
                                + Generate deep cryptographic trace node...
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Evidence Uploads simulation panel */}
                        <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl space-y-2 select-none">
                          <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            onChange={(e) => handleAddEvidenceFiles(e.target.files)}
                            className="hidden"
                            id="audit-file-upload-input"
                          />
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Associated Legal Evidence</div>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="bg-white border border-slate-200 text-slate-600 font-mono text-[9.5px] px-2.5 py-1 rounded-lg flex items-center gap-1 select-none">
                              <span>📄</span>
                              <span>IP_Address_Logs.log</span>
                            </span>
                            <span className="bg-white border border-slate-200 text-slate-600 font-mono text-[9.5px] px-2.5 py-1 rounded-lg flex items-center gap-1 select-none">
                              <span>📁</span>
                              <span>Fraud_Signatures_SHA256</span>
                            </span>
                            {selectedAlert.evidenceFiles?.map((fname, idx) => (
                              <span key={idx} className="bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[9.5px] px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-premium-sm transition-all animate-in fade-in zoom-in duration-150">
                                <Paperclip className="w-3 h-3 text-blue-500 shrink-0" />
                                <span className="max-w-[125px] truncate" title={fname}>{fname}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playSound("click");
                                    setAlerts(prev =>
                                      prev.map(a => {
                                        if (a.id === selectedAlert.id) {
                                          return {
                                            ...a,
                                            evidenceFiles: (a.evidenceFiles || []).filter((_, fidx) => fidx !== idx)
                                          };
                                        }
                                        return a;
                                      })
                                    );
                                    setSelectedAlert(prev => {
                                      if (!prev) return prev;
                                      return {
                                        ...prev,
                                        evidenceFiles: (prev.evidenceFiles || []).filter((_, fidx) => fidx !== idx)
                                      };
                                    });
                                    addLog("SECURITY", `Removed associated evidence file [${fname}] from case ${selectedAlert.id}.`);
                                  }}
                                  className="text-blue-400 hover:text-blue-700 font-bold ml-1 text-xs leading-none shrink-0 cursor-pointer animate-pulse"
                                  title="Remove attachment"
                                  id={`remove-evidence-btn-${idx}`}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDragging(false);
                              handleAddEvidenceFiles(e.dataTransfer.files);
                            }}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border border-dashed p-3.5 rounded-lg text-center text-[10.5px] transition cursor-pointer font-semibold mt-1 uppercase tracking-wider flex items-center justify-center gap-1.5 min-h-[44px] select-none ${
                              isDragging
                                ? "bg-blue-50 border-blue-500 text-blue-600 font-bold scale-[1.01] shadow-sm animate-pulse"
                                : "border-slate-300 text-slate-500 hover:bg-white hover:border-slate-400 hover:text-slate-700"
                            }`}
                            id="audit-file-drop-zone"
                          >
                            <Upload className={`w-3.5 h-3.5 ${isDragging ? "text-blue-500 animate-bounce" : "text-slate-400"}`} />
                            <span>
                              {isDragging ? "Drop files to attach" : "Drag & drop file or click to bind incident artifacts"}
                            </span>
                          </div>
                        </div>

                        {/* Analyst dynamic notes saving */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Internal Analyst Directives Log</label>
                          <textarea
                            rows={3}
                            placeholder="Add forensic notes representing suspect activity, SWIFT confirmations, customer feedback..."
                            value={selectedAlert.analystNotes || ""}
                            onChange={(e) => {
                              const note = e.target.value;
                              setAlerts(prev =>
                                prev.map(a => (a.id === selectedAlert.id ? { ...a, analystNotes: note } : a))
                              );
                              setSelectedAlert(prev => ({ ...prev, analystNotes: note }));
                            }}
                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs outline-none text-slate-800 focus:bg-white focus:border-blue-500 text-black shadow-inner"
                          />
                          <p className="text-[9px] text-slate-450 font-medium italic mt-1 leading-normal">
                            Directives typed are automatically cryptographically bound to key files in PostgreSQL database.
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* 3.1. DYNAMIC RISK ANALYTICS LEDGER */}
                {activeTab === "Analytics" && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-indigo-600 animate-pulse" />
                          Risk Analytics & Security Ledger
                        </h1>
                        <p className="text-xs text-slate-500">
                          Comprehensive analysis of prevented capital leakage, AI detection reliability ratios, and live threat-mitigation metrics.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[10.5px] bg-white border border-slate-205 px-3 py-1.5 rounded-xl shadow-sm text-slate-655">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        <span>PREVENTATIVE MODE: ACTIVE</span>
                      </div>
                    </div>

                    {/* KPI Indices */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-premium-sm flex flex-col justify-between min-w-0">
                        <div className="text-[10px] sm:text-[11px] uppercase font-mono text-slate-500 font-semibold tracking-wider truncate" title="Prevented Loss Capital">Prevented Loss Capital</div>
                        <div className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-slate-900 mt-2 whitespace-nowrap tabular-nums leading-none">$485,250.00</div>
                        <div className="text-[10px] sm:text-[10.5px] text-emerald-700 font-bold mt-2.5 leading-tight tracking-tight flex items-center gap-1 select-none">
                          <span className="shrink-0 text-emerald-600 font-sans">✓</span>
                          <span className="truncate" title="100% of detected attacks neutralized">100% of detected attacks neutralized</span>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-premium-sm flex flex-col justify-between min-w-0">
                        <div className="text-[10px] sm:text-[11px] uppercase font-mono text-slate-500 font-semibold tracking-wider truncate" title="Mitigation Velocity">Mitigation Velocity</div>
                        <div className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-slate-900 mt-2 whitespace-nowrap tabular-nums leading-none">1.8 Seconds</div>
                        <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium mt-2.5 leading-tight tracking-tight truncate" title="From detection to active token hold">From detection to active token hold</div>
                      </div>
                      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-premium-sm flex flex-col justify-between min-w-0">
                        <div className="text-[10px] sm:text-[11px] uppercase font-mono text-slate-500 font-semibold tracking-wider truncate" title="MFA Challenge Bypass Rate">MFA Challenge Bypass Rate</div>
                        <div className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-emerald-700 mt-2 whitespace-nowrap tabular-nums leading-none">0.00%</div>
                        <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium mt-2.5 leading-tight tracking-tight truncate" title="No successful proxy bypasses reported">No successful proxy bypasses reported</div>
                      </div>
                      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-premium-sm flex flex-col justify-between min-w-0">
                        <div className="text-[10px] sm:text-[11px] uppercase font-mono text-slate-500 font-semibold tracking-wider truncate" title="Active Shield Confidence">Active Shield Confidence</div>
                        <div className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-blue-700 mt-2 whitespace-nowrap tabular-nums leading-none">99.94%</div>
                        <div className="text-[10px] sm:text-[10.5px] text-blue-700 font-bold mt-2.5 leading-tight tracking-tight truncate" title="Secured via Aegis-9 Core">Secured via Aegis-9 Core</div>
                      </div>
                    </div>

                    {/* Visual Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm">
                        <div className="border-b border-slate-50 pb-3 mb-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">24-Hour Threat Blocked Volume ($)</h3>
                          <p className="text-[10px] text-slate-400">Comparing total incoming fraudulent value vs capital successfully blocked.</p>
                        </div>
                        <div className="w-full min-h-[256px] h-64 font-mono text-xs min-w-0">
                          {isMounted && (
                            <ResponsiveContainer width="100%" height={256} minWidth={0}>
                              <AreaChart
                                data={[
                                  { hour: "02:00", Outflow: 12000, Blocked: 12000 },
                                  { hour: "06:00", Outflow: 38000, Blocked: 38000 },
                                  { hour: "10:00", Outflow: 145000, Blocked: 145000 },
                                  { hour: "14:00", Outflow: 114000, Blocked: 114000 },
                                  { hour: "18:00", Outflow: 124000, Blocked: 124000 },
                                  { hour: "22:00", Outflow: 52250, Blocked: 52250 }
                                ]}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                              >
                                <defs>
                                  <linearGradient id="colorO" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                                  </linearGradient>
                                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <XAxis dataKey="hour" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip />
                                <Area type="monotone" dataKey="Outflow" name="Unsecured Threats" stroke="#EF4444" fillOpacity={1} fill="url(#colorO)" strokeWidth={1.5} />
                                <Area type="monotone" dataKey="Blocked" name="Blocked Capital" stroke="#10B981" fillOpacity={1} fill="url(#colorB)" strokeWidth={2} />
                              </AreaChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm">
                        <div className="border-b border-slate-50 pb-3 mb-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Target Volume Distribution by Merchant</h3>
                          <p className="text-[10px] text-slate-400">Total detected fraudulent attempts mapped across key commercial tunnels.</p>
                        </div>
                        <div className="w-full min-h-[256px] h-64 font-mono text-xs min-w-0">
                          {isMounted && (
                            <ResponsiveContainer width="100%" height={256} minWidth={0}>
                              <BarChart
                                data={[
                                  { name: "NEXUS CRYPTO", value: 245000 },
                                  { name: "PARIS TELECOM", value: 124000 },
                                  { name: "P2P TRANSFER", value: 62000 },
                                  { name: "COIN VALVES", value: 54250 }
                                ]}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                              >
                                <XAxis dataKey="name" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip />
                                <Bar dataKey="value" name="Exposure ($)" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                                  <Cell fill="#F43F5E" />
                                  <Cell fill="#F59E0B" />
                                  <Cell fill="#3B82F6" />
                                  <Cell fill="#10B981" />
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Live Forecast Playground */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-premium-sm space-y-4">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-850 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-indigo-500 animate-pulse" />
                          Aegis-9 Threat Forecast Calculator & Interactive Sandbox
                        </h3>
                        <p className="text-[10.5px] text-slate-450 mt-1">
                          Test custom volume scaling rules and AI capture thresholds to project compliance recovery metrics and prevent potential system outflow leakage.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        {/* Interactive sliders */}
                        <div className="space-y-4 bg-slate-50 border border-slate-150 p-4 rounded-xl">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                              <span>Daily Transaction Flow:</span>
                              <span className="font-mono text-indigo-600">{simTransactions.toLocaleString()} TXs</span>
                            </div>
                            <input
                              type="range"
                              min="5000"
                              max="100000"
                              step="5000"
                              value={simTransactions}
                              onChange={(e) => setSimTransactions(Number(e.target.value))}
                              className="w-full accent-indigo-600"
                            />
                            <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                              <span>5K</span>
                              <span>100K</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                              <span>Attack Intromission Rate:</span>
                              <span className="font-mono text-red-650">{simAttackRate.toFixed(2)}%</span>
                            </div>
                            <input
                              type="range"
                              min="0.1"
                              max="5.0"
                              step="0.05"
                              value={simAttackRate}
                              onChange={(e) => setSimAttackRate(Number(e.target.value))}
                              className="w-full accent-indigo-600"
                            />
                            <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                              <span>0.1%</span>
                              <span>5.0%</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                              <span>AI Capture Precision (MFA):</span>
                              <span className="font-mono text-emerald-600">{simAiAccuracy.toFixed(1)}%</span>
                            </div>
                            <input
                              type="range"
                              min="60"
                              max="100"
                              step="0.5"
                              value={simAiAccuracy}
                              onChange={(e) => setSimAiAccuracy(Number(e.target.value))}
                              className="w-full accent-indigo-600"
                            />
                            <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                              <span>60%</span>
                              <span>100% (Elite)</span>
                            </div>
                          </div>
                        </div>

                        {/* Projection Indicators */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-slate-900 border border-slate-950 p-4 rounded-xl flex flex-col justify-between">
                            <div>
                              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">PROJECTED ATTEMPTS / DAY</span>
                              <span className="text-2xl font-black text-rose-500 font-mono mt-1 block">
                                {Math.round((simTransactions * simAttackRate) / 100)} INCIDENTS
                              </span>
                              <p className="text-[10px] text-slate-450 mt-1.5 leading-normal">
                                Based on current behavioral profiles network-wide at {simAttackRate}% attack factor.
                              </p>
                            </div>
                            <div className="text-[9px] font-mono text-slate-500 uppercase mt-4">
                              VALUED AT ~${(Math.round((simTransactions * simAttackRate) / 100) * simAvgTicket).toLocaleString()} OUTFLOW EXPOSURE
                            </div>
                          </div>

                          <div className="bg-emerald-950/25 border border-emerald-900/30 p-4 rounded-xl flex flex-col justify-between">
                            <div>
                              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">PREVENTED VALUE RATIO</span>
                              <span className="text-2xl font-black text-emerald-450 font-mono mt-1 block">
                                ${Math.round(((simTransactions * simAttackRate) / 100) * simAvgTicket * (simAiAccuracy / 100)).toLocaleString()}
                              </span>
                              <p className="text-[10px] text-emerald-600 font-semibold mt-1.5 leading-normal">
                                Recovered liquidity retained within active consumer lines by shielding user channels.
                              </p>
                            </div>
                            
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-[9px] font-mono text-slate-405 font-bold uppercase">Aegis Assessment:</span>
                              {((simTransactions * simAttackRate) / 100) * simAvgTicket * (1 - simAiAccuracy / 100) > 15000 ? (
                                <span className="bg-red-950/50 border border-red-900/65 text-red-400 font-mono text-[8.5px] px-2 py-0.5 rounded uppercase font-black tracking-wide">
                                  ⚠️ HIGH DRIP LOSS
                                </span>
                              ) : (
                                <span className="bg-emerald-950/70 border border-emerald-910 text-emerald-400 font-mono text-[8.5px] px-2 py-0.5 rounded uppercase font-black tracking-wide">
                                  ✓ SECURE SHIELD
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3.2. DYNAMIC RISK INTELLIGENCE & FORENSIC ANALYSER (RISK ANALYSER) */}
                {activeTab === "Risk Intelligence" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-blue-600" />
                          Aegis-9 AI Forensic & Risk Sandbox
                        </h1>
                        <p className="text-xs text-slate-500">
                          Configure transactional attributes and run the high-precision Gemini reasoning model to diagnose fraud vectors and linked entity risks.
                        </p>
                      </div>
                      <span className="text-[10.5px] font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-bold shadow-sm">
                        SECURE TERMINAL: ONLINE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Input Payload details */}
                      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Aegis-9 Threat Preset Vectors</h3>
                          <p className="text-[10.5px] text-slate-400">Select a known automated system trigger or fill out a custom mock route below.</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => handlePresetChange("crypto")}
                            className={`px-2 py-2.5 rounded-lg border font-mono text-[9px] font-extrabold transition text-center flex flex-col justify-between h-20 leading-tight ${threatPreset === "crypto" ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100/50"}`}
                          >
                            <span>01 / DRAIN</span>
                            <span className="text-[8px] opacity-75">NEXUS WALLET</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePresetChange("travel")}
                            className={`px-2 py-2.5 rounded-lg border font-mono text-[9px] font-extrabold transition text-center flex flex-col justify-between h-20 leading-tight ${threatPreset === "travel" ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100/50"}`}
                          >
                            <span>02 / SPEED</span>
                            <span className="text-[8px] opacity-75">VELOCITY MISMATCH</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePresetChange("micro")}
                            className={`px-2 py-2.5 rounded-lg border font-mono text-[9px] font-extrabold transition text-center flex flex-col justify-between h-20 leading-tight ${threatPreset === "micro" ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100/50"}`}
                          >
                            <span>03 / PROBE</span>
                            <span className="text-[8px] opacity-75">MICRO TRANSFERS</span>
                          </button>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-3 pt-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Target Account Terminal / Merchant</label>
                            <input
                              type="text"
                              value={threatInputMerchant}
                              onChange={(e) => { setThreatInputMerchant(e.target.value); setThreatPreset("custom"); }}
                              className="w-full bg-slate-50 border border-slate-220 text-xs px-3 py-2 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Transfer Amount ($)</label>
                              <input
                                type="number"
                                value={threatInputAmount}
                                onChange={(e) => { setThreatInputAmount(Number(e.target.value)); setThreatPreset("custom"); }}
                                className="w-full bg-slate-50 border border-slate-220 text-xs px-3 py-2 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Anomalous Risk Index</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={threatInputRiskScore}
                                onChange={(e) => { setThreatInputRiskScore(Number(e.target.value)); setThreatPreset("custom"); }}
                                className="w-full bg-slate-50 border border-slate-220 text-xs px-3 py-2 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Risk Category Flag</label>
                            <input
                              type="text"
                              value={threatInputCategory}
                              onChange={(e) => { setThreatInputCategory(e.target.value); setThreatPreset("custom"); }}
                              className="w-full bg-slate-50 border border-slate-220 text-xs px-3 py-2 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Reported Geolocation / IP Router Node</label>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={threatInputLocation}
                                onChange={(e) => { setThreatInputLocation(e.target.value); setThreatPreset("custom"); }}
                                className="w-full bg-slate-50 border border-slate-220 text-xs px-3 py-2 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 outline-none"
                                title="Location"
                              />
                              <input
                                type="text"
                                value={threatInputIp}
                                onChange={(e) => { setThreatInputIp(e.target.value); setThreatPreset("custom"); }}
                                className="w-full bg-slate-50 border border-slate-220 text-xs px-3 py-2 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 outline-none"
                                title="Device IP"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Device Fingerprint Headers</label>
                            <input
                              type="text"
                              value={threatInputHeader}
                              onChange={(e) => { setThreatInputHeader(e.target.value); setThreatPreset("custom"); }}
                              className="w-full bg-slate-50 border border-slate-220 text-xs px-3 py-2 rounded-xl text-slate-850 focus:bg-white focus:border-blue-500 outline-none"
                            />
                          </div>

                          <button
                            type="button"
                            disabled={isSandboxRunning}
                            onClick={runSandboxForensics}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] uppercase tracking-widest py-3 rounded-xl transition duration-150 shadow-md shadow-red-600/10 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                          >
                            <Cpu className={`w-4 h-4 ${isSandboxRunning ? "animate-spin" : ""}`} />
                            {isSandboxRunning ? "Interrogating Network Nodes..." : "EXECUTE FORENSIC RISK SWEEP"}
                          </button>
                        </div>
                      </div>

                      {/* Right: Heuristic Sweeper Output Terminal */}
                      <div className="lg:col-span-7 flex flex-col min-h-[500px]">
                        
                        {/* Terminal Panel */}
                        <div className="flex-1 bg-slate-900 border border-slate-950 rounded-2xl p-5 shadow-premium-lg text-slate-300 flex flex-col justify-between font-mono">
                          
                          {forensicState === "IDLE" && (
                            <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4">
                              <div className="w-12 h-12 rounded-full border-2 border-dashed border-red-500/40 flex items-center justify-center animate-spin">
                                <Activity className="w-5 h-5 text-red-400" />
                              </div>
                              <div>
                                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Awaiting Forensic Command Module</h4>
                                <p className="text-[10.5px] text-slate-500 max-w-sm mt-1 mx-auto leading-relaxed">
                                  Threat simulation vectors are configured and awaiting payload trigger signals. Run custom AI sweeps to populate real-time intelligence tables.
                                </p>
                              </div>

                              {/* Blueprint layout */}
                              <div className="w-full bg-slate-950/40 border border-slate-800/60 p-4 rounded-xl text-left space-y-2 mt-4 max-w-md">
                                <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-800/80 pb-1.5 flex justify-between">
                                  <span>SANDBOX BLUEPRINT PREVIEW:</span>
                                  <span className="text-blue-400">READY</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] leading-relaxed text-slate-400">
                                  <div><span className="text-slate-600">Merchant:</span> {threatInputMerchant}</div>
                                  <div><span className="text-slate-600">Amount:</span> ${threatInputAmount.toLocaleString()}</div>
                                  <div><span className="text-slate-600">Route Origin:</span> {threatInputLocation}</div>
                                  <div><span className="text-slate-600">Active IP:</span> {threatInputIp}</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {forensicState === "SCANNING" && (
                            <div className="flex-1 flex flex-col justify-center items-center py-10 space-y-5 text-center">
                              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                              <div className="space-y-1.5">
                                <h4 className="text-white text-xs font-semibold uppercase tracking-widest text-cyan-450">Active Neural Interrogation...</h4>
                                <p className="text-[10px] text-slate-500 animate-pulse">Running advanced Gemini containment sequence & cryptographic auditing</p>
                              </div>
                              <div className="w-72 bg-slate-950/60 border border-slate-820 p-3 rounded-lg text-left text-[9.5px] text-slate-400 space-y-1 leading-normal select-none">
                                <div className="text-cyan-500 font-bold">&#10095; Interposed proxy routing analysis loaded...</div>
                                <div className="text-slate-500">&#10095; Quarantining client fingerprint logs [AES-256]...</div>
                                <div className="text-slate-500">&#10095; Handshaking cloud security registries...</div>
                                <div className="text-red-400 font-bold animate-pulse">&#10095; Resolving ultimate Gemini intelligence dossier...</div>
                              </div>
                            </div>
                          )}

                          {forensicState === "COMPLETE" && forensicPayload && (
                            <div className="flex-1 flex flex-col justify-between space-y-5">
                              {/* Dossier Header */}
                              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                                  <div>
                                    <h3 className="text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                      FORENSIC DOSSIER: {forensicPayload.id}
                                    </h3>
                                    <span className="text-[9px] text-slate-500">AEGIS INTEL SWEEP COMPLETE SUCCESSFULLY</span>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-[11.5px] font-black font-mono text-red-500">
                                    RISK RATIO: {forensicPayload.riskScore}%
                                  </div>
                                  <span className="bg-red-950/60 text-red-400 text-[8.5px] px-1.5 py-0.2 rounded border border-red-900 font-extrabold uppercase uppercase">
                                    {forensicPayload.verdict}
                                  </span>
                                </div>
                              </div>

                              {/* Forensic Summary */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl space-y-2">
                                  <span className="text-[9.5px] text-blue-450 uppercase block font-black font-semibold">Heuristic Signal Summary</span>
                                  <p className="text-[11px] text-slate-300 leading-relaxed font-bold">
                                    {forensicPayload.summary}
                                  </p>
                                </div>

                                <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl space-y-2">
                                  <span className="text-[9.5px] text-red-450 uppercase block font-black font-semibold">Mitigation Guidelines</span>
                                  <p className="text-[11.5px] text-slate-350 leading-relaxed font-semibold">
                                    {forensicPayload.recommendation}
                                  </p>
                                </div>
                              </div>

                              {/* Full analysis block */}
                              <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-800 space-y-1.5">
                                <span className="text-[9.5px] text-cyan-400 uppercase tracking-widest block font-bold">Gemini Clinical Deep Reasoning</span>
                                <p className="text-[11px] text-slate-300 tracking-wide leading-relaxed font-semibold">
                                  {forensicPayload.reasoning}
                                </p>
                              </div>

                              {/* Action mitigation checklist */}
                              <div className="bg-slate-950/30 p-3 rounded-lg border border-slate-850/50 space-y-1">
                                <span className="text-[9px] font-bold text-slate-600 block uppercase">Sandbox Countermeasures Available:</span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => { playSound("success"); addLog("SECURITY", `Revoked login session tokens linked to node IP ${threatInputIp}`); }}
                                    className="bg-slate-800 hover:bg-slate-750 text-slate-300 text-[8.5px] px-2.5 py-1.5 rounded transition font-bold"
                                  >
                                    REVOKE TOKENS
                                  </button>
                                  <button
                                    onClick={() => { playSound("success"); addLog("SECURITY", `Suppressed payment lines for merchant ${threatInputMerchant}`); }}
                                    className="bg-slate-800 hover:bg-slate-750 text-slate-300 text-[8.5px] px-2.5 py-1.5 rounded transition font-bold"
                                  >
                                    FREEZE CAPITALS
                                  </button>
                                </div>
                              </div>

                            </div>
                          )}

                          {/* Footer status block */}
                          <div className="pt-3 border-t border-slate-800/80 flex justify-between text-[9px] text-slate-500 mt-4 select-none">
                            <span>AUTONOMIC ENVELOPE SHIELD V3.9</span>
                            <span>FAIL-SAFE SECURITY ENABLED</span>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                )}
                {activeTab === "Compliance" && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        FinTech Regulatory Compliance Dashboard
                      </h1>
                      <p className="text-xs text-slate-500">Generate automated Suspicious Activity Report (SAR) filings, examine Bank Secrecy Act metrics, and review active audit procedures.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Suspicious Activity Report compiler */}
                      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-violet-500 animate-bounce" />
                            AI-Powered Regulatory SAR Document Compiler
                          </h3>
                          <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 rounded-sm border border-indigo-100 uppercase">Automated Form FinCEN-104</span>
                        </div>

                        <p className="text-[11.5px] text-slate-505 leading-relaxed">
                          Selected forensic transaction on <strong>{selectedAlert.id}</strong> amounting to <strong>${selectedAlert.amount}</strong> is mapped directly to our machine-generated regulatory draft:
                        </p>

                        <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl font-mono text-[10.5px] leading-relaxed text-slate-700 whitespace-pre-wrap max-h-60 overflow-y-auto custom-scrollbar">
{`SUSPICIOUS ACTIVITY REPORT (SAR)
DOCUMENT REF: FINTAC-2026-NEXUS
ORGANIZATION: APEX GLOBAL BANK CORP
CLEARANCE LEVEL: UNRESTRICTED ANALYST

SUBJECT CREDENTIALS:
-------------------
NAME: ${selectedAlert.customer}
LOCATION MAPPED: ${selectedAlert.location}
ACTIVE DEVICE IP: ${selectedAlert.deviceIp}
FORENSIC SUMMARY: ${selectedAlert.category} (${selectedAlert.id})

AI COGNITIVE DETECT EVIDENCE SUMMARY:
-------------------------------------
Forensic scanners detected instant geolocational velocity shifts and suspicious VPN routing nodes.
Outflow value totaling $${selectedAlert.amount.toLocaleString()} is verified matching standard malware patterns.
Anomalous identifiers include: [${selectedAlert.anomalies.join(", ") || "No anomalies"}].

COMPLIANCE VERDICT RECOMMENDATION:
----------------------------------
${selectedAlert.recommendation}`}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => { playSound("success"); setNotifyQueue("SAR Draft compiled successfully. Safe backup ledger recorded on Cloud SQL database."); }}
                            className="bg-indigo-600 hover:bg-indigo-750 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" /> Deploy SAR Filing to FinCEN
                          </button>
                        </div>
                      </div>

                      {/* AML Checklist panel */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">AML Compliance Check List</h3>
                          <p className="text-[10.5px] text-slate-400 mb-4 leading-normal">Interactive regulatory standard tasks required under FinCEN and European Banking Authority oversight protocols.</p>
                          <div className="space-y-3.5">
                            {[
                              { label: "KYC biometric verification verified", status: true },
                              { label: "IP address and relay hosting lookup checked", status: true },
                              { label: "Source of funding capital validated", status: false },
                              { label: "Analyst signed cryptographic audit keys", status: selectedAlert.status !== "In Review" },
                              { label: "Escalated high-threat items to federal cell", status: selectedAlert.status === "Escalated" }
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-[11.5px] text-slate-655 font-semibold">
                                <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border text-[9px] ${item.status ? "bg-emerald-50 text-emerald-600 border-emerald-250" : "bg-slate-50 text-slate-350 border-slate-200"}`}>
                                  {item.status ? "✓" : "◦"}
                                </span>
                                <span className={item.status ? "text-slate-450 line-through font-medium" : "text-slate-700"}>{item.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 text-[10.5px] text-slate-450 text-center font-mono">
                          Compliance score: <strong>80% Compliant</strong>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 5. DATABASE SCHEMAS & INTEGRATIONS */}
                {activeTab === "Settings" && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        Relational Database Schemas & Active API Webhooks
                      </h1>
                      <p className="text-xs text-slate-500">Live development metrics routing of our persistent PostgreSQL tables and live webhook triggers.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none font-mono">
                      
                      {/* PostgreSQL Schema Model ERD code */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-rose-50/60 text-[11.5px] font-bold">
                          <span className="text-slate-705 uppercase">PostgreSQL Drizzle schema.ts</span>
                          <span className="text-red-500 bg-red-50 px-1 py-0.2 rounded text-[10px]">Cloud SQL Link</span>
                        </div>
                        <pre className="p-3 bg-slate-900 text-cyan-300 rounded-xl text-[10.5px] leading-relaxed overflow-x-auto min-h-60 custom-scrollbar">
{`import { pgTable, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const securityTraceAlerts = pgTable("security_trace_alerts", {
  id: text("id").primaryKey(), // e.g. TX-5082
  customer: text("customer").notNull(),
  merchant: text("merchant").notNull(),
  amount: integer("amount").notNull(),
  timestamp: text("timestamp").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  riskScore: integer("risk_score").notNull(),
  severity: text("severity").notNull(), // CRITICAL, SUSPICIOUS
  status: text("status").notNull(), // In Review, Blocked, Approved
  deviceIp: text("device_ip").notNull(),
  deviceHeader: text("device_header").notNull(),
  analystNotes: text("analyst_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});`}
                        </pre>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider text-center pt-1">
                          Prisma Migration synchronized successfully via Cloud Run
                        </div>
                      </div>

                      {/* Active webhook listeners */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium-sm flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center pb-2 border-b border-indigo-50/60 text-[11.5px] font-bold">
                            <span className="text-slate-705 uppercase">UiPath Maestro Queue Webhooks</span>
                            <span className="text-indigo-500 bg-indigo-50 px-1 py-0.2 rounded text-[10px]">ACTIVE</span>
                          </div>
                          
                          <p className="text-[11.5px] text-slate-450 leading-relaxed font-sans mt-3">
                            Connect your automated robotic queues to process card frozen status files reactively:
                          </p>
                          
                          <div className="mt-4 space-y-3 text-[11px] leading-snug">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-150">
                              <span className="text-slate-650 block font-bold">WEBHOOK LISTENER ENDPOINT</span>
                              <span className="text-blue-500 block font-semibold truncate mt-0.5">https://api.uipath-agent-hack.net/v2/alerts-webhook</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-150">
                              <span className="text-slate-650 block font-bold">SHARED CRYPTOGRAPHIC TOKEN SECRETS</span>
                              <span className="text-slate-400 block font-semibold truncate mt-0.5">sha256-aistudio-webhook-key-20a46bab-9e31-42c4</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10.5px] px-3.5 py-2.5 rounded-xl font-bold font-sans flex items-center gap-2 mt-4">
                          <Check className="w-4 h-4 text-emerald-600 animate-pulse" />
                          <span>Status: Connected. Robot listener successfully dispatched 4 mitigation files today.</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* --- BOTTOM SYSTEM CHRONICLES TERMINAL LEDGER --- */}
              <footer className="h-44 bg-[#0B1220] text-slate-350 border-t border-white/10 px-6 py-3.5 flex flex-col justify-between shrink-0 font-mono text-[10.5px] select-none select-text-none">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-emerald-400" /> Secure cyber trace incident stream logs
                  </span>
                  <span className="text-emerald-400 text-[9px] font-bold">AI SENTINEL ONLINE</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1.5 py-2.5 custom-scrollbar text-slate-300">
                  {logs.map((log) => (
                    <div key={log.id} className="flex justify-between items-start leading-relaxed text-[11px]">
                      <div className="flex gap-2">
                        <span className="text-slate-500">[{log.time}]</span>
                        <span className={`px-1 rounded text-[8.5px] font-black uppercase ${log.category === "SECURITY" ? "bg-red-500/10 text-red-400 border border-red-500/15" : log.category === "ALERTS" ? "bg-amber-500/10 text-amber-400 border border-amber-500/15" : "bg-white/5 text-slate-400 border border-white/5"}`}>
                          {log.category}
                        </span>
                        <span className="text-slate-200 font-medium">{log.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1 border-t border-white/5 font-extrabold uppercase">
                  <span>Authorized Spec-ID: SPECTRE-04 (giofrt7)</span>
                  <span className="text-blue-400">{alerts.length} traces logged successfully</span>
                </div>
              </footer>

            </main>

            {/* Background overlay for Copilot drawer */}
            {copilotOpen && (
              <div 
                className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                onClick={() => setCopilotOpen(false)}
              />
            )}

            {/* ================= EXTRA RIGHT AREA: AI COPILOT INTERACTION CONSOLE ================= */}
            <aside className={`fixed lg:static inset-y-0 right-0 z-40 lg:z-auto w-80 bg-white border-l border-slate-200 flex flex-col justify-between shrink-0 select-none shadow-premium-sm transition-transform duration-300 lg:translate-x-0 ${copilotOpen ? "translate-x-0" : "translate-x-full"}`} style={{ height: "calc(100vh - 4rem)", top: "4rem" }}>
              
              {/* Copilot Header */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-[#0B1220] text-white">
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold block">Aegis-9 AI Copilot</span>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Cyber Security Cell</span>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              </div>

              {/* Copilot messaging stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 custom-scrollbar select-text">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-3.5 rounded-2xl text-[11.5px] leading-relaxed max-w-[90%] md:max-w-[100%] whitespace-pre-wrap font-sans ${msg.role === "user" ? "bg-blue-600 text-white font-semibold shadow-md rounded-tr-none" : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none font-medium text-slate-700"}`}>
                      {msg.content}
                    </div>
                    <span className="text-[8.5px] font-mono text-slate-400 mt-1 uppercase font-bold">{msg.time}</span>
                    
                    {msg.role === "model" && msg.suggestions && msg.suggestions.length > 0 && i === chatMessages.length - 1 && (
                      <div className="mt-3.5 w-full space-y-2 select-none">
                        <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider block">Suggested Next Actions:</span>
                        <div className="flex flex-wrap gap-1.5 max-w-full">
                          {msg.suggestions.map((sug, sIndex) => (
                            <button
                              key={sIndex}
                              onClick={() => submitCopilotMessage(sug)}
                              disabled={chatLoading}
                              className="text-[10.5px] font-semibold text-slate-700 bg-white border border-slate-250 hover:border-blue-500 hover:text-blue-600 focus:ring-1 focus:ring-blue-500 rounded-full px-3 py-1.5 transition text-left cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold font-mono">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Aegis-9 compiling strategics...
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Copilot input form */}
              <form onSubmit={sendChatMessage} className="p-3 bg-white border-t border-slate-150 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask secure incident questions..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="bg-slate-50 border border-slate-150 px-3.5 py-2.5 rounded-xl text-xs w-full outline-none text-slate-800 focus:bg-white focus:border-blue-500 font-medium text-black"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2.5 rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </aside>

          </div>
        ) : (
          /* ========================================================
             ================= 📱 MOBILE VIEW ENGINE (IPHONE & ANDROID) =================
             ======================================================== */
          <div className="flex-1 flex justify-center items-center py-6 bg-[#0B1220] relative">
            
            {/* Ambient device glow ring */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[640px] rounded-[50px] blur-[100px] opacity-15 pointer-events-none transition-all duration-1000 ${viewportMode === "iphone" ? "bg-blue-500" : "bg-cyan-500"}`} />

            {/* Simulated smartphone device bezel casing */}
            <div className={`w-[360px] h-[720px] rounded-[48px] bg-slate-900 border-[8px] relative shadow-2xl flex flex-col overflow-hidden ${viewportMode === "iphone" ? "border-slate-950" : "border-slate-800"}`}>
              
              {/* Notch island reflection (Apple style) */}
              {viewportMode === "iphone" && (
                <div className="absolute left-1/2 -translate-x-1/2 top-1 h-[22px] bg-black rounded-full w-[100px] z-50 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-900 animate-pulse-slow text-center text-white pl-1 md:pl-0" />
                </div>
              )}

              {/* TOP STATUS BAR ACCENTS */}
              <div className="h-9 bg-black flex justify-between items-center px-6 text-white text-[10px] font-mono select-none z-40">
                <div className="font-bold">{currentTime.slice(0, 5)} <span className="text-[8px] text-blue-400 font-normal">UTC</span></div>
                <div className="flex items-center gap-1.5 text-[8.5px] font-black text-slate-350">
                  <span className="bg-blue-900/40 text-blue-400 border border-blue-900/30 font-bold px-1 rounded-xs">VPN_ACTIVE</span>
                  <span>5G</span>
                </div>
              </div>

              {/* CORE MOBILE CANVAS SCROLL VIEW */}
              <div className="flex-1 overflow-y-auto px-4 py-3 bg-[#F8FAFC] custom-scrollbar flex flex-col text-slate-800">
                
                {/* A. MOBILE HOME VIEW */}
                {mobileTab === "home" && (
                  <div className="space-y-4 animate-fade-in flex flex-col flex-1">
                    <div className="flex justify-between items-start pt-2">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-black tracking-wider">Apex Commerce Node</span>
                        <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-0.5">Mobile Control Assistant</h3>
                      </div>
                      <span className="bg-red-50 text-[9px] font-mono text-red-650 px-1 py-0.2 rounded font-black">
                        THREAT: HI
                      </span>
                    </div>

                    {/* KPI metric blocks */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white border border-slate-205 p-3.5 rounded-xl shadow-premium-sm text-xs">
                        <span className="text-[9px] text-slate-400 uppercase font-mono font-bold block">AUDITS TODAY</span>
                        <div className="text-md font-extrabold text-slate-850 mt-1">$41,085</div>
                      </div>
                      <div className="bg-white border border-slate-205 p-3.5 rounded-xl shadow-premium-sm text-xs">
                        <span className="text-[9px] text-slate-400 uppercase font-mono font-bold block">IN REVIEW FLAGS</span>
                        <div className="text-md font-extrabold text-[#EF4444] mt-1">{alerts.filter(a => a.status === "In Review").length} Alerts</div>
                      </div>
                    </div>

                    {/* Quick Trigger Scenarios on mobile */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-mono uppercase text-slate-450 font-bold tracking-widest px-1">Inject Simulated Violations</div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => injectAlert("travel")}
                          className="text-[9.5px] font-bold font-mono bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/15 p-2 rounded-lg text-amber-500 transition cursor-pointer"
                        >
                          Impossible Travel
                        </button>
                        <button
                          onClick={() => injectAlert("crypto")}
                          className="text-[9.5px] font-bold font-mono bg-blue-600/10 hover:bg-blue-600/15 border border-blue-600/15 p-2 rounded-lg text-blue-500 transition cursor-pointer"
                        >
                          Crypto Outdrain
                        </button>
                        <button
                          onClick={() => injectAlert("biometric")}
                          className="text-[9.5px] font-bold font-mono bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/15 p-2 rounded-lg text-emerald-500 transition cursor-pointer"
                        >
                          Card Testing
                        </button>
                      </div>
                    </div>

                    {/* Mobile alert warnings */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-mono uppercase text-slate-450 font-bold tracking-widest px-1">Critical Threat Queue</div>
                      <div className="space-y-2">
                        {alerts.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => { playSound("click"); setMobileTab("alerts"); setSelectedAlert(item); }}
                            className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-premium-sm flex justify-between items-center cursor-pointer hover:bg-slate-50 transition"
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-mono font-bold text-slate-900">{item.id}</span>
                                <span className="bg-red-50 text-[7px] font-bold text-red-550 px-1 py-0.2 rounded font-mono uppercase">
                                  {item.severity}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-slate-800 mt-0.5">{item.merchant}</div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-slate-800 font-mono">${item.amount}</span>
                              <ChevronRight className="w-4 h-4 text-slate-400 mt-1 inline" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* System state monitor */}
                    <div className="bg-slate-900 text-slate-300 p-4 rounded-xl border border-white/5 font-mono text-[9px] space-y-1.5 mt-auto">
                      <div className="flex justify-between font-bold text-emerald-400">
                        <span>🛡️ GUARD NET STATUS:</span>
                        <span>ENABLED</span>
                      </div>
                      <p className="text-slate-400 leading-normal">
                        Security heuristics compiled automatically. Quantum firewall online. No systemic leak detected.
                      </p>
                    </div>

                  </div>
                )}

                {/* B. MOBILE ALERTS LIST VIEW */}
                {mobileTab === "alerts" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex justify-between items-center pt-2">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Dynamic Risk Alerts</h3>
                      <span className="bg-blue-100 text-blue-650 font-mono text-[9.5px] px-2 rounded-xl font-bold border border-blue-200">
                        {alerts.filter(a => a.status === "In Review").length} In Review
                      </span>
                    </div>

                    <div className="space-y-3">
                      {alerts.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-slate-205 p-4 rounded-xl shadow-premium-sm space-y-3"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-[10.5px] font-mono font-black text-slate-800">{item.id}</div>
                              <div className="text-xs font-bold text-slate-900 mt-0.5">{item.merchant}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-black text-slate-900 font-mono">${item.amount}</div>
                              <span className="text-[9.5px] text-slate-400 font-mono block mt-0.2">{item.timestamp}</span>
                            </div>
                          </div>

                          <p className="text-[10.5px] text-slate-550 leading-relaxed font-medium">
                            {item.aiSummary}
                          </p>

                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-50">
                            <span>Score: {item.riskScore}%</span>
                            <div className="flex gap-1.5">
                              {item.status === "In Review" ? (
                                <>
                                  <button
                                    onClick={() => updateAlertStatus(item.id, "Approved")}
                                    className="bg-emerald-600 text-white font-black py-1 px-2.5 rounded-lg text-[9px] transition cursor-pointer"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => updateAlertStatus(item.id, "Blocked & Frozen")}
                                    className="bg-red-650 text-white font-black py-1 px-2.5 rounded-lg text-[9px] transition cursor-pointer"
                                  >
                                    Block
                                  </button>
                                </>
                              ) : (
                                <span className={`text-[9px] font-mono uppercase bg-slate-100 text-slate-650 px-2 py-0.5 rounded-full`}>
                                  Resolved: {item.status}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* C. MOBILE CASES & INVESTIGATIONS */}
                {mobileTab === "cases" && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest pt-2">Active Investigations</h3>
                    
                    <div className="space-y-3">
                      {alerts.map((item) => (
                        <div key={item.id} className="bg-white border border-slate-205 p-3.5 rounded-xl shadow-premium-sm space-y-2">
                          <div className="flex justify-between font-mono text-[9px]">
                            <span className="text-slate-450">ID: {item.id}</span>
                            <span className="font-bold text-indigo-600">{item.caseId}</span>
                          </div>
                          
                          <div className="text-xs font-bold text-slate-850">Client: {item.customer}</div>
                          <div className="text-[10.5px] text-slate-500 font-medium">Outflow: <strong className="text-slate-900">${item.amount}</strong></div>
                          
                          {item.analystNotes ? (
                            <div className="bg-slate-50 p-2.5 rounded-lg text-[10.5px] text-slate-450 border border-slate-150 leading-relaxed font-semibold italic">
                              &quot;{item.analystNotes}&quot;
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                playSound("click");
                                const note = prompt("Type secure analyst notes file directive:") || "";
                                setAlerts(prev => prev.map(x => x.id === item.id ? { ...x, analystNotes: note } : x));
                              }}
                              className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-600 py-1.5 rounded-lg text-[9.5px] font-bold transition cursor-pointer"
                            >
                              + Append Action Directives Note
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* D. MOBILE SYSTEM COPILOT CHAT */}
                {mobileTab === "copilot" && (
                  <div className="flex-1 flex flex-col justify-between animate-fade-in py-2">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-slate-150">
                      <div className="w-5.5 h-5.5 rounded bg-blue-600 flex items-center justify-center text-white text-[10.5px]">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block text-slate-900">Aegis-9 AI assistant</span>
                        <span className="text-[8.5px] font-mono text-slate-450 block uppercase">SEC COGNITION</span>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 py-3 select-text custom-scrollbar text-xs min-h-[160px]">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                          <div className={`p-3 rounded-2xl whitespace-pre-wrap font-sans ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none font-semibold" : "bg-white text-slate-800 border border-slate-200 rounded-tl-none font-medium leading-relaxed"}`}>
                            {msg.content}
                          </div>
                          <span className="text-[7.5px] font-mono text-slate-450 uppercase mt-0.5">{msg.time}</span>
                          
                          {msg.role === "model" && msg.suggestions && msg.suggestions.length > 0 && i === chatMessages.length - 1 && (
                            <div className="mt-3 w-full space-y-1.5 select-none text-left">
                              <span className="text-[8.5px] font-bold uppercase text-slate-450 tracking-wider block">Suggested Next Actions:</span>
                              <div className="flex flex-wrap gap-1 max-w-full">
                                {msg.suggestions.map((sug, sIndex) => (
                                  <button
                                    key={sIndex}
                                    onClick={() => submitCopilotMessage(sug)}
                                    disabled={chatLoading}
                                    className="text-[9.5px] font-semibold text-slate-700 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-full px-2.5 py-1.5 transition text-left cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
                                  >
                                    {sug}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="text-[9.5px] font-mono text-slate-400 font-semibold animate-pulse">
                          Aegis-9 strategic compilation active...
                        </div>
                      )}
                    </div>

                    {/* Input form */}
                    <form onSubmit={sendChatMessage} className="flex gap-2 bg-white p-1.5 border border-slate-150 rounded-xl mt-auto shadow-inner">
                      <input
                        type="text"
                        placeholder="Audit questions..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="bg-transparent px-2 py-1 text-xs w-full outline-none text-slate-800 text-black"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || chatLoading}
                        className="bg-blue-600 text-white p-2 rounded-lg transition disabled:opacity-50 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>

                  </div>
                )}

              </div>

              {/* MOBILE BOTTOM NAVIGATION BAR */}
              <div className="h-14 bg-black border-t border-white/5 relative z-30 flex justify-around items-center px-2 pt-1 pb-2 text-slate-500 text-[10px]">
                {[
                  { id: "home", label: "Dashboard", icon: Home },
                  { id: "alerts", label: "Alerts Matrix", icon: Bell },
                  { id: "cases", label: "Investigations", icon: Briefcase },
                  { id: "copilot", label: "Aegis Copilot", icon: Sparkles }
                ].map((nb) => {
                  const Icon = nb.icon;
                  const selected = nb.id === mobileTab;
                  return (
                    <button
                      key={nb.id}
                      onClick={() => { playSound("click"); setMobileTab(nb.id as any); }}
                      className={`flex flex-col items-center gap-0.5 transition duration-150 cursor-pointer ${selected ? "text-blue-400" : "text-slate-500 hover:text-slate-300"}`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                      <span className="text-[8.5px] font-bold font-sans">{nb.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* IOS bottom line visual bar marker */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/25 rounded-full pointer-events-none" />

            </div>
          </div>
        )}

        {/* ================= AI MULTI-AGENT PIPELINE SIMULATOR MODAL ================= */}
        <AnimatePresence>
          {isAgentSimulatorOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-5xl bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh] max-h-[800px] text-slate-300 font-sans"
              >
                {/* Header banner */}
                <div className="bg-[#0e182a] border-b border-white/5 p-5 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      <Cpu className="w-5 h-5 text-cyan-200 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <span>Aegis-9 Cognitive Multi-Agent Pipeline</span>
                        <span className="text-[9px] bg-red-650/20 border border-red-500/30 text-red-400 px-1.5 py-0.2 rounded font-mono font-black">
                          ORCHESTRATED ACTIVE
                        </span>
                      </h2>
                      <p className="text-[10.5px] text-slate-450 mt-0.5 leading-none">
                        Interactive validation protocol tracing Case Ingestion ➔ 5 AI Agents ➔ Robot Hook dispatch.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => { playSound("click"); setIsAgentSimulatorOpen(false); }}
                    className="p-2 hover:bg-white/5 rounded-full text-slate-450 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Subheader: Presets bar */}
                <div className="bg-slate-900/60 border-b border-white/5 px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0 text-xs">
                  <div className="text-[10px] uppercase font-mono font-bold text-slate-500">
                    01 / Select Core Fraud Preset Vector:
                  </div>
                  <div className="flex gap-2">
                    {[
                      { id: "crypto", label: "Crypto Account Drain" },
                      { id: "travel", label: "Impossible Velocity" },
                      { id: "micro", label: "P2P Micro-charge" }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSimPresetChange(p.id as any)}
                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-extrabold transition cursor-pointer ${simulatorPreset === p.id ? "bg-blue-600 text-white border-blue-500 shadow-md" : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"}`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Split Columns (Scrollable body) */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 custom-scrollbar">
                  
                  {/* Left Col: Target variables config (Span 5) */}
                  <div className="lg:col-span-5 space-y-4 flex flex-col">
                    <div className="text-[10.5px] text-slate-500 uppercase font-bold tracking-widest font-mono">
                      Target Transaction Variables (Editable)
                    </div>

                    <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4.5 space-y-3.5 text-xs text-slate-400">
                      
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Customer Name</label>
                        <input
                          type="text"
                          value={simulatorName}
                          onChange={(e) => { setSimulatorName(e.target.value); setSimulatorPreset("custom"); }}
                          className="w-full bg-[#0E1726]/80 border border-white/5 rounded-xl px-3 py-2 text-slate-250 outline-none focus:border-blue-500 text-xs font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Merchant</label>
                          <input
                            type="text"
                            value={simulatorMerchant}
                            onChange={(e) => { setSimulatorMerchant(e.target.value); setSimulatorPreset("custom"); }}
                            className="w-full bg-[#0E1726]/80 border border-white/5 rounded-xl px-3 py-2 text-slate-250 outline-none focus:border-blue-500 text-xs font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Amount ($)</label>
                          <input
                            type="number"
                            value={simulatorAmount}
                            onChange={(e) => { setSimulatorAmount(Number(e.target.value)); setSimulatorPreset("custom"); }}
                            className="w-full bg-[#0E1726]/80 border border-white/5 rounded-xl px-3 py-2 text-slate-250 outline-none focus:border-blue-500 text-xs font-mono font-semibold"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Origin Geo-location</label>
                        <input
                          type="text"
                          value={simulatorLocation}
                          onChange={(e) => { setSimulatorLocation(e.target.value); setSimulatorPreset("custom"); }}
                          className="w-full bg-[#0E1726]/80 border border-white/5 rounded-xl px-3 py-2 text-slate-250 outline-none focus:border-blue-500 text-xs font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Network IP Address</label>
                          <input
                            type="text"
                            value={simulatorIp}
                            onChange={(e) => { setSimulatorIp(e.target.value); setSimulatorPreset("custom"); }}
                            className="w-full bg-[#0E1726]/80 border border-white/5 rounded-xl px-3 py-2 text-slate-205 outline-none focus:border-blue-500 text-xs font-mono font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Threat Level Ratio</label>
                          <span className="w-full block bg-[#0E1726]/40 border border-white/5 rounded-xl px-3 py-2 text-amber-400 font-mono text-xs font-bold leading-normal">
                            {simulatorAmount > 10000 ? "🔴 CRITICAL (96)" : simulatorAmount > 200 ? "🟡 SUSPICIOUS (75)" : "🟢 RISK-SAFE (24)"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Client User-Agent Browser Header</label>
                        <input
                          type="text"
                          value={simulatorHeader}
                          onChange={(e) => { setSimulatorHeader(e.target.value); setSimulatorPreset("custom"); }}
                          className="w-full bg-[#0E1726]/80 border border-white/5 rounded-xl px-3 py-1.5 text-[10.5px] text-slate-400 outline-none focus:border-blue-500 font-mono"
                        />
                      </div>

                    </div>

                    {/* Launch trigger button */}
                    <div className="mt-auto pt-4 border-t border-white/5 select-none shrink-0">
                      <button
                        onClick={() => runAgentMaverickPipeline()}
                        disabled={simulatorStep !== "IDLE" && simulatorStep !== "RESOLVED"}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider cursor-pointer font-sans"
                      >
                        {simulatorStep === "IDLE" || simulatorStep === "RESOLVED" ? (
                          <>
                            <Zap className="w-4 h-4 text-cyan-200 fill-current animate-bounce" />
                            <span>Run Cognitive Orchestrator</span>
                          </>
                        ) : (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
                            <span>Orchestrating... Step {simulatorStep}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                  {/* Right Col: Interactive Flow Diagram & Logs (Span 7) */}
                  <div className="lg:col-span-7 flex flex-col space-y-5 justify-between">
                    
                    {/* Visual Progress Bar Flow */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">02 / Dynamic Agent Pipeline Level</span>
                        <span className="font-mono text-blue-400 font-bold">{pipelineProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 border border-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 transition-all duration-300"
                          style={{ width: `${pipelineProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Interactive Pipeline State Nodes */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {[
                        { id: "INTAKE", icon: Database, name: "Intake Agent", desc: "Data Ingest" },
                        { id: "INVESTIGATION", icon: Cpu, name: "Investigation", desc: "Gemini Forensic" },
                        { id: "GRAPH", icon: Layers, name: "Graph Agent", desc: "Neo4j Clusters" },
                        { id: "RISK", icon: Sliders, name: "Risk Assessment", desc: "Threat Rating" },
                        { id: "REPORT", icon: FileText, name: "Report Agent", desc: "FinCEN-SAR" },
                        { id: "UIPATH", icon: Zap, name: "UiPath Robotic", desc: "Queue Dispatch" }
                      ].map((step, index) => {
                        const active = simulatorStep === step.id;
                        const complete =
                          (step.id === "INTAKE" && !["IDLE", "INTAKE"].includes(simulatorStep)) ||
                          (step.id === "INVESTIGATION" && !["IDLE", "INTAKE", "INVESTIGATION"].includes(simulatorStep)) ||
                          (step.id === "GRAPH" && !["IDLE", "INTAKE", "INVESTIGATION", "GRAPH"].includes(simulatorStep)) ||
                          (step.id === "RISK" && !["IDLE", "INTAKE", "INVESTIGATION", "GRAPH", "RISK"].includes(simulatorStep)) ||
                          (step.id === "REPORT" && !["IDLE", "INTAKE", "INVESTIGATION", "GRAPH", "RISK", "REPORT"].includes(simulatorStep)) ||
                          (step.id === "UIPATH" && simulatorStep === "RESOLVED");

                        const StepIcon = step.icon;

                        return (
                          <div
                            key={step.id}
                            className={`p-3 rounded-xl border flex flex-col justify-between transition-colors h-22 select-none ${active ? "bg-blue-600/10 border-blue-505 shadow-md" : complete ? "bg-emerald-500/10 border-emerald-500/25" : "bg-slate-905/40 border-white/5 opacity-40"}`}
                          >
                            <div className="flex justify-between items-center">
                              <StepIcon className={`w-4 h-4 ${active ? "text-blue-400 animate-pulse" : complete ? "text-emerald-400" : "text-slate-500"}`} />
                              {complete && (
                                <span className="bg-emerald-950 text-emerald-400 font-mono text-[7px] font-bold px-1 py-0.2 rounded">
                                  PASS
                                </span>
                              )}
                              {active && (
                                <span className="bg-blue-950 text-blue-400 font-mono text-[7px] font-bold px-1 py-0.2 rounded animate-pulse">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="text-[10px] text-white font-bold block leading-tight mt-1 truncate" title={step.name}>{step.name}</span>
                              <span className="text-[8.5px] text-slate-500 block font-mono truncate leading-tight mt-0.5" title={step.desc}>{step.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Terminal-state ultimate badge */}
                      <div className={`col-span-2 p-3 rounded-xl border flex flex-col justify-center items-center text-center h-22 ${simulatorStep === "RESOLVED" ? "bg-emerald-500/15 border-emerald-500/30" : "bg-slate-905/20 border-white/5 opacity-30 select-none"}`}>
                        <ShieldCheck className={`w-5 h-5 ${simulatorStep === "RESOLVED" ? "text-emerald-450 animate-bounce" : "text-slate-600"}`} />
                        <span className="text-[10.5px] font-black text-white uppercase tracking-wider block mt-1 leading-none">Security Resolved</span>
                        <span className="text-[7.5px] font-mono text-slate-450 block uppercase tracking-widest mt-0.5 leading-none">Case Closed Locked</span>
                      </div>
                    </div>

                    {/* Live Scrolling Terminal Logs */}
                    <div className="space-y-1.5 flex-1 flex flex-col min-h-[220px]">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">03 / Core Handshake Chronicles Console</span>
                        <span className="text-[8.5px] font-mono text-slate-600">SECURE SHELL</span>
                      </div>
                      
                      <div className="flex-1 bg-slate-950 border border-white/5 rounded-xl p-4.5 font-mono text-[10px] text-slate-350 overflow-y-auto space-y-2 select-text h-[250px] custom-scrollbar">
                        {simulatorLogs.length === 0 ? (
                          <div className="h-full flex flex-col justify-center items-center text-slate-600 text-center select-none">
                            <Terminal className="w-5 h-5 mb-1.5 opacity-40 text-blue-400" />
                            <span>Awaiting automated sandbox execution trigger...</span>
                            <span className="text-[8.5px] opacity-70 mt-0.5">[Logs compiled reactively in real-time]</span>
                          </div>
                        ) : (
                          simulatorLogs.map((log, i) => {
                            let colorClass = "text-slate-400";
                            if (log.startsWith("[INTAKE")) colorClass = "text-blue-400 font-semibold";
                            else if (log.startsWith("[INVESTIGATION")) colorClass = "text-cyan-300 font-semibold";
                            else if (log.startsWith("[GRAPH")) colorClass = "text-purple-300 font-semibold";
                            else if (log.startsWith("[RISK")) colorClass = "text-amber-300 font-bold";
                            else if (log.startsWith("[REPORT")) colorClass = "text-indigo-300 font-semibold";
                            else if (log.startsWith("[UIPATH")) colorClass = "text-pink-300 font-semibold";
                            else if (log.startsWith("[RESOLVED") || log.startsWith("[COMPLETE")) colorClass = "text-emerald-400 font-bold font-sans text-xs bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded-lg";
                            
                            return (
                              <div key={i} className={`leading-normal ${colorClass}`}>
                                {log}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Footer bar */}
                <div className="bg-slate-900/60 border-t border-white/5 px-6 py-4 flex justify-between items-center shrink-0 font-mono text-[9px] text-slate-500 select-none">
                  <span>ORCHESTRATOR COMPENSATING SYSTEM V3.9</span>
                  <span>100% SECURE AUTONOMIC SEEDED FAILSAFE</span>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= CREATE NEW SECURITY CASE MODAL ================= */}
        <AnimatePresence>
          {isCreateCaseOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm select-none overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-slate-800 font-sans"
              >
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-150 p-5 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest flex items-center gap-2">
                        <span>Manually Provision Case</span>
                        <span className="text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1.5 py-0.2 rounded font-mono font-bold">
                          NEW TRANS RECORD
                        </span>
                      </h2>
                      <p className="text-[10.5px] text-slate-500 mt-0.5 leading-none">
                        Establish secure investigative telemetry for a new cybersecurity case file.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => { playSound("click"); setIsCreateCaseOpen(false); }}
                    className="p-1.5 hover:bg-slate-200/60 rounded-full text-slate-400 hover:text-slate-800 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Form fields scrollable */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Name</label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={newCaseCustomer}
                        onChange={(e) => setNewCaseCustomer(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 outline-none focus:border-emerald-500 font-semibold"
                        required
                        id="new-case-customer-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Merchant Identity</label>
                      <input
                        type="text"
                        placeholder="e.g. STRIPE RECURRING DEBIT"
                        value={newCaseMerchant}
                        onChange={(e) => setNewCaseMerchant(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 outline-none focus:border-emerald-500 font-semibold"
                        required
                        id="new-case-merchant-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Transaction Amount ($)</label>
                      <input
                        type="number"
                        placeholder="e.g. 1950.45"
                        value={newCaseAmount}
                        onChange={(e) => setNewCaseAmount(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 outline-none focus:border-emerald-500 font-semibold font-mono"
                        required
                        id="new-case-amount-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category Class</label>
                      <select
                        value={newCaseCategory}
                        onChange={(e) => setNewCaseCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 outline-none focus:border-emerald-500 font-semibold cursor-pointer"
                        id="new-case-category-input"
                      >
                        <option value="Card Testing">Card Testing Pool</option>
                        <option value="Impossible Velocity">Impossible Velocity Gap</option>
                        <option value="Crypto Account Drain">Crypto Account Drain</option>
                        <option value="P2P Micro-charge">P2P Micro-charge</option>
                        <option value="Biometric Spoofing">Biometric Spoofing</option>
                        <option value="Credential Stuffing">Credential Stuffing</option>
                        <option value="Manual Account Audit">Manual Account Audit</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location Origin</label>
                      <input
                        type="text"
                        placeholder="e.g. New York, USA"
                        value={newCaseLocation}
                        onChange={(e) => setNewCaseLocation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 outline-none focus:border-emerald-500 font-semibold"
                        id="new-case-location-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Risk Score Index (0-100)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={newCaseRiskScore}
                          onChange={(e) => setNewCaseRiskScore(Number(e.target.value))}
                          className="w-full h-1 bg-slate-100 appearance-none cursor-pointer accent-emerald-600 rounded-lg"
                          id="new-case-risk-slider"
                        />
                        <span className={`text-xs font-mono font-black shrink-0 px-2.5 py-0.5 rounded-lg ${newCaseRiskScore >= 75 ? "bg-red-50 text-red-600 font-bold" : newCaseRiskScore >= 40 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                          {newCaseRiskScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Device IP Address</label>
                      <input
                        type="text"
                        value={newCaseDeviceIp}
                        onChange={(e) => setNewCaseDeviceIp(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 outline-none focus:border-emerald-500 font-mono font-medium"
                        id="new-case-ip-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">User-Agent Device Header</label>
                      <input
                        type="text"
                        value={newCaseDeviceHeader}
                        onChange={(e) => setNewCaseDeviceHeader(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] text-slate-500 outline-none focus:border-emerald-500 font-mono"
                        id="new-case-ua-input"
                      />
                    </div>
                  </div>

                </div>

                {/* Footer with action buttons */}
                <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-between items-center shrink-0">
                  <button
                    type="button"
                    onClick={() => { playSound("click"); setIsCreateCaseOpen(false); }}
                    className="text-slate-500 hover:bg-slate-200/60 font-semibold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addNewCase}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-premium-sm flex items-center gap-1.5 cursor-pointer"
                    id="btn-confirm-create-case"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                    <span>Authorize & Create Registry Record</span>
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
