"use client"

import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield, Key, Lock, Cpu, Database, UserCheck, FileText, Activity, AlertTriangle,
  CheckCircle2, XCircle, Clock, ExternalLink, Search, Bell, Settings, QrCode,
  ArrowRightLeft, Layers, Landmark, UserPlus, RefreshCw, Copy, Check, ChevronRight,
  LogOut, ShieldAlert, Sparkles, Terminal, Download, Eye, Zap, ChevronDown,
  Building2, HardDrive, Smartphone, HelpCircle, Menu, X, Filter, BarChart3, Radio
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { useTheme } from '@/providers/Theme.provider';

const DEMO_ORGANIZATION = "BEL Secure Operations";

const DEMO_PERSONAS = {
  admin: {
    name: "Raj Patel",
    role: "Admin",
    roleBadge: "System Administrator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    did: "did:mesh:bel:0x892a4f...9c10",
    wallet: "0x892A4F...9C10",
    dept: "Cybersecurity & Defense Ops",
    clearance: "Level 3 - Top Secret"
  },
  manager: {
    name: "Priya Shah",
    role: "Manager",
    roleBadge: "Asset Manager",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    did: "did:mesh:bel:0x3f8a9c...11b4",
    wallet: "0x3F8A9C...11B4",
    dept: "Infrastructure & Hardware",
    clearance: "Level 2 - Confidential"
  },
  auditor: {
    name: "Amit Kumar",
    role: "Auditor",
    roleBadge: "Compliance Auditor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    did: "did:mesh:bel:0x71c90a...d8e2",
    wallet: "0x71C90A...D8E2",
    dept: "Internal Audit & Regulatory",
    clearance: "Level 3 - Independent Inspector"
  },
  user: {
    name: "Rahul Mehta",
    role: "User",
    roleBadge: "Senior Hardware Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    did: "did:mesh:bel:0x12b8d0...e45f",
    wallet: "0x12B8D0...E45F",
    dept: "R&D Embedded Systems",
    clearance: "Level 1 - Restricted"
  }
};

const INITIAL_ASSETS = [
  { id: "AST-1092", name: "Dell Latitude 5420 Rugged", type: "Physical Hardware", owner: "Rahul Mehta", location: "Facility Alpha - Room 302", nftId: "NFT-#1092", nftContract: "0x7a2...9f01", sensitivity: "High", status: "Active", icon: "laptop" },
  { id: "AST-2041", name: "HSM Hardware Security Module", type: "Server Component", owner: "Raj Patel", location: "Datacenter Beta - Rack 14", nftId: "NFT-#2041", nftContract: "0x7a2...9f01", sensitivity: "Critical", status: "Active", icon: "server" },
  { id: "AST-3088", name: "Tactical Radio Transceiver", type: "Physical Asset", owner: "Priya Shah", location: "Facility Gamma - Depot 04", nftId: "NFT-#3088", nftContract: "0x7a2...9f01", sensitivity: "High", status: "In Transit", icon: "radio" },
  { id: "AST-4112", name: "Quantum Encryption Keycard", type: "Digital Access Token", owner: "Amit Kumar", location: "Digital Vault 01", nftId: "NFT-#4112", nftContract: "0x7a2...9f01", sensitivity: "Top Secret", status: "Active", icon: "key" },
  { id: "AST-5020", name: "Industrial SCADA Controller", type: "Physical Infrastructure", owner: "Rahul Mehta", location: "Facility Alpha - Grid B", nftId: "NFT-#5020", nftContract: "0x7a2...9f01", sensitivity: "Critical", status: "Maintenance", icon: "cpu" },
];

const INITIAL_TRANSACTIONS = [
  { hash: "0x8f2a9...3b12", type: "NFT Minted", user: "Raj Patel", asset: "AST-1092", time: "10 mins ago", status: "Confirmed", block: "18294021" },
  { hash: "0x3c91a...8e00", type: "Credential Issued", user: "Priya Shah", asset: "Clearance Level 2", time: "24 mins ago", status: "Confirmed", block: "18294018" },
  { hash: "0x1d4e0...92fa", type: "Asset Assigned", user: "Rahul Mehta", asset: "AST-1092", time: "1 hour ago", status: "Confirmed", block: "18293992" },
  { hash: "0x7f8b2...11cd", type: "DID Created", user: "Amit Kumar", asset: "Identity Proof", time: "3 hours ago", status: "Confirmed", block: "18293910" },
  { hash: "0x9a221...440e", type: "Permission Updated", user: "Raj Patel", asset: "RBAC Rule #4", time: "5 hours ago", status: "Confirmed", block: "18293845" },
];

