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
  Settings
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

export default function Page() {
  // Theme and UI States
  const [viewportMode, setViewportMode] = useState<"desktop" | "iphone" | "android">("desktop");
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

  // Filter & Sorted states for Case Management
  const [searchText, setSearchText] = useState("");
  const [filterRisk, setFilterRisk] = useState<"ALL" | "CRITICAL" | "SUSPICIOUS" | "SAFE">("ALL");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "In Review" | "Approved" | "Blocked & Frozen" | "Escalated">("ALL");
  const [sortBy, setSortBy] = useState<"riskScore" | "amount" | "id">("riskScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [bulkList, setBulkList] = useState<string[]>([]);

  // AI Copilot State
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "model"; content: string; time: string }[]>([
    {
      role: "model",
      content: "Welcome, Operator. I am Aegis-9, your secure FraudShield AI Copilot. I have mapped three anomalous transaction vectors on the core retail channel today. Select any card to run an automated LLM forensic scan.",
      time: "18:04:00"
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
      aiSummary: "Immediate wallet liquidation sequence triggered 14 seconds after self-service biometric reset from unrecognized Android device.",
      recommendation: "IMMEDIATE CAPITAL FREEZE & DEVICE TERMINATION",
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
      aiSummary: "Small physical swipe in Paris registered exactly 4 minutes after an authorized cash ATM withdrawal in San Francisco.",
      recommendation: "MANDATORY SMS OTP CHALLENGE & HOLD",
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
      aiSummary: "Standard EMV Chip physical terminal verification mapped matching core consumer historical patterns.",
      recommendation: "AUTO-APPROVED BY STANDARD POLICY",
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
      aiSummary: "Automated low-value transfer mapping commonly used to verify valid token credentials before large system drain.",
      recommendation: "MANDATORY CALL CHALLENGE & ACCOUNT SUSPENSION",
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

  // Simulation Injection
  const injectAlert = (type: "travel" | "crypto" | "biometric") => {
    playSound("warning");
    const { randId, randCase } = getNextAlertIds();
    let newItem: Alert;

    if (type === "travel") {
      newItem = {
        id: randId,
        customer: "Sarah Jenkins",
        merchant: "TOKYO METRO RAILWAY",
        amount: 88.50,
        timestamp: "Just now",
        category: "Impossible Travel Velocity",
        location: "Tokyo, JP",
        riskScore: 82,
        severity: "SUSPICIOUS",
        anomalies: ["Instant Geographic Shift", "Unregistered Card Terminal"],
        aiSummary: "Physical payment sequence completed in Tokyo station less than 8 minutes after an online digital order occurred in Boston.",
        recommendation: "ENFORCE TWO-FACTOR CHALLENGE & BLOCK TRAVEL CHIP",
        caseId: randCase,
        status: "In Review",
        deviceIp: "203.0.113.67",
        deviceHeader: "NFC EMV Terminal Class-2 v9",
        analystNotes: "Suspicious geolocational velocity leap. Cardholder has no registered travel history.",
        timeline: [{ time: "Just now", event: "Impossible velocity calculation triggered", status: "Critical" }]
      };
      setNotifyQueue("🚨 IMPOSSIBLE TRAVEL VELOCITY IDENTIFIED");
    } else if (type === "crypto") {
      newItem = {
        id: randId,
        customer: "Marcus Vance",
        merchant: "BINANCE ASSET TRADER",
        amount: 19500.00,
        timestamp: "Just now",
        category: "High-value Escrow Liquidation",
        location: "Unknown Location (Tor Node)",
        riskScore: 98,
        severity: "CRITICAL",
        anomalies: ["Tor Onion Route Proxy", "Biometric Authentication Defeated", "Rapid Account Drain"],
        aiSummary: "Outflow of capital routing to external decentralized pool. Matches known automated drainer script behaviors.",
        recommendation: "LAUNCH IMMEDIATE PROTOCOL-8 ACCOUNT SUSPENSION",
        caseId: randCase,
        status: "In Review",
        deviceIp: "109.201.154.2",
        deviceHeader: "Tor Browser v13 - Linux x86_64",
        analystNotes: "Urgent account drain suspect. Cryptographic key bypass protocol matches known hacker kit.",
        timeline: [{ time: "Just now", event: "Decentralized P2P router alert", status: "Critical" }]
      };
      setNotifyQueue("🚨 EMERGENCY: FRAUDULENT CRYPTO LIQUIDATION");
    } else {
      newItem = {
        id: randId,
        customer: "Elena Rostova",
        merchant: "STRIPE SAAS API GATEWAY",
        amount: 1.00,
        timestamp: "Just now",
        category: "Card Testing Attack",
        location: "Berlin, DE (NordVPN)",
        riskScore: 54,
        severity: "SUSPICIOUS",
        anomalies: ["High-Velocity Script Attempt", "VPN Tunnel Match"],
        aiSummary: "Standard 1.00 unit charge attempt, commonly structured for automated credit testing pools.",
        recommendation: "FLAG MERCHANT ENDPOINT & SMS CHALLENGE",
        caseId: randCase,
        status: "In Review",
        deviceIp: "193.56.28.4",
        deviceHeader: "Python/aiohttp client framework",
        analystNotes: "Suspected system harvesting test.",
        timeline: [{ time: "Just now", event: "Micro charge sequence captured", status: "Incomplete" }]
      };
      setNotifyQueue("⚠️ SUSPECTED CARD TESTING PATTERN");
    }

    setAlerts(prev => [newItem, ...prev]);
    setSelectedAlert(newItem);
    addLog("ALERTS", `Alert Injection: ${newItem.category} mapped on ${newItem.id}.`);
    
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

  // Copilot dialogue flow
  const sendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    playSound("click");
    const userText = chatInput;
    setChatInput("");
    
    const userMsg = { role: "user" as const, content: userText, time: new Date().toTimeString().split(" ")[0] };
    setChatMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map(m => ({ role: m.role, content: m.content })),
          currentThreatLevel: "ELEVATED",
          activeAlertsCount: alerts.filter(a => a.status === "In Review").length
        })
      });
      const data = await response.json();
      
      setChatMessages(prev => [
        ...prev,
        { role: "model", content: data.reply, time: new Date().toTimeString().split(" ")[0] }
      ]);
      addLog("INTELLIGENCE", "Aegis-9 strategic solution compiled via server-side Gemini client.");
    } catch (_) {
      setChatMessages(prev => [
        ...prev,
        {
          role: "model",
          content: "[FAILSAFE ROUTE ACTIVATED] Local neural node compiled safely. Security recommend: immediately halt transaction TX-5082 and launch client biometric challenge protocols.",
          time: new Date().toTimeString().split(" ")[0]
        }
      ]);
    } finally {
      setChatLoading(false);
    }
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
        aiSummary: "Immediate wallet liquidation sequence triggered 14 seconds after self-service biometric reset from unrecognized Android device.",
        recommendation: "IMMEDIATE CAPITAL FREEZE & DEVICE TERMINATION",
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
        aiSummary: "Small physical swipe in Paris registered exactly 4 minutes after an authorized cash ATM withdrawal in San Francisco.",
        recommendation: "MANDATORY SMS OTP CHALLENGE & HOLD",
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
        aiSummary: "Standard EMV Chip physical terminal verification mapped matching core consumer historical patterns.",
        recommendation: "AUTO-APPROVED BY STANDARD POLICY",
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
        <header className="bg-[#0B1220] text-white border-b border-white/5 px-6 py-3 flex items-center justify-between shrink-0 h-16">
          <div className="flex items-center gap-3">
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

            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${userRole}&backgroundColor=0f172a`}
              alt="User bot icon"
              className="w-8 h-8 rounded-xl border border-white/10 bg-slate-900"
            />
          </div>
        </header>

        {viewportMode === "desktop" ? (
          /* ========================================================
             ================= 💻 DESKTOP WORKSPACE LAYOUT =================
             ======================================================== */
          <div className="flex-1 flex overflow-hidden min-h-0 bg-[#F8FAFC]">
            
            {/* --- LEFT NAVIGATION SIDEBAR PANEL --- */}
            <aside className="w-64 bg-[#0B1220] text-slate-300 border-r border-white/5 flex flex-col justify-between shrink-0">
              
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
                          onClick={() => { playSound("click"); setActiveTab(tab.id as any); }}
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
                          onClick={() => { playSound("click"); setActiveTab(tab.id as any); }}
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
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                      {[
                        { title: "Total Audits", value: "$41,085", sub: "Last 24h", trend: "+12.4%", status: "up", icon: CreditCard, color: "text-blue-600 bg-blue-50 border-blue-100" },
                        { title: "Active Risk Outflow", value: `$${alerts.filter(a => a.severity === "CRITICAL" && a.status === "In Review").reduce((sum, a) => sum + a.amount, 0).toLocaleString()}`, sub: "Blocked Attempts", trend: "-4.1%", status: "down", icon: AlertTriangle, color: "text-red-600 bg-red-50 border-red-100" },
                        { title: "In Review Flags", value: alerts.filter(a => a.status === "In Review").length.toString(), sub: "Needs urgent review", trend: "+2 new", status: "up", icon: Activity, color: "text-amber-500 bg-amber-50 border-amber-100" },
                        { title: "Approved Policy", value: alerts.filter(a => a.status === "Approved").length.toString(), sub: "Autonomous pass", trend: "99.8%", status: "up", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                        { title: "Avg Risk Index", value: Math.round(alerts.reduce((avg, cur) => avg + cur.riskScore, 0) / alerts.length).toString() + "%", sub: "Heuristic threshold", trend: "Safe range", status: "stable", icon: Cpu, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
                        { title: "Cognitive Accuracy", value: "99.94%", sub: "Gemini-3.5 flash", trend: "+0.02%", status: "up", icon: Sparkles, color: "text-cyan-600 bg-cyan-50 border-cyan-100" }
                      ].map((card, idx) => {
                        const Icon = card.icon;
                        return (
                          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 transition-all duration-300 hover:shadow-premium-md hover:border-slate-300 flex flex-col justify-between select-none shadow-premium-sm">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
                              <div className={`p-2 rounded-xl border ${card.color}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="text-xl font-black text-slate-800 tracking-tight">{card.value}</div>
                              <div className="flex justify-between items-center mt-1 text-[10px]">
                                <span className="text-slate-400 font-medium">{card.sub}</span>
                                <span className={`font-black uppercase px-1 py-0.2 rounded font-mono ${card.status === "up" ? "text-emerald-600" : card.status === "down" ? "text-red-500" : "text-blue-500"}`}>
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
                        <div className="h-52 w-full mt-2">
                          <ResponsiveContainer width="100%" height="100%">
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
                        <div className="h-52 w-full mt-2">
                          <ResponsiveContainer width="100%" height="100%">
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
                          <div className="w-32 h-32">
                            <ResponsiveContainer width="100%" height="100%">
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
                          
                          <p className="text-[11.5px] text-slate-650 leading-relaxed font-medium">
                            {selectedAlert.aiSummary}
                          </p>

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
                    <div>
                      <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        Comprehensive Case Management Ledger
                      </h1>
                      <p className="text-xs text-slate-500">Enterprise data-first audit view. Filter, query, sort, batch resolve security incidents, and compile regulatory findings.</p>
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
                                <th className="p-3.5">Case/Tx ID</th>
                                <th className="p-3.5">Customer Name</th>
                                <th className="p-3.5">Category Class</th>
                                <th className="p-3.5 text-center">Risk Index</th>
                                <th className="p-3.5">Amount</th>
                                <th className="p-3.5">Status</th>
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
                                      <td className="p-3.5 font-bold text-slate-900 font-mono">{item.id}</td>
                                      <td className="p-3.5 font-semibold text-slate-850">{item.customer}</td>
                                      <td className="p-3.5 text-slate-500 font-medium ">{item.category}</td>
                                      <td className="p-3.5 text-center">
                                        <span className={`font-mono font-black text-[10.5px] px-2 py-0.5 rounded-full ${item.severity === "CRITICAL" ? "bg-red-50 text-red-650" : item.severity === "SUSPICIOUS" ? "bg-amber-50 text-amber-650" : "bg-emerald-50 text-emerald-650"}`}>
                                          {item.riskScore}%
                                        </span>
                                      </td>
                                      <td className="p-3.5 font-extrabold text-slate-900 text-right pr-6">${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                      <td className="p-3.5">
                                        <span className={`font-black uppercase tracking-wider text-[9px] font-mono px-2 py-0.5 rounded-full ${item.status === "Approved" ? "bg-emerald-50 text-emerald-600" : item.status === "Blocked & Frozen" ? "bg-red-50 text-red-650" : item.status === "Escalated" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
                                          {item.status}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan={7} className="p-10 text-center text-slate-400 font-mono text-xs">
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
                          <span className="bg-slate-100 text-slate-650 text-[10.5px] font-bold font-mono px-2.5 py-0.5 rounded-xl border border-slate-200/60">
                            {selectedAlert.caseId}
                          </span>
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
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Associated Legal Evidence</div>
                          <div className="flex gap-2">
                            <span className="bg-white border border-slate-200 text-slate-600 font-mono text-[9px] px-2 py-1 rounded cursor-pointer">
                              📄 IP_Address_Logs.log
                            </span>
                            <span className="bg-white border border-slate-200 text-slate-600 font-mono text-[9px] px-2 py-1 rounded cursor-pointer">
                              📁 Fraud_Signatures_SHA256
                            </span>
                          </div>
                          <div className="border border-dashed border-slate-305 p-3 rounded-lg text-center text-[10.5px] text-slate-450 hover:bg-white transition cursor-pointer font-medium mt-1">
                            Drag & drop cyber incident artifacts to bind to this court case file
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

                {/* 4. COMPLIANCE & ACCIDENT SECTORS */}
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
                            onClick={() => { playSound("success"); alert("SAR Draft compiled successfully. Safe backup ledger recorded on Cloud SQL database."); }}
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

            {/* ================= EXTRA RIGHT AREA: AI COPILOT INTERACTION CONSOLE ================= */}
            <aside className="w-80 bg-white border-l border-slate-200 flex flex-col justify-between shrink-0 select-none shadow-premium-sm">
              
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
                    <div className={`p-3.5 rounded-2xl text-[11.5px] leading-relaxed max-w-[90%] md:max-w-[100%] ${msg.role === "user" ? "bg-blue-600 text-white font-semibold shadow-md rounded-tr-none" : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none font-medium text-slate-700"}`}>
                      {msg.content}
                    </div>
                    <span className="text-[8.5px] font-mono text-slate-400 mt-1 uppercase font-bold">{msg.time}</span>
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
                    <div className="flex-1 overflow-y-auto space-y-3 py-3 select-text max-h-[380px] custom-scrollbar text-xs">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                          <div className={`p-3 rounded-2xl ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none font-semibold" : "bg-white text-slate-800 border border-slate-200 rounded-tl-none font-medium leading-relaxed"}`}>
                            {msg.content}
                          </div>
                          <span className="text-[7.5px] font-mono text-slate-450 uppercase mt-0.5">{msg.time}</span>
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

      </div>
    </div>
  );
}