const INITIAL_AUDIT_LOGS = [
  { id: "AUD-901", time: "2026-09-10 14:32:01", actor: "Raj Patel", did: "did:mesh:bel:0x892a4f...", action: "ISSUED_CREDENTIAL", asset: "Security Clearance L3", hash: "0x8f2a9...3b12", risk: "Low" },
  { id: "AUD-902", time: "2026-09-10 13:15:44", actor: "Rahul Mehta", did: "did:mesh:bel:0x12b8d0...", action: "REQUESTED_ACCESS", asset: "Facility Alpha Server Room", hash: "0x3c91a...8e00", risk: "Low" },
  { id: "AUD-903", time: "2026-09-10 11:02:19", actor: "Priya Shah", did: "did:mesh:bel:0x3f8a9c...", action: "TRANSFER_APPROVED", asset: "AST-1092 Dell Rugged", hash: "0x1d4e0...92fa", risk: "Medium" },
  { id: "AUD-904", time: "2026-09-10 09:44:10", actor: "System AI Engine", did: "did:mesh:system:0x0000...", action: "RISK_FLAG_TRIGGERED", asset: "Unknown Device Login", hash: "0x7f8b2...11cd", risk: "High" },
  { id: "AUD-905", time: "2026-09-10 08:20:55", actor: "Amit Kumar", did: "did:mesh:bel:0x71c90a...", action: "AUDIT_REPORT_GENERATED", asset: "Q3 Compliance Record", hash: "0x9a221...440e", risk: "Low" },
];

const RISK_TREND_DATA = [
  { time: '00:00', risk: 12 },
  { time: '04:00', risk: 15 },
  { time: '08:00', risk: 42 },
  { time: '12:00', risk: 28 },
  { time: '16:00', risk: 18 },
  { time: '20:00', risk: 22 },
];

export default function App() {
  // Application State
  const [role, setRole] = useState('admin');
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  // Wallet / Identity State
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectStep, setConnectStep] = useState(1);
  
  // Modals & Panels
  const [isRegisterAssetOpen, setIsRegisterAssetOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [selectedAssetForTransfer, setSelectedAssetForTransfer] = useState(null);
  
  // Interactive Simulation States
  const [emergencyActiveSeconds, setEmergencyActiveSeconds] = useState(null);
  const [assetsList, setAssetsList] = useState(INITIAL_ASSETS);
  const [txList, setTxList] = useState(INITIAL_TRANSACTIONS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Active Persona details
  const activeUser = DEMO_PERSONAS[role];

  // Emergency Timer countdown handler
  useEffect(() => {
    let timer;
    if (emergencyActiveSeconds !== null && emergencyActiveSeconds > 0) {
      timer = setInterval(() => {
        setEmergencyActiveSeconds(prev => prev - 1);
      }, 1000);
    } else if (emergencyActiveSeconds === 0) {
      setEmergencyActiveSeconds(null);
      showToast("Emergency break-glass temporary session has EXPIRED and access was auto-revoked.", "warning");
    }
    return () => clearInterval(timer);
  }, [emergencyActiveSeconds]);

  // Global Toast Helper
  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const canAccess = (requiredRoles) => requiredRoles.includes(role);

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-200 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 animate-in slide-in-from-top duration-300">
          {toastMessage.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
          <span className="text-sm font-medium">{toastMessage.msg}</span>
        </div>
      )}

      {/* Persona Switcher Bar for SIH Evaluation */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 z-40">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-white tracking-wide">SIH DEMO PERSONA SWITCHER:</span>
          <span className="text-slate-400">Current Role:</span>
          <span className="bg-cyan-900/80 text-cyan-300 px-2 py-0.5 rounded font-mono font-medium border border-cyan-700/50 uppercase">
            {role}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          {Object.keys(DEMO_PERSONAS).map((key) => (
            <button
              key={key}
              onClick={() => {
                setRole(key);
                showToast(`Switched view to ${DEMO_PERSONAS[key].name} (${DEMO_PERSONAS[key].role})`);
              }}
              className={`px-2.5 py-1 rounded text-xs transition-all font-medium flex items-center gap-1.5 ${
                role === key
                  ? 'bg-cyan-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              {DEMO_PERSONAS[key].name} ({DEMO_PERSONAS[key].role})
            </button>
          ))}
        </div>
      </div>

      {/* Main Top Navbar */}
      {}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl text-white shadow-md shadow-cyan-500/20">
              <Shield className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white leading-tight tracking-tight text-base flex items-center gap-1.5">
                TrustMesh <span className="text-[10px] bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-mono px-1.5 py-0.5 rounded border border-cyan-300 dark:border-cyan-800">v2.4 Enterprise</span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">{DEMO_ORGANIZATION}</p>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Platform</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
              {currentView.replace('-', ' ')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quick search or DID...</span>
            <kbd className="hidden sm:inline bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 text-[10px] px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono">⌘K</kbd>
          </button>

          {/* Emergency Timer Indicator if Active */}
          {emergencyActiveSeconds !== null && (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-lg text-xs font-mono font-medium animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              <span>Break-Glass: {Math.floor(emergencyActiveSeconds / 60)}:{(emergencyActiveSeconds % 60).toString().padStart(2, '0')}</span>
            </div>
          )}

          {/* Wallet / DID Status Badge */}
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
              isWalletConnected
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-rose-50 text-rose-700 border-rose-300'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isWalletConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="hidden lg:inline">{activeUser.did.slice(0, 16)}...</span>
            <span className="lg:hidden">{activeUser.wallet.slice(0, 6)}...</span>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
            title="Toggle theme"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2.5 pl-1">
            <img src={activeUser.avatar} alt={activeUser.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/30" />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-900 dark:text-white leading-none">{activeUser.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{activeUser.roleBadge}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar Navigation */}
        {}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            
            {/* Overview Section */}
            <div>
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Overview</div>
              <nav className="space-y-1">
                <SidebarItem
                  icon={Activity}
                  label="Dashboard"
                  active={currentView === 'dashboard'}
                  onClick={() => setCurrentView('dashboard')}
                />
              </nav>
            </div>

            {/* Identity Management */}
            <div>
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Identity & Users</div>
              <nav className="space-y-1">
                <SidebarItem
                  icon={Key}
                  label="My Identity & DID"
                  active={currentView === 'my-identity'}
                  onClick={() => setCurrentView('my-identity')}
                />
                <SidebarItem
                  icon={UserCheck}
                  label="Verifiable Credentials"
                  active={currentView === 'credentials'}
                  onClick={() => setCurrentView('credentials')}
                />
                {canAccess(['admin', 'manager']) && (
                  <SidebarItem
                    icon={UserPlus}
                    label="Directory & Users"
                    active={currentView === 'users'}
                    onClick={() => setCurrentView('users')}
                  />
                )}
              </nav>
            </div>

            {/* Access Control Section */}
            <div>
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Access Control</div>
              <nav className="space-y-1">
                <SidebarItem
                  icon={Lock}
                  label="Access Requests"
                  active={currentView === 'access-requests'}
                  onClick={() => setCurrentView('access-requests')}
                  badge="3 Pending"
                />
                <SidebarItem
                  icon={Zap}
                  label="Emergency Break-Glass"
                  active={currentView === 'emergency-access'}
                  onClick={() => setCurrentView('emergency-access')}
                  highlight
                />
                {canAccess(['admin', 'manager']) && (
                  <SidebarItem
                    icon={Shield}
                    label="Roles & Matrix"
                    active={currentView === 'roles'}
                    onClick={() => setCurrentView('roles')}
                  />
                )}
                {canAccess(['admin', 'manager']) && (
                  <SidebarItem
                    icon={FileText}
                    label="Access Policies"
                    active={currentView === 'policies'}
                    onClick={() => setCurrentView('policies')}
                  />
                )}
              </nav>
            </div>

            {/* Asset Management */}
            <div>
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Asset Ownership & NFTs</div>
              <nav className="space-y-1">
                <SidebarItem
                  icon={HardDrive}
                  label="All Assets & Twins"
                  active={currentView === 'assets'}
                  onClick={() => setCurrentView('assets')}
                />
                <SidebarItem
                  icon={ArrowRightLeft}
                  label="Asset Transfers"
                  active={currentView === 'transfers'}
                  onClick={() => setCurrentView('transfers')}
                />
                <SidebarItem
                  icon={QrCode}
                  label="QR Verification"
                  active={currentView === 'verify-asset'}
                  onClick={() => setCurrentView('verify-asset')}
                />
              </nav>
            </div>

            {/* Blockchain & Audit */}
            <div>
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Trust & Auditability</div>
              <nav className="space-y-1">
                <SidebarItem
                  icon={Database}
                  label="Blockchain Ledger"
                  active={currentView === 'blockchain'}
                  onClick={() => setCurrentView('blockchain')}
                />
                <SidebarItem
                  icon={Layers}
                  label="Immutable Audit Trail"
                  active={currentView === 'audit-trail'}
                  onClick={() => setCurrentView('audit-trail')}
                />
                <SidebarItem
                  icon={ShieldAlert}
                  label="AI Risk Engine"
                  active={currentView === 'security-risk'}
                  onClick={() => setCurrentView('security-risk')}
                />
              </nav>
            </div>

          </div>

          {/* Bottom Sidebar Controls */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={() => setCurrentView('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'settings'
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Platform Settings</span>
            </button>
            <div className="p-3 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl border border-cyan-800/30 text-left">
              <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero Trust Status</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">All requests cryptographic-signed & verified via DID smart contracts.</p>
            </div>
          </div>
        </aside>

        {/* Main Content Workspace View */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
          
          {/* VIEW 1: DASHBOARD */}
          {}
          {currentView === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Welcome Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
                <div className="space-y-1 z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full font-mono font-medium border border-cyan-500/30">
                      ACTIVE SESSION: {activeUser.role.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400">Node #BEL-INDIA-01</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Good morning, {activeUser.name}</h2>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                    Here is your real-time decentralized security status, asset allocation, and blockchain verification breakdown.
                  </p>
                </div>
                <div className="flex items-center gap-3 z-10 shrink-0">
                  <button
                    onClick={() => setIsQRModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan Asset QR</span>
                  </button>
                  <button
                    onClick={() => setIsRegisterAssetOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                  >
                    <HardDrive className="w-4 h-4" />
                    <span>Mint Asset Twin</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Total Identity DIDs"
                  value="1,248"
                  subtitle="+8 created this week"
                  icon={Key}
                  color="cyan"
                />
                <KpiCard
                  title="Registered Assets (NFTs)"
                  value={assetsList.length.toString()}
                  subtitle="100% Cryptographically Verified"
                  icon={HardDrive}
                  color="blue"
                />
                <KpiCard
                  title="Pending Access Requests"
                  value="3"
                  subtitle="Requires Manager Approval"
                  icon={Lock}
                  color="amber"
                />
                <KpiCard
                  title="Active Risk Score"
                  value="18 / 100"
                  subtitle="Low Threat Index (AI Engine)"
                  icon={ShieldAlert}
                  color="emerald"
                />
              </div>

              {/* Main Security Health & Activity Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Security Health Score Dial Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-600" />
                        Platform Security Score
                      </h3>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                        Healthy
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center my-4 py-2">
                      <div className="relative flex items-center justify-center">
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle cx="80" cy="80" r="65" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" fill="transparent" />
                          <circle cx="80" cy="80" r="65" stroke="currentColor" strokeWidth="12" className="text-cyan-500" fill="transparent" strokeDasharray="408" strokeDashoffset="32" strokeLinecap="round" />
                        </svg>
                        <div className="absolute text-center">
                          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">92</div>
                          <div className="text-[10px] text-slate-400 uppercase font-mono">Out of 100</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Identity Security:</span>
                        <span className="font-semibold text-emerald-600">100% Verified</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Access Control Matrix:</span>
                        <span className="font-semibold text-emerald-600">Strict RBAC</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Blockchain Sync:</span>
                        <span className="font-semibold text-cyan-600">Synced (Block 18294021)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('audit-trail')}
                    className="w-full mt-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all"
                  >
                    View Comprehensive Security Audit
                  </button>
                </div>

                {/* AI Risk Trend Chart Card */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-600" />
                          24-Hour AI Risk Anomaly Index
                        </h3>
                        <p className="text-xs text-slate-500">Continuous context evaluation across all access attempts</p>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">Live Stream</span>
                    </div>

                    <div className="h-52 w-full pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={RISK_TREND_DATA}>
                          <defs>
                            <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0891b2" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                          <Area type="monotone" dataKey="risk" stroke="#0891b2" strokeWidth={2} fillOpacity={1} fill="url(#riskGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">Low Threat Floor</div>
                      <div className="text-xs font-bold text-emerald-600">12%</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">Peak Anomaly</div>
                      <div className="text-xs font-bold text-amber-600">42% (08:00)</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">Policy Trigger</div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Risk &gt; 50</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Recent Activity Timeline & Asset Quick List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Blockchain Activity Timeline */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyan-600" />
                      Recent Blockchain Ledger Events
                    </h3>
                    <button
                      onClick={() => setCurrentView('blockchain')}
                      className="text-xs text-cyan-600 hover:underline font-medium"
                    >
                      View All Ledger
                    </button>
                  </div>

                  <div className="space-y-4">
                    {txList.slice(0, 4).map((tx, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedTx(tx)}
                        className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 rounded-lg">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{tx.type}</div>
                            <div className="text-[11px] text-slate-500 font-mono">Tx: {tx.hash}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                            {tx.status}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">{tx.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Managed Assets Overview */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-cyan-600" />
                      Digital Twin Assets
                    </h3>
                    <button
                      onClick={() => setCurrentView('assets')}
                      className="text-xs text-cyan-600 hover:underline font-medium"
                    >
                      Manage Assets
                    </button>
                  </div>

                  <div className="space-y-3">
                    {assetsList.slice(0, 4).map((asset) => (
                      <div key={asset.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg">
                            <HardDrive className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{asset.name}</div>
                            <div className="text-[11px] text-slate-500">Owner: {asset.owner} • {asset.location}</div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-cyan-900/20 text-cyan-400 border border-cyan-800/40 px-2 py-0.5 rounded font-mono">
                          {asset.nftId}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* VIEW 2: MY IDENTITY & DID */}
          {}
          {currentView === 'my-identity' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Decentralized Identity (DID) Profile</h2>
                  <p className="text-xs text-slate-500">Self-Sovereign Identity proof stored on-chain for {activeUser.name}</p>
                </div>
                <button
                  onClick={() => showToast("Cryptographic Identity Proof Downloaded (.json)")}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-white text-xs font-semibold rounded-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Identity Proof</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Identity Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-4">
                  <img src={activeUser.avatar} alt={activeUser.name} className="w-24 h-24 rounded-full ring-4 ring-cyan-500/30 object-cover shadow-lg" />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{activeUser.name}</h3>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">{activeUser.roleBadge}</p>
                    <p className="text-xs text-slate-400 mt-1">{activeUser.dept}</p>
                  </div>
                  <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="inline-block bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full font-semibold">
                      ✓ DID Verified Active
                    </span>
                  </div>
                </div>

                {/* Technical DID Breakdown */}
                <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <Key className="w-4 h-4 text-cyan-600" />
                    Cryptographic DID Document Attributes
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                      <div className="text-slate-400 font-mono text-[10px]">W3C DECENTRALIZED IDENTIFIER (DID)</div>
                      <div className="flex items-center justify-between font-mono font-bold text-slate-900 dark:text-cyan-300">
                        <span>{activeUser.did}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(activeUser.did);
                            showToast("DID copied to clipboard!");
                          }}
                          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                      <div className="text-slate-400 font-mono text-[10px]">ASSOCIATED WALLET PUBLIC KEY</div>
                      <div className="flex items-center justify-between font-mono font-bold text-slate-900 dark:text-slate-200">
                        <span>{activeUser.wallet}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(activeUser.wallet);
                            showToast("Wallet address copied!");
                          }}
                          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                        <div className="text-slate-400 text-[10px]">SECURITY CLEARANCE</div>
                        <div className="font-bold text-slate-900 dark:text-white mt-1">{activeUser.clearance}</div>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                        <div className="text-slate-400 text-[10px]">ORGANIZATION REALM</div>
                        <div className="font-bold text-slate-900 dark:text-white mt-1">{DEMO_ORGANIZATION}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-cyan-900/10 border border-cyan-800/30 rounded-xl text-xs text-cyan-300 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Self-Sovereign Guarantee:</span>
                      <p className="text-slate-400 text-[11px] mt-0.5">Your private key remains securely inside your hardware wallet. All authentication requests are completed by signing cryptographic challenges off-chain.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 3: VERIFIABLE CREDENTIALS */}
          {}
          {currentView === 'credentials' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Verifiable Credentials (VCs)</h2>
                  <p className="text-xs text-slate-500">Signed cryptographic credentials issued by BEL Authority</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* VC Card 1 */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="p-2 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 rounded-xl">
                      <UserCheck className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                      ✓ Valid Credential
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">BEL Employee Credential</h3>
                    <p className="text-xs text-slate-400">Issued by: BEL Central Identity Admin</p>
                  </div>
                  <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Holder:</span>
                      <span className="font-medium">{activeUser.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Department:</span>
                      <span className="font-medium">{activeUser.dept}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expiry:</span>
                      <span className="font-mono">2028-12-31</span>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Presenting Credential to Security Gate... Signature Verified!")}
                    className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
                  >
                    Present Credential Proof
                  </button>
                </div>

                {/* VC Card 2 */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-xl">
                      <Shield className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                      ✓ Level 3 Active
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Security Clearance L3 Pass</h3>
                    <p className="text-xs text-slate-400">Issued by: Defense Security Board</p>
                  </div>
                  <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Clearance Level:</span>
                      <span className="font-medium text-blue-600">{activeUser.clearance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Biometric Proof:</span>
                      <span className="font-mono text-emerald-600">Enrolled (On-Chain)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Clearance level cryptographically verified with Zero-Knowledge Proof.")}
                    className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all"
                  >
                    Verify ZK-Proof
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 4: USERS DIRECTORY */}
          {}
          {currentView === 'users' && canAccess(['admin', 'manager']) && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Organization Users & DIDs</h2>
                  <p className="text-xs text-slate-500">Manage directory users, DIDs, and assigned credentials</p>
                </div>
                <button
                  onClick={() => setIsAddUserOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register New Identity</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-b border-slate-200 dark:border-slate-800 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">DID Hash</th>
                        <th className="p-4">Department</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {Object.keys(DEMO_PERSONAS).map((key) => {
                        const persona = DEMO_PERSONAS[key];
                        return (
                          <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                            <td className="p-4 flex items-center gap-3">
                              <img src={persona.avatar} alt={persona.name} className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white">{persona.name}</div>
                                <div className="text-[10px] text-slate-400">{persona.roleBadge}</div>
                              </div>
                            </td>
                            <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">{persona.did.slice(0, 16)}...</td>
                            <td className="p-4 text-slate-600 dark:text-slate-300">{persona.dept}</td>
                            <td className="p-4 font-semibold uppercase">{persona.role}</td>
                            <td className="p-4">
                              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                Active
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => showToast(`Selected user ${persona.name}`)}
                                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded text-[11px] font-medium"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: ROLES & PERMISSION MATRIX */}
          {}
          {currentView === 'roles' && canAccess(['admin', 'manager']) && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Role-Based Access Control (RBAC) Matrix</h2>
                <p className="text-xs text-slate-500">Fine-grained capability configuration across enterprise roles</p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-b border-slate-200 dark:border-slate-800 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-4">Capability / Permission</th>
                      <th className="p-4 text-center">Admin</th>
                      <th className="p-4 text-center">Manager</th>
                      <th className="p-4 text-center">Auditor</th>
                      <th className="p-4 text-center">Standard User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[
                      { perm: "View Identity & Users Directory", admin: true, mgr: true, aud: true, usr: false },
                      { perm: "Issue Verifiable Credentials", admin: true, mgr: true, aud: false, usr: false },
                      { perm: "Mint NFT Asset Digital Twin", admin: true, mgr: true, aud: false, usr: false },
                      { perm: "Approve Asset Ownership Transfer", admin: true, mgr: true, aud: false, usr: false },
                      { perm: "Execute Emergency Break-Glass", admin: true, mgr: false, aud: false, usr: true },
                      { perm: "Inspect Immutable Audit Ledger", admin: true, mgr: true, aud: true, usr: false },
                      { perm: "Configure AI Risk Policies", admin: true, mgr: false, aud: false, usr: false },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{row.perm}</td>
                        <td className="p-4 text-center">{row.admin ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                        <td className="p-4 text-center">{row.mgr ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                        <td className="p-4 text-center">{row.aud ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                        <td className="p-4 text-center">{row.usr ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 6: ASSETS MANAGEMENT */}
          {}
          {currentView === 'assets' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Physical & Digital Twin Assets</h2>
                  <p className="text-xs text-slate-500">NFT-backed asset ownership and physical QR linking</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsQRModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-white text-xs font-semibold rounded-xl"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Verify QR Scanner</span>
                  </button>
                  <button
                    onClick={() => setIsRegisterAssetOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-xs"
                  >
                    <HardDrive className="w-4 h-4" />
                    <span>Register New Asset</span>
                  </button>
                </div>
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assetsList.map((asset) => (
                  <div key={asset.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="p-2 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 rounded-xl">
                        <HardDrive className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] bg-cyan-900/20 text-cyan-400 border border-cyan-800/40 px-2 py-0.5 rounded font-mono">
                        {asset.nftId}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">{asset.name}</h3>
                      <p className="text-xs text-slate-400">ID: {asset.id} • {asset.type}</p>
                    </div>

                    <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Current Owner:</span>
                        <span className="font-medium text-slate-900 dark:text-white">{asset.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Location:</span>
                        <span className="font-medium">{asset.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Sensitivity:</span>
                        <span className="font-semibold text-amber-500">{asset.sensitivity}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          setSelectedAssetForTransfer(asset);
                          showToast(`Initiated ownership transfer for ${asset.name}`);
                        }}
                        className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all"
                      >
                        Request Transfer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 7: DYNAMIC ACCESS EVALUATION & BREAK-GLASS */}
          {}
          {currentView === 'access-requests' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dynamic Zero-Trust Access Decision Engine</h2>
                <p className="text-xs text-slate-500">Real-time context evaluation based on DID + Verifiable Credential + AI Risk Index</p>
              </div>

              {/* Dynamic Access Simulator Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-600" />
                  Live Policy Decision Vector for {activeUser.name}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-400 text-[10px]">1. DID IDENTITY</span>
                    <div className="font-bold text-emerald-500 mt-1">✓ VERIFIED</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-400 text-[10px]">2. VC CREDENTIAL</span>
                    <div className="font-bold text-emerald-500 mt-1">✓ LEVEL 3 PASS</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-400 text-[10px]">3. CONTEXT RISK</span>
                    <div className="font-bold text-cyan-500 mt-1">18 (LOW THREAT)</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-400 text-[10px]">4. FINAL DECISION</span>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-1">🟢 ACCESS GRANTED</div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-emerald-300">Target Resource: Secure Datacenter Rack #14</div>
                      <div className="text-[11px] text-slate-400">Policy #POL-901 passed. Access token signed by smart contract.</div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Access Logged to Immutable Blockchain Ledger!")}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg"
                  >
                    Open Resource Gateway
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 8: EMERGENCY BREAK-GLASS */}
          {currentView === 'emergency-access' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-amber-900/40 via-rose-900/30 to-amber-900/40 p-6 rounded-2xl border border-amber-800/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Emergency Break-Glass Protocol</h2>
                    <p className="text-xs text-amber-200">Temporary elevated access override with mandatory high-priority audit trail logging</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  Executing break-glass access bypasses normal multi-level approval matrices during mission-critical emergencies. This action immediately alerts the Chief Security Officer and triggers automatic session revocation after the timer expires.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      setEmergencyActiveSeconds(1800); // 30 minutes
                      showToast("EMERGENCY BREAK-GLASS ACTIVATED! Session countdown started (30 mins).", "warning");
                    }}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Initiate 30-Min Emergency Access Bypasser</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 9: BLOCKCHAIN LEDGER */}
          {}
          {currentView === 'blockchain' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Blockchain Network & Smart Contract Ledger</h2>
                  <p className="text-xs text-slate-500">Live block explorer showing verifiable transaction proofs</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-800/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Network Status: Synchronized (Block #18294021)</span>
                </div>
              </div>

              {/* Transactions List */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-b border-slate-200 dark:border-slate-800 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-4">Tx Hash</th>
                      <th className="p-4">Event Type</th>
                      <th className="p-4">User DID</th>
                      <th className="p-4">Asset / Ref</th>
                      <th className="p-4">Block #</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {txList.map((tx, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setSelectedTx(tx)}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 cursor-pointer transition-all"
                      >
                        <td className="p-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">{tx.hash}</td>
                        <td className="p-4 font-semibold text-slate-900 dark:text-white">{tx.type}</td>
                        <td className="p-4 font-mono text-slate-500">{tx.user}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">{tx.asset}</td>
                        <td className="p-4 font-mono text-slate-400">{tx.block}</td>
                        <td className="p-4">
                          <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 10: IMMUTABLE AUDIT TRAIL */}
          {}
          {currentView === 'audit-trail' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Immutable Security Audit Trail</h2>
                  <p className="text-xs text-slate-500">Cryptographically verifiable log of all administrative & access events</p>
                </div>
                <button
                  onClick={() => showToast("Exported PDF Compliance Audit Report for Inspector")}
                  className="flex items-center gap-2 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Compliance PDF</span>
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-b border-slate-200 dark:border-slate-800 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-4">Timestamp</th>
                      <th className="p-4">Actor Name</th>
                      <th className="p-4">Action Code</th>
                      <th className="p-4">Target Resource</th>
                      <th className="p-4">Cryptographic Proof</th>
                      <th className="p-4">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="p-4 font-mono text-slate-500">{log.time}</td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">{log.actor}</td>
                        <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{log.action}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">{log.asset}</td>
                        <td className="p-4 font-mono text-slate-400">{log.hash}</td>
                        <td className="p-4">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            log.risk === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                            log.risk === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                            'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}>
                            {log.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 11: SETTINGS */}
          {currentView === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Settings & Smart Contract Addresses</h2>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">DID Registry Contract:</span>
                  <span className="font-mono text-cyan-600">0x8f2a99120a1bc391a0021</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Asset Twin NFT Contract:</span>
                  <span className="font-mono text-cyan-600">0x7a29f011928a011d3345</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Break-Glass Verifier Module:</span>
                  <span className="font-mono text-cyan-600">0x3c91a0012e84000192a0</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL 1: QR SCANNER SIMULATOR */}
      {}
      {isQRModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <QrCode className="w-5 h-5 text-cyan-400" />
                QR Physical Asset Scanner
              </h3>
              <button onClick={() => setIsQRModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-square bg-slate-950 rounded-xl border-2 border-dashed border-cyan-500/50 flex flex-col items-center justify-center p-6 text-center space-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
              <QrCode className="w-24 h-24 text-cyan-400 opacity-80" />
              <p className="text-xs text-slate-400 z-10">Align physical asset QR tag within frame</p>
            </div>

            <button
              onClick={() => {
                setIsQRModalOpen(false);
                showToast("VERIFIED! Dell Latitude Rugged #AST-1092 matched on-chain NFT #1092");
              }}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg"
            >
              Simulate Scan Complete
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: REGISTER NEW ASSET (MINT NFT) */}
      {isRegisterAssetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-cyan-400" />
                Mint Digital Twin NFT Asset
              </h3>
              <button onClick={() => setIsRegisterAssetOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newAsset = {
                  id: `AST-${Math.floor(1000 + Math.random() * 9000)}`,
                  name: form.assetName.value || "New Tactical Server",
                  type: form.category.value || "Physical Hardware",
                  owner: activeUser.name,
                  location: form.location.value || "Facility Alpha - Room 101",
                  nftId: `NFT-#${Math.floor(1000 + Math.random() * 9000)}`,
                  nftContract: "0x7a2...9f01",
                  sensitivity: "High",
                  status: "Active",
                  icon: "harddrive"
                };
                setAssetsList([newAsset, ...assetsList]);
                setIsRegisterAssetOpen(false);
                showToast(`Asset "${newAsset.name}" registered and NFT minted on-chain!`);
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="text-slate-400">Asset Name</label>
                <input name="assetName" defaultValue="Satellite Transceiver Hub" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-cyan-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Category</label>
                  <select name="category" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white">
                    <option>Physical Hardware</option>
                    <option>Server Component</option>
                    <option>Digital Access Key</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Facility Location</label>
                  <input name="location" defaultValue="Facility Beta - Depot 2" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                </div>
              </div>

              <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-[11px] text-cyan-300">
                Action will execute smart contract <span className="font-mono text-white">MintAssetTwin()</span> and generate physical QR verification token.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-lg"
              >
                Sign Transaction & Mint NFT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: TRANSACTION DETAILS */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                Blockchain Transaction Proof
              </h3>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <div className="text-slate-400 text-[10px]">TRANSACTION HASH</div>
                <div className="text-cyan-300 font-bold break-all">{selectedTx.hash}</div>
              </div>
              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <div className="text-slate-400 text-[10px]">EVENT TYPE</div>
                <div className="text-white font-bold">{selectedTx.type}</div>
              </div>
              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <div className="text-slate-400 text-[10px]">BLOCK NUMBER</div>
                <div className="text-slate-300">{selectedTx.block}</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: GLOBAL SEARCH COMMAND PALETTE */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-xl p-4 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 px-3 py-2 bg-slate-800 rounded-xl border border-slate-700">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                autoFocus
                placeholder="Search users, DIDs, asset IDs, transaction hashes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-white focus:outline-hidden"
              />
              <kbd className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-mono">ESC</kbd>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-[10px] text-slate-400 uppercase font-mono px-2">Quick Navigation</div>
              {[
                { label: "View Physical Assets", view: "assets" },
                { label: "Emergency Break-Glass Protocol", view: "emergency-access" },
                { label: "Verifiable Credentials", view: "credentials" },
                { label: "Immutable Audit Trail", view: "audit-trail" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentView(item.view);
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-left p-2.5 hover:bg-slate-800 rounded-xl text-slate-300 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick, badge, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
        active
          ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20 font-semibold'
          : highlight
          ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 font-semibold border border-amber-500/30'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      {badge && (
        <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </button>
  );
}

function KpiCard({ title, value, subtitle, icon: Icon, color }) {
  const colorMap = {
    cyan: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
      <div className="space-y-1">
        <div className="text-slate-500 dark:text-slate-400 text-xs font-medium">{title}</div>
        <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</div>
        <div className="text-[11px] text-slate-400">{subtitle}</div>
      </div>
      <div className={`p-3 rounded-xl border ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}