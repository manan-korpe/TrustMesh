"use client"
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Shield, Key, Users, Box, Activity, Settings, Bell, Search, Menu, 
  ChevronRight, CheckCircle2, AlertCircle, XCircle, Clock, Copy, 
  ExternalLink, LogOut, ChevronDown, Plus, Filter, ArrowRightLeft, 
  Smartphone, Laptop, Car, FileText, UserCircle, ShieldCheck, Wallet, Database,
  Fingerprint, FileDigit, HardDrive, Cpu, BadgeCheck, AlertTriangle
} from 'lucide-react';

// --- CONSTANTS & MOCK DATA GENERATION ---
const NAMES_POOL = ['Manan', 'Tushar', 'Arun', 'Pratiksha', 'Rithika', 'Vansh'];
const DEPTS = ['IT', 'Operations', 'Security', 'Finance', 'HR', 'Administration'];
const ROLES = ['Admin', 'Manager', 'Auditor', 'User'];

// Utility to generate deterministic but randomized looking data based on a seed
const generateHash = (length = 40) => '0x' + Array.from({length}, () => Math.floor(Math.random()*16).toString(16)).join('');
const generateDID = (wallet) => `did:ethr:sepolia:${wallet}`;

// Generate initial state randomly but ensuring necessary roles exist
const generateInitialData = () => {
  let availableNames = [...NAMES_POOL].sort(() => 0.5 - Math.random());
  
  const users = [
    { id: 'EMP-001', name: availableNames.pop(), dept: 'IT', role: 'Admin', status: 'Verified', wallet: generateHash(40), active: true },
    { id: 'EMP-002', name: availableNames.pop(), dept: 'Operations', role: 'Manager', status: 'Verified', wallet: generateHash(40), active: true },
    { id: 'EMP-003', name: availableNames.pop(), dept: 'Security', role: 'Auditor', status: 'Verified', wallet: generateHash(40), active: true },
    { id: 'EMP-004', name: availableNames.pop(), dept: 'Finance', role: 'User', status: 'Verified', wallet: generateHash(40), active: true },
    { id: 'EMP-005', name: availableNames.pop(), dept: 'HR', role: 'User', status: 'Pending', wallet: null, active: true },
    { id: 'EMP-006', name: availableNames.pop(), dept: 'Administration', role: 'User', status: 'Verified', wallet: generateHash(40), active: true },
  ].map(u => ({
    ...u,
    email: `${u.name.toLowerCase()}@TrustMesh.com`,
    did: u.wallet ? generateDID(u.wallet) : null,
    registeredAt: u.wallet ? new Date(Date.now() - Math.random() * 10000000000).toISOString() : null
  }));

  const categories = ['Laptop', 'Mobile', 'Security Token', 'Vehicle', 'Digital License', 'Office Equipment'];
  const assets = Array.from({ length: 12 }).map((_, i) => {
    const owner = Math.random() > 0.2 ? users[Math.floor(Math.random() * users.length)] : null;
    return {
      id: `AST-0${(i + 1).toString().padStart(2, '0')}`,
      name: `${categories[Math.floor(Math.random() * categories.length)]} ${Math.floor(Math.random() * 1000)}`,
      type: categories[Math.floor(Math.random() * categories.length)],
      ownerId: owner?.id || null,
      tokenId: `#10${i.toString().padStart(2, '0')}`,
      status: owner ? 'Assigned' : 'Unassigned',
      date: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
      metadataCid: `bafybeig${generateHash(10).substring(2)}`,
      txHash: generateHash(64)
    };
  });

  const auditLogs = [
    { id: 101, time: new Date(Date.now() - 86400000 * 2).toLocaleString(), actor: users[0].name, action: 'Platform Deployed', target: 'Smart Contracts', source: 'System', status: 'Success', hash: generateHash(64) },
    { id: 102, time: new Date(Date.now() - 86400000).toLocaleString(), actor: users[0].name, action: 'Identity Registered', target: users[1].name, source: 'Blockchain', status: 'Success', hash: generateHash(64) },
    { id: 103, time: new Date(Date.now() - 43200000).toLocaleString(), actor: users[0].name, action: 'Role Assigned', target: `${users[1].name} → Manager`, source: 'Blockchain', status: 'Success', hash: generateHash(64) },
    { id: 104, time: new Date(Date.now() - 20000000).toLocaleString(), actor: users[1].name, action: 'NFT Minted', target: assets[0].name, source: 'Blockchain', status: 'Success', hash: generateHash(64) },
    { id: 105, time: new Date(Date.now() - 10000000).toLocaleString(), actor: 'System', action: 'Unauthorized Attempt', target: 'Admin API', source: 'API', status: 'Blocked', hash: '—' },
  ];

  return { users, assets, auditLogs };
};

// --- UTILS & CORE UI ---
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Card = ({ children, className, noPadding = false }) => (
  <div className={cn("bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden",className )}>
    {noPadding ? children : <div className="p-6">{children}</div>}
  </div>
);

const Badge = ({ children, variant = 'neutral', className }) => {
  const variants = {
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-slate-50 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border inline-flex items-center", variants[variant] || variants.neutral, className)}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', className, isLoading, ...props }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm border border-transparent',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm border border-transparent',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    outline: 'bg-transparent text-blue-600 border border-blue-200 hover:bg-blue-50',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant], sizes[size], className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

const Loader2 = ({ className }) => (
  <svg className={cn("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const Input = ({ label, error, className, ...props }) => (
  <div className={cn("space-y-1.5", className)}>
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <input 
      className={cn(
        "flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm",
        error && "border-red-500 focus:ring-red-500"
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Select = ({ label, options, className, ...props }) => (
  <div className={cn("space-y-1.5", className)}>
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <select 
      className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
      {...props}
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 backdrop-blur-sm p-4">
      <div className={cn("relative w-full bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]", maxWidth)}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <AlertTriangle className="w-5 h-5 text-red-500" />,
    info: <AlertCircle className="w-5 h-5 text-blue-500" />
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white border border-slate-200 shadow-lg rounded-lg p-4 flex items-start space-x-3 max-w-sm">
        {icons[type]}
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-900">{message}</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle className="w-4 h-4"/></button>
      </div>
    </div>
  );
};

// --- LOGIN & AUTHENTICATION FLOW ---
const LoginPage = ({ onLoginSuccess, users }) => {
  const [step, setStep] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [error, setError] = useState(null);

  // Hardcode finding the Admin for demo login purposes, or a random verified user
  const demoUser = users.find(u => u.role === 'Admin' && u.status === 'Verified') || users[0];

  const handleConnect = () => {
    setStep(1); // Open wallet selector
  };

  const selectMetaMask = () => {
    setStep(2); // Connecting...
    setTimeout(() => {
      setSelectedWallet(demoUser.wallet);
      setStep(3); // Prompt connection confirm
    }, 1500);
  };

  const confirmConnection = () => {
    setStep(4); // Connected, checking identity
    setTimeout(() => {
      setStep(5); // Request signature
    }, 2000);
  };

  const signMessage = () => {
    setStep(6); // Verifying signature
    setTimeout(() => {
      setStep(7); // Success
      setTimeout(() => {
        onLoginSuccess(demoUser.id);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600 mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center border border-blue-200">
             <ShieldCheck className="w-10 h-10" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">TrustMesh</h2>
        <p className="mt-2 text-center text-sm text-slate-600">Enterprise Decentralized Identity Platform</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card noPadding className="shadow-xl shadow-slate-200/50 border-slate-200">
          <div className="p-8">
            {step === 0 && (
              <div className="text-center space-y-6">
                <h3 className="text-lg font-medium text-slate-900">Sign in securely</h3>
                <p className="text-sm text-slate-500">Use your registered organizational wallet to verify your identity.</p>
                <div className="pt-4">
                  <Button className="w-full py-3 text-base shadow-md" onClick={handleConnect}>
                    <Wallet className="w-5 h-5 mr-2" /> Connect Wallet
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 mt-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <Key className="w-4 h-4" />
                  <span>Your wallet acts as your cryptographic key. We never request your private key.</span>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900 text-center mb-6">Select Wallet Provider</h3>
                <button onClick={selectMetaMask} className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                   <div className="flex items-center">
                     <div className="w-8 h-8 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-4 group-hover:bg-orange-200">
                        <Box className="w-5 h-5" />
                     </div>
                     <span className="font-medium text-slate-900">MetaMask</span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
                <button disabled className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-xl opacity-50 cursor-not-allowed">
                   <div className="flex items-center">
                     <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-4">
                        <Smartphone className="w-5 h-5" />
                     </div>
                     <span className="font-medium text-slate-900">WalletConnect</span>
                   </div>
                </button>
                <Button variant="ghost" className="w-full mt-4" onClick={() => setStep(0)}>Cancel</Button>
              </div>
            )}

            {step === 2 && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                 <Loader2 className="w-10 h-10 text-blue-600" />
                 <p className="text-slate-600 font-medium animate-pulse">Connecting to MetaMask...</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                 <div className="text-center">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                     <CheckCircle2 className="w-8 h-8" />
                   </div>
                   <h3 className="text-lg font-medium text-slate-900">MetaMask Detected</h3>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                   <div className="flex justify-between text-slate-500 mb-1"><span>Account</span><span>Network</span></div>
                   <div className="flex justify-between font-medium text-slate-900">
                     <span className="font-mono">{selectedWallet.substring(0,6)}...{selectedWallet.substring(36)}</span>
                     <span>Sepolia</span>
                   </div>
                 </div>
                 <Button className="w-full" onClick={confirmConnection}>Connect to TrustMesh</Button>
              </div>
            )}

            {step === 4 && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                 <Search className="w-10 h-10 text-blue-600 animate-bounce" />
                 <p className="text-slate-600 font-medium">Checking registered identity...</p>
                 <p className="text-xs text-slate-400 font-mono">{selectedWallet}</p>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                 <div className="text-center">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                     <Fingerprint className="w-8 h-8" />
                   </div>
                   <h3 className="text-lg font-medium text-slate-900">Security Verification</h3>
                   <p className="text-sm text-slate-500 mt-2">Sign a one-time message to prove wallet ownership.</p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-600 break-all h-24 overflow-y-auto">
                   TrustMesh Login Verification<br/>
                   Nonce: {Math.floor(Math.random() * 1000000)}<br/>
                   Timestamp: {new Date().toISOString()}<br/>
                   Wallet: {selectedWallet}
                 </div>
                 <div className="flex space-x-3">
                   <Button variant="secondary" className="w-1/3" onClick={() => setStep(0)}>Reject</Button>
                   <Button className="w-2/3" onClick={signMessage}>Sign Message</Button>
                 </div>
              </div>
            )}

            {step === 6 && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                 <Loader2 className="w-10 h-10 text-blue-600" />
                 <p className="text-slate-600 font-medium">Verifying cryptographic signature...</p>
              </div>
            )}

            {step === 7 && (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900">Login Successful</h3>
                   <p className="text-sm text-slate-500 mt-1">Identity verified successfully.</p>
                 </div>
                 <div className="pt-4 flex flex-col space-y-2 text-sm text-left w-full">
                    <div className="flex items-center text-green-700 bg-green-50 p-2 rounded border border-green-100">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Wallet ownership confirmed
                    </div>
                    <div className="flex items-center text-green-700 bg-green-50 p-2 rounded border border-green-100">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Role loaded: {demoUser.role}
                    </div>
                 </div>
              </div>
            )}

          </div>
        </Card>
      </div>
    </div>
  );
};

// --- LAYOUT COMPONENTS ---
const Sidebar = ({ currentView, setCurrentView, userRole }) => {
  const menuItems = [
    { id: 'dashboard', icon: Activity, label: 'Overview', roles: ['Admin', 'Manager', 'Auditor', 'User'] },
    { id: 'identities', icon: Users, label: 'Identity Management', roles: ['Admin', 'Manager', 'Auditor'] },
    { id: 'roles', icon: Shield, label: 'Roles & Permissions', roles: ['Admin', 'Auditor'] },
    { id: 'assets', icon: Box, label: 'Asset Management', roles: ['Admin', 'Manager', 'Auditor'] },
    { id: 'audit', icon: FileText, label: 'Audit Logs', roles: ['Admin', 'Manager', 'Auditor'] },
    { id: 'blockchain', icon: Database, label: 'Blockchain Activity', roles: ['Admin', 'Auditor'] },
    { id: 'my-identity', icon: UserCircle, label: 'My Identity', roles: ['User', 'Manager', 'Admin', 'Auditor'] },
    { id: 'my-assets', icon: Laptop, label: 'My Assets', roles: ['User', 'Manager', 'Admin', 'Auditor'] },
    { id: 'settings', icon: Settings, label: 'Settings', roles: ['Admin', 'Manager', 'Auditor', 'User'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 z-20 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <ShieldCheck className="w-6 h-6 text-blue-500 mr-2" />
        <span className="text-white font-bold tracking-wide text-lg">TrustMesh</span>
      </div>
      <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
        <div className="px-4 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</div>
        <nav className="space-y-1 px-3">
          {filteredMenu.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                    : "hover:bg-slate-800 hover:text-white border border-transparent"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-blue-500" : "text-slate-400")} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Network</span>
            <span className="text-slate-300 font-medium">Sepolia Testnet</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">RPC Status</span>
            <span className="flex items-center text-green-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
              Healthy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topbar = ({ currentUser, setDemoRole, users, onLogout }) => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
    <div className="flex items-center text-sm">
      <div className="relative hidden md:block">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search identities, assets, tx..." 
          className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-64 transition-all"
        />
      </div>
    </div>
    
    <div className="flex items-center space-x-4">
      {/* DEMO MODE SWITCHER */}
      <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Demo Role:</span>
        <select 
          className="bg-transparent text-sm font-semibold text-amber-900 focus:outline-none cursor-pointer"
          value={currentUser.id}
          onChange={(e) => setDemoRole(e.target.value)}
        >
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.role} — {u.name}</option>
          ))}
        </select>
      </div>

      <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

      <div className="flex items-center space-x-3 text-slate-600">
        <button className="p-2 hover:bg-slate-100 rounded-full relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        
        <div className="hidden sm:flex items-center space-x-3 bg-slate-50 py-1 px-2 rounded-full border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors" onClick={onLogout}>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
            {currentUser.name.charAt(0)}
          </div>
          <div className="text-left pr-2">
            <div className="text-sm font-semibold text-slate-900 leading-tight">{currentUser.name}</div>
            <div className="text-xs text-slate-500 font-mono leading-tight">{currentUser.wallet ? `${currentUser.wallet.substring(0,6)}...` : 'No Wallet'}</div>
          </div>
          <LogOut className="w-4 h-4 text-slate-400 mr-1" />
        </div>
      </div>
    </div>
  </header>
);

// --- VIEWS ---

const DashboardOverview = ({ users, assets, auditLogs, role, currentUser }) => {
  const verifiedCount = users.filter(u => u.status === 'Verified').length;
  
  if (role === 'User') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {currentUser.name}</h1>
            <p className="text-slate-500 mt-1">Manage your identity and assigned organizational assets.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card noPadding>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center text-slate-600 font-medium"><ShieldCheck className="w-5 h-5 mr-2 text-green-500"/> Identity Status</div>
              <Badge variant={currentUser.status === 'Verified' ? 'success' : 'warning'}>{currentUser.status}</Badge>
            </div>
            <div className="p-6 bg-slate-50">
              <div className="text-xs text-slate-500 mb-1">Decentralized ID</div>
              <div className="font-mono text-sm text-slate-900 break-all">{currentUser.did || 'Not Generated'}</div>
            </div>
          </Card>
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-slate-600 font-medium mb-4"><Key className="w-5 h-5 mr-2 text-blue-500"/> Organizational Role</div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{currentUser.role}</div>
            </div>
            <div className="text-sm text-slate-500 flex items-center mt-4">
              <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Standard permissions active
            </div>
          </Card>
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-slate-600 font-medium mb-4"><Box className="w-5 h-5 mr-2 text-purple-500"/> Assigned Assets</div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{assets.filter(a => a.ownerId === currentUser.id).length}</div>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">View My Assets</Button>
          </Card>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-4">My Recent Activity</h2>
        <Card noPadding>
          <div className="divide-y divide-slate-100">
            {auditLogs.filter(l => l.actor === currentUser.name || l.target.includes(currentUser.name)).slice(0,3).map((log, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{log.action}</p>
                    <p className="text-xs text-slate-500">{log.target}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={log.status === 'Success' ? 'success' : 'danger'}>{log.status}</Badge>
                  <p className="text-xs text-slate-400 mt-1">{log.time.split(',')[0]}</p>
                </div>
              </div>
            ))}
            {auditLogs.filter(l => l.actor === currentUser.name || l.target.includes(currentUser.name)).length === 0 && (
              <div className="p-8 text-center text-slate-500 text-sm">No recent activity found.</div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // ADMIN / MANAGER / AUDITOR VIEW
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Organization Overview</h1>
          <p className="text-slate-500 mt-1">Real-time status of identities, roles, and assets.</p>
        </div>
        {/* <div className="flex space-x-2">
          <Button variant="outline" size="sm"><ExternalLink className="w-4 h-4 mr-2" /> View Explorer</Button>
          {role === 'Admin' && <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add User</Button>}
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm font-medium">Total Employees</div>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl font-bold text-slate-900">{users.length}</div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded">
            <CheckCircle2 className="w-4 h-4 mr-1" /> {verifiedCount} Verified
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm font-medium">Pending Verification</div>
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl font-bold text-slate-900">{users.length - verifiedCount}</div>
          </div>
          <div className="mt-2 text-sm text-slate-500">Require wallet connection</div>
        </Card>
        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm font-medium">Active NFT Assets</div>
            <Box className="w-5 h-5 text-purple-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl font-bold text-slate-900">{assets.length}</div>
          </div>
          <div className="mt-2 text-sm text-slate-500">Represented on-chain</div>
        </Card>
        <Card className="p-5 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm font-medium">Security Events (24h)</div>
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl font-bold text-slate-900">{auditLogs.filter(l => l.status !== 'Success').length || 1}</div>
          </div>
          <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 w-fit px-2 py-0.5 rounded">
            <XCircle className="w-4 h-4 mr-1" /> 1 Blocked Attempt
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Audit Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4 flex-1">
            {auditLogs.slice(0,5).map(log => (
              <div key={log.id} className="flex items-start p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100 group">
                <div className={cn("p-2 rounded-full mr-4 shrink-0", log.status === 'Success' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                  {log.status === 'Success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      <span className="font-semibold text-blue-700">{log.actor}</span> {log.action}
                    </p>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{log.time.split(',')[0]}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5 truncate">Target: {log.target}</p>
                  <div className="flex items-center mt-2 space-x-3">
                    <Badge variant={log.source === 'Blockchain' ? 'primary' : 'neutral'} className="text-[10px]">{log.source}</Badge>
                    <span className="text-xs text-slate-400 font-mono truncate">{log.hash !== '—' ? log.hash : ''}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Role Distribution</h2>
            <div className="space-y-5">
              {ROLES.map(r => {
                const count = users.filter(u => u.role === r).length;
                const percentage = (count / users.length) * 100;
                const colors = { Admin: 'bg-purple-500', Manager: 'bg-blue-500', Auditor: 'bg-amber-500', User: 'bg-slate-500' };
                return (
                  <div key={r}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700 flex items-center">
                        <span className={cn("w-2 h-2 rounded-full mr-2", colors[r])}></span>
                        {r}
                      </span>
                      <span className="text-slate-500 font-medium">{count} users</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-1000", colors[r])} style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-20"><Database className="w-24 h-24" /></div>
             <div className="relative z-10">
               <h2 className="text-lg font-semibold mb-2">Smart Contracts</h2>
               <div className="space-y-3 mt-4">
                 <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                   <span className="text-blue-100">Identity Registry</span>
                   <Badge variant="success" className="bg-green-500/20 text-green-100 border-transparent">Active</Badge>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                   <span className="text-blue-100">RBAC Manager</span>
                   <Badge variant="success" className="bg-green-500/20 text-green-100 border-transparent">Active</Badge>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-blue-100">Asset NFT (ERC-721)</span>
                   <Badge variant="success" className="bg-green-500/20 text-green-100 border-transparent">Active</Badge>
                 </div>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const IdentityManagement = ({ users, role, setUsers, addLog, notify }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isVerifying, setIsVerifying] = useState(null); // User ID
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEmployee = {
      id: formData.get('empId'),
      name: formData.get('name'),
      email: formData.get('email'),
      dept: formData.get('dept'),
      role: 'User', // Default
      status: 'Pending',
      wallet: null,
      did: null,
      active: true
    };
    
    setUsers(prev => [newEmployee, ...prev]);
    setIsAdding(false);
    notify(`Employee invitation created for ${newEmployee.name}`);
    addLog('Employee Created', `${newEmployee.name} (${newEmployee.id})`, 'System', 'Success');
  };

  const handleSimulateVerification = (user) => {
    setIsVerifying(user.id);
    setTimeout(() => {
      const newWallet = generateHash(40);
      setUsers(prev => prev.map(u => u.id === user.id ? {
        ...u, 
        status: 'Verified', 
        wallet: newWallet, 
        did: generateDID(newWallet),
        registeredAt: new Date().toISOString()
      } : u));
      setIsVerifying(null);
      notify(`Identity verified for ${user.name}`);
      addLog('Identity Registered', user.name, 'Blockchain', 'Success', generateHash(64));
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Identity Management</h1>
          <p className="text-slate-500 mt-1">Manage organizational identities and verification status.</p>
        </div>
        {(role === 'Admin' || role === 'Manager') && (
          <Button onClick={() => setIsAdding(true)}><Plus className="w-4 h-4 mr-2" /> Add Employee</Button>
        )}
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search identities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
            />
          </div>
          <div className="flex space-x-2">
            <Select options={[{label:'All Departments', value:''}, ...DEPTS.map(d=>({label:d,value:d}))]} className="w-40" />
            <Select options={[{label:'All Status', value:''}, {label:'Verified', value:'Verified'}, {label:'Pending', value:'Pending'}]} className="w-36" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">ID & Dept</th>
                <th className="px-6 py-4 font-semibold">Decentralized ID</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs mr-3">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{u.name}</div>
                        <div className="text-slate-500 text-xs">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-700">{u.id}</div>
                    <div className="text-slate-500 text-xs">{u.dept}</div>
                  </td>
                  <td className="px-6 py-4">
                    {u.did ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                          {u.did.substring(0,22)}...
                        </span>
                        <button className="text-slate-400 hover:text-blue-600"><Copy className="w-3 h-3"/></button>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-xs">Not generated</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={u.role === 'Admin' ? 'purple' : u.role === 'Manager' ? 'primary' : u.role === 'Auditor' ? 'warning' : 'neutral'}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={u.status === 'Verified' ? 'success' : 'warning'}>
                      {u.status === 'Verified' ? <CheckCircle2 className="w-3 h-3 mr-1"/> : <AlertCircle className="w-3 h-3 mr-1"/>}
                      {u.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {u.status === 'Pending' && role === 'Admin' ? (
                      <Button size="sm" variant="outline" isLoading={isVerifying === u.id} onClick={() => handleSimulateVerification(u)}>
                        Simulate Verify
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="text-blue-600">View</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Create Employee Invitation">
        <form onSubmit={handleCreateEmployee} className="space-y-4">
          <Input label="Full Name" name="name" placeholder="e.g. Jane Doe" required />
          <Input label="Email Address" name="email" type="email" placeholder="jane@TrustMesh.com" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Employee ID" name="empId" defaultValue={`EMP-00${users.length + 1}`} required />
            <Select label="Department" name="dept" options={DEPTS.map(d=>({label:d, value:d}))} required />
          </div>
          <div className="bg-blue-50 p-3 rounded-lg flex items-start border border-blue-100 mt-4 text-sm text-blue-800">
             <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
             <p>An invitation will be sent. The employee must connect their wallet to generate their Decentralized ID and verify their status.</p>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button type="submit">Create Invitation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const RolesManagement = ({ users, role, setUsers, currentUser, addLog, notify }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [processState, setProcessState] = useState(0); // 0: idle, 1: checking, 2: tx, 3: success, 4: denied

  const ROLE_DEFS = [
    { name: 'Admin', desc: 'Full organizational control', perms: ['Manage identities', 'Assign roles', 'Create/Transfer assets'] },
    { name: 'Manager', desc: 'Operational management', perms: ['Create authorized assets', 'Assign assets', 'View team assets'] },
    { name: 'Auditor', desc: 'Read-only compliance access', perms: ['View identities', 'View roles', 'View audit logs'] },
    { name: 'User', desc: 'Employee access', perms: ['View own identity', 'View own assets'] },
  ];

  const handleAssign = () => {
    setProcessState(1); // Checking
    
    setTimeout(() => {
      // RBAC SIMULATION
      if (currentUser.role !== 'Admin') {
        setProcessState(4); // Denied
        addLog('Role Assignment Attempt', `${selectedUser.name} → ${newRole}`, 'API', 'Blocked');
        setTimeout(() => {
           setProcessState(0);
           setSelectedUser(null);
           notify('Access Denied: Admin role required.', 'error');
        }, 2000);
        return;
      }

      setProcessState(2); // Submitting tx
      setTimeout(() => {
        setProcessState(3); // Success
        const txHash = generateHash(64);
        setUsers(prev => prev.map(u => u.id === selectedUser.id ? {...u, role: newRole} : u));
        addLog('Role Assigned', `${selectedUser.name} → ${newRole}`, 'Blockchain', 'Success', txHash);
        notify(`Role updated to ${newRole} for ${selectedUser.name}`);
        
        setTimeout(() => {
          setProcessState(0);
          setSelectedUser(null);
        }, 2000);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Roles & Permissions</h1>
        <p className="text-slate-500 mt-1">Blockchain-enforced Role-Based Access Control (RBAC).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {ROLE_DEFS.map(r => (
          <Card key={r.name} className="p-5 border-t-4 hover:shadow-md transition-shadow" style={{borderTopColor: r.name === 'Admin' ? '#8b5cf6' : r.name === 'Manager' ? '#3b82f6' : r.name === 'Auditor' ? '#f59e0b' : '#64748b'}}>
            <h3 className="font-bold text-slate-900 flex items-center mb-1 text-lg">
              {r.name} 
              {r.name === 'Admin' && <Shield className="w-4 h-4 ml-2 text-purple-500" />}
            </h3>
            <p className="text-xs text-slate-500 mb-4 h-8">{r.desc}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              {r.perms.map((p,i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="leading-tight text-xs">{p}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="font-semibold text-slate-900">Current Assignments</h2>
          {role !== 'Admin' && <Badge variant="warning"><AlertTriangle className="w-3 h-3 mr-1"/> Read-Only View</Badge>}
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold">Employee</th>
              <th className="px-6 py-4 font-semibold">Current Role</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{u.name}</div>
                  <div className="text-xs text-slate-500">{u.dept}</div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={u.role === 'Admin' ? 'purple' : u.role === 'Manager' ? 'primary' : u.role === 'Auditor' ? 'warning' : 'neutral'}>{u.role}</Badge>
                </td>
                <td className="px-6 py-4">
                  <span className={cn("text-xs flex items-center", u.status === 'Verified' ? "text-green-600" : "text-amber-600")}>
                    <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", u.status === 'Verified' ? "bg-green-500" : "bg-amber-500")}></span>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { setSelectedUser(u); setNewRole(u.role); }}
                    disabled={u.status !== 'Verified'}
                  >
                    Change Role
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={!!selectedUser} onClose={() => processState === 0 && setSelectedUser(null)} title="Assign Role">
        {processState === 0 && selectedUser && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-slate-900">{selectedUser.name}</div>
                <div className="text-xs text-slate-500">{selectedUser.id}</div>
              </div>
              <Badge>{selectedUser.role}</Badge>
            </div>
            <Select 
              label="Select New Role" 
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              options={ROLE_DEFS.map(r => ({label: r.name, value: r.name}))} 
            />
            <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-xs flex items-start border border-amber-200 mt-4">
              <AlertTriangle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
              <div>
                <strong>Blockchain Transaction Required</strong>
                <p className="mt-1">Role assignment invokes the `grantRole` function on the RBAC smart contract. Gas fees apply.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="ghost" onClick={() => setSelectedUser(null)}>Cancel</Button>
              <Button onClick={handleAssign} disabled={newRole === selectedUser.role}>Confirm Assignment</Button>
            </div>
          </div>
        )}
        
        {processState > 0 && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
            {processState === 1 && (
              <>
                <Loader2 className="w-10 h-10 text-blue-600" />
                <p className="font-medium text-slate-900">Checking RBAC Permissions...</p>
                <p className="text-xs text-slate-500">Verifying {currentUser.role} privileges</p>
              </>
            )}
            {processState === 2 && (
              <>
                <Database className="w-10 h-10 text-purple-600 animate-pulse" />
                <p className="font-medium text-slate-900">Submitting to Blockchain...</p>
                <p className="text-xs text-slate-500 font-mono">Waiting for block confirmation</p>
              </>
            )}
            {processState === 3 && (
              <>
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Role Granted</h3>
                <p className="text-sm text-slate-500">Transaction confirmed successfully.</p>
              </>
            )}
            {processState === 4 && (
              <>
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Access Denied</h3>
                <p className="text-sm text-slate-500">Your current role ({currentUser.role}) does not have permission to grant roles.</p>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

const AssetManagement = ({ assets, users, role, setAssets, currentUser, addLog, notify }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isTransferring, setIsTransferring] = useState(null);
  const [mintState, setMintState] = useState(0); // 0: form, 1: ipfs, 2: minting, 3: success
  const [transferState, setTransferState] = useState(0);

  const handleCreateAsset = (e) => {
    e.preventDefault();
    if(role !== 'Admin' && role !== 'Manager') {
       notify('Permission denied to create assets.', 'error');
       return;
    }

    const formData = new FormData(e.target);
    setMintState(1); // Uploading IPFS
    
    setTimeout(() => {
      setMintState(2); // Minting
      setTimeout(() => {
        const newAsset = {
          id: formData.get('assetId'),
          name: formData.get('name'),
          type: formData.get('category'),
          ownerId: formData.get('owner'),
          tokenId: `#10${Math.floor(Math.random()*1000)}`,
          status: formData.get('owner') ? 'Assigned' : 'Unassigned',
          date: new Date().toISOString(),
          metadataCid: `bafybeig${generateHash(10).substring(2)}`,
          txHash: generateHash(64)
        };
        
        setAssets(prev => [newAsset, ...prev]);
        addLog('NFT Minted', newAsset.name, 'Blockchain', 'Success', newAsset.txHash);
        if(newAsset.ownerId) {
           const ownerName = users.find(u=>u.id===newAsset.ownerId)?.name;
           addLog('Asset Assigned', `${newAsset.name} to ${ownerName}`, 'Blockchain', 'Success');
        }
        setMintState(3); // Success
      }, 2000);
    }, 1500);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    const newOwnerId = new FormData(e.target).get('newOwner');
    if(!newOwnerId) return;

    setTransferState(1); // Processing
    setTimeout(() => {
       const txHash = generateHash(64);
       setAssets(prev => prev.map(a => a.id === isTransferring.id ? {...a, ownerId: newOwnerId, status: 'Assigned', txHash} : a));
       
       const prevOwner = users.find(u=>u.id===isTransferring.ownerId)?.name || 'None';
       const newOwner = users.find(u=>u.id===newOwnerId)?.name;
       
       addLog('Asset Transferred', `${isTransferring.name} (${prevOwner} → ${newOwner})`, 'Blockchain', 'Success', txHash);
       notify('Asset transferred successfully');
       setTransferState(2); // Success
       setTimeout(() => {
         setIsTransferring(null);
         setTransferState(0);
       }, 1500);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Asset Management</h1>
          <p className="text-slate-500 mt-1">Verifiable digital representation of company assets as NFTs.</p>
        </div>
        {(role === 'Admin' || role === 'Manager') && (
          <Button onClick={() => {setIsCreating(true); setMintState(0);}}><Box className="w-4 h-4 mr-2" /> Mint New Asset</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="p-5 flex items-center justify-between border-l-4 border-l-slate-400">
           <div><div className="text-sm text-slate-500 font-medium">Total Assets</div><div className="text-2xl font-bold mt-1 text-slate-900">{assets.length}</div></div>
           <HardDrive className="w-8 h-8 text-slate-300" />
         </Card>
         <Card className="p-5 flex items-center justify-between border-l-4 border-l-purple-500">
           <div><div className="text-sm text-slate-500 font-medium">NFTs Minted</div><div className="text-2xl font-bold mt-1 text-slate-900">{assets.length}</div></div>
           <Box className="w-8 h-8 text-purple-200" />
         </Card>
         <Card className="p-5 flex items-center justify-between border-l-4 border-l-green-500">
           <div><div className="text-sm text-slate-500 font-medium">Assigned to Staff</div><div className="text-2xl font-bold mt-1 text-slate-900">{assets.filter(a => a.status === 'Assigned').length}</div></div>
           <CheckCircle2 className="w-8 h-8 text-green-200" />
         </Card>
      </div>

      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Asset Details</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Current Owner</th>
                <th className="px-6 py-4 font-semibold">Token ID</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assets.map(a => {
                const owner = users.find(u => u.id === a.ownerId);
                return (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3 border border-slate-200">
                          {a.type.includes('Laptop') ? <Laptop className="w-5 h-5 text-slate-500"/> : 
                           a.type.includes('Mobile') ? <Smartphone className="w-5 h-5 text-slate-500"/> :
                           a.type.includes('Vehicle') ? <Car className="w-5 h-5 text-slate-500"/> :
                           <Cpu className="w-5 h-5 text-slate-500"/>}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{a.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{a.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{a.type}</td>
                    <td className="px-6 py-4">
                      {owner ? (
                         <div className="flex items-center">
                           <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mr-2">{owner.name.charAt(0)}</div>
                           <span className="text-slate-900 font-medium">{owner.name}</span>
                         </div>
                      ) : (
                        <Badge variant="neutral">Unassigned</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded w-fit border border-purple-100">{a.tokenId}</span>
                        <span className="text-[10px] text-slate-400 mt-1 flex items-center"><ExternalLink className="w-3 h-3 mr-1"/> View Tx</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {(role === 'Admin' || role === 'Manager') ? (
                        <Button variant="outline" size="sm" onClick={() => setIsTransferring(a)}>Transfer</Button>
                      ) : (
                        <Button variant="ghost" size="sm">Details</Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CREATE ASSET MODAL */}
      <Modal isOpen={isCreating} onClose={() => mintState === 0 && setIsCreating(false)} title="Mint Digital Asset NFT">
        {mintState === 0 && (
          <form onSubmit={handleCreateAsset} className="space-y-4">
            <Input label="Asset Name" name="name" placeholder="e.g. MacBook Pro M3" required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Asset ID" name="assetId" defaultValue={`AST-${Math.floor(Math.random()*1000)}`} required />
              <Select label="Category" name="category" options={[
                {label:'Laptop', value:'Laptop'}, {label:'Mobile', value:'Mobile'}, 
                {label:'Vehicle', value:'Vehicle'}, {label:'License', value:'Digital License'}
              ]} required />
            </div>
            <Select label="Initial Assignee (Optional)" name="owner" options={[
              {label: '-- Unassigned --', value: ''},
              ...users.filter(u=>u.status==='Verified').map(u=>({label: `${u.name} (${u.dept})`, value: u.id}))
            ]} />
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
              <h4 className="text-xs font-semibold text-slate-700 uppercase mb-2 flex items-center"><Database className="w-4 h-4 mr-1"/> On-Chain Operations</h4>
              <ul className="text-xs text-slate-600 space-y-1 ml-5 list-disc">
                <li>Metadata uploaded to IPFS.</li>
                <li>ERC-721 Token minted on Sepolia.</li>
                <li>Ownership recorded on ledger.</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button type="submit">Create & Mint NFT</Button>
            </div>
          </form>
        )}

        {mintState > 0 && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-5 min-h-[300px]">
             {mintState === 1 && (
               <>
                 <div className="relative">
                   <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                   <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                   <FileDigit className="w-6 h-6 text-blue-600 absolute top-5 left-5" />
                 </div>
                 <div>
                   <p className="font-bold text-slate-900">Uploading Metadata to IPFS...</p>
                   <p className="text-xs text-slate-500 mt-1">Generating decentralized content identifier</p>
                 </div>
               </>
             )}
             {mintState === 2 && (
               <>
                 <Database className="w-16 h-16 text-purple-600 animate-pulse" />
                 <div>
                   <p className="font-bold text-slate-900">Minting NFT on Blockchain...</p>
                   <p className="text-xs text-slate-500 mt-1 font-mono">CID: bafybeig... Generated</p>
                 </div>
               </>
             )}
             {mintState === 3 && (
               <>
                 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <BadgeCheck className="w-10 h-10 text-green-500" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900">Asset Minted Successfully</h3>
                   <div className="bg-slate-50 p-3 rounded text-left text-xs font-mono text-slate-600 mt-4 border border-slate-200 space-y-2">
                     <div>Token ID: <span className="text-purple-600 font-bold">#10{Math.floor(Math.random()*100)}</span></div>
                     <div className="truncate">Tx: 0x8f3...a12b</div>
                   </div>
                 </div>
                 <Button onClick={() => setIsCreating(false)} className="w-full mt-4">Done</Button>
               </>
             )}
          </div>
        )}
      </Modal>

      {/* TRANSFER MODAL */}
      <Modal isOpen={!!isTransferring} onClose={() => transferState === 0 && setIsTransferring(null)} title="Transfer Asset Ownership">
        {isTransferring && transferState === 0 && (
          <form onSubmit={handleTransfer} className="space-y-4">
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center mb-4">
               <div className="w-12 h-12 bg-white rounded shadow-sm border border-slate-200 flex items-center justify-center mr-4">
                 <Box className="w-6 h-6 text-slate-400" />
               </div>
               <div>
                 <div className="font-bold text-slate-900">{isTransferring.name}</div>
                 <div className="text-xs text-slate-500">Token ID: {isTransferring.tokenId}</div>
               </div>
             </div>
             
             <div className="space-y-1">
               <label className="block text-sm font-medium text-slate-700">Current Owner</label>
               <div className="px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-600 border border-slate-200">
                 {users.find(u=>u.id===isTransferring.ownerId)?.name || 'Unassigned'}
               </div>
             </div>

             <Select label="New Owner" name="newOwner" required options={[
               {label: '-- Select Employee --', value: ''},
               ...users.filter(u => u.id !== isTransferring.ownerId && u.status === 'Verified').map(u => ({label: u.name, value: u.id}))
             ]} />

             <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs flex items-start border border-blue-200 mt-6">
                <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                <p>Transferring this asset will invoke the `safeTransferFrom` function on the ERC-721 contract. This action is immutable.</p>
              </div>

             <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsTransferring(null)}>Cancel</Button>
              <Button type="submit">Execute Transfer</Button>
            </div>
          </form>
        )}
        {transferState > 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
             {transferState === 1 ? (
               <><Loader2 className="w-12 h-12 text-blue-600" /><p className="font-bold text-slate-900">Confirming Blockchain Transfer...</p></>
             ) : (
               <><CheckCircle2 className="w-16 h-16 text-green-500" /><p className="font-bold text-xl text-slate-900">Transfer Complete</p></>
             )}
          </div>
        )}
      </Modal>
    </div>
  );
};

const AuditLogs = ({ auditLogs }) => {
  const [filter, setFilter] = useState('');
  
  const filteredLogs = auditLogs.filter(l => 
    l.actor.toLowerCase().includes(filter.toLowerCase()) || 
    l.action.toLowerCase().includes(filter.toLowerCase()) ||
    l.target.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Audit Trail</h1>
        <p className="text-slate-500 mt-1">Tamper-evident record of all identity and asset activities.</p>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-slate-200 flex bg-slate-50/50">
           <div className="relative w-64">
             <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
             <input 
               type="text" 
               placeholder="Filter logs..." 
               value={filter}
               onChange={(e)=>setFilter(e.target.value)}
               className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
             />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Timestamp</th>
                <th className="px-6 py-4 font-semibold">Actor</th>
                <th className="px-6 py-4 font-semibold">Action & Target</th>
                <th className="px-6 py-4 font-semibold">Source</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">{log.time}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{log.actor}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{log.action}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{log.target}</div>
                  </td>
                  <td className="px-6 py-4"><Badge variant={log.source === 'Blockchain' ? 'primary' : 'neutral'} className="text-[10px]">{log.source}</Badge></td>
                  <td className="px-6 py-4">
                    <Badge variant={log.status === 'Success' ? 'success' : 'danger'}>{log.status}</Badge>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-blue-600">
                    {log.hash !== '—' ? <span className="flex items-center hover:underline cursor-pointer"><Database className="w-3 h-3 mr-1"/>{log.hash.substring(0,10)}...</span> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const BlockchainActivity = ({ auditLogs }) => {
  const blockchainEvents = auditLogs.filter(l => l.source === 'Blockchain');
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Blockchain Network Activity</h1>
        <p className="text-slate-500 mt-1">Live monitoring of smart contract interactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-slate-900  border-slate-800">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Network</div>
          <div className="text-lg font-bold flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div> Sepolia Testnet</div>
        </Card>
        <Card className="p-4 bg-slate-900  border-slate-800">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Latest Block</div>
          <div className="text-lg font-bold font-mono">#5,182,934</div>
        </Card>
        <Card className="p-4 bg-slate-900  border-slate-800">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">RPC Connection</div>
          <div className="text-lg font-bold text-green-400">Healthy</div>
        </Card>
        <Card className="p-4 bg-slate-900  border-slate-800">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Smart Contracts</div>
          <div className="text-lg font-bold">3 Active</div>
        </Card>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <h2 className="font-semibold text-slate-900 flex items-center"><Activity className="w-4 h-4 mr-2 text-blue-600"/> Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left font-mono">
            <thead className="text-xs text-slate-500 bg-slate-100 uppercase border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Tx Hash</th>
                <th className="px-6 py-3 font-semibold">Method</th>
                <th className="px-6 py-3 font-semibold">Block</th>
                <th className="px-6 py-3 font-semibold">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {blockchainEvents.map((log, i) => {
                const methods = {
                  'Role Assigned': 'grantRole()',
                  'NFT Minted': 'mintAsset()',
                  'Asset Transferred': 'safeTransferFrom()',
                  'Identity Registered': 'registerIdentity()'
                };
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">{log.hash}</td>
                    <td className="px-6 py-4 text-purple-700 bg-purple-50/50 w-fit">{methods[log.action] || 'execute()'}</td>
                    <td className="px-6 py-4 text-slate-700">51829{30 - i}</td>
                    <td className="px-6 py-4 text-slate-500">{log.time.split(', ')[1] || 'Just now'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const MyIdentityView = ({ currentUser, notify }) => {
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    notify(`${label} copied to clipboard`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Identity</h1>
        <p className="text-slate-500 mt-1">View and manage your decentralized organizational identity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 col-span-1 flex flex-col items-center text-center bg-gradient-to-b from-white to-slate-50 border-t-4 border-t-blue-500">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold mb-4 shadow-inner border-4 border-white">
            {currentUser.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-slate-900">{currentUser.name}</h2>
          <p className="text-slate-500 text-sm mb-4">{currentUser.email}</p>
          <Badge variant={currentUser.status === 'Verified' ? 'success' : 'warning'} className="mb-6">
            {currentUser.status === 'Verified' ? <CheckCircle2 className="w-3 h-3 mr-1"/> : <AlertCircle className="w-3 h-3 mr-1"/>}
            {currentUser.status} Identity
          </Badge>

          <div className="w-full text-left space-y-4 border-t border-slate-200 pt-6 mt-auto">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Employee ID</div>
              <div className="font-medium text-slate-900">{currentUser.id}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Department</div>
              <div className="font-medium text-slate-900">{currentUser.dept}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Role</div>
              <div className="font-medium text-slate-900">{currentUser.role}</div>
            </div>
          </div>
        </Card>

        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center"><Fingerprint className="w-5 h-5 mr-2 text-blue-600"/> Cryptographic Details</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Decentralized Identifier (DID)</label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 break-all shadow-sm">
                    {currentUser.did || 'Not generated - Requires Verification'}
                  </code>
                  <Button variant="outline" onClick={() => handleCopy(currentUser.did, 'DID')} disabled={!currentUser.did}><Copy className="w-4 h-4"/></Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Registered Wallet Address</label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 break-all shadow-sm">
                    {currentUser.wallet || 'No wallet connected'}
                  </code>
                  <Button variant="outline" onClick={() => handleCopy(currentUser.wallet, 'Wallet address')} disabled={!currentUser.wallet}><Copy className="w-4 h-4"/></Button>
                </div>
              </div>
              <div className="pt-3 text-sm text-slate-600 flex items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
                <ShieldCheck className="w-5 h-5 mr-2 mt-0.5 text-blue-600 shrink-0"/>
                <p>Your identity is secured by smart contracts on the Sepolia network. Only you control the private keys to your wallet, ensuring true digital ownership.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center"><BadgeCheck className="w-5 h-5 mr-2 text-purple-600"/> Permissions & Access Controls</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center"><Database className="w-4 h-4 text-slate-500 mr-3"/> <span className="text-sm font-medium text-slate-700">Platform Login</span></div>
                <Badge variant={currentUser.status === 'Verified' ? 'success' : 'warning'}>{currentUser.status === 'Verified' ? 'Active' : 'Pending'}</Badge>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center"><Box className="w-4 h-4 text-slate-500 mr-3"/> <span className="text-sm font-medium text-slate-700">Asset Ownership</span></div>
                <Badge variant={currentUser.status === 'Verified' ? 'success' : 'warning'}>{currentUser.status === 'Verified' ? 'Granted' : 'Pending'}</Badge>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center"><Users className="w-4 h-4 text-slate-500 mr-3"/> <span className="text-sm font-medium text-slate-700">Identity Provisioning</span></div>
                <Badge variant={['Admin', 'Manager'].includes(currentUser.role) ? 'success' : 'danger'}>
                  {['Admin', 'Manager'].includes(currentUser.role) ? 'Granted' : 'Denied'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center"><Shield className="w-4 h-4 text-slate-500 mr-3"/> <span className="text-sm font-medium text-slate-700">RBAC Management</span></div>
                <Badge variant={currentUser.role === 'Admin' ? 'success' : 'danger'}>
                  {currentUser.role === 'Admin' ? 'Granted' : 'Denied'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const MyAssetsView = ({ assets, currentUser, notify }) => {
  const myAssets = assets.filter(a => a.ownerId === currentUser.id);

  const handleReport = (assetName) => {
    notify(`Issue reported for ${assetName}. IT Support has been notified.`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Assigned Assets</h1>
          <p className="text-slate-500 mt-1">Digital NFTs representing physical and digital equipment assigned to you.</p>
        </div>
        <Badge variant="primary" className="text-sm px-3 py-1.5"><Box className="w-4 h-4 mr-2"/> {myAssets.length} Total Assets</Badge>
      </div>

      {myAssets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-slate-200 border-dashed">
          <Box className="w-12 h-12 text-slate-300 mb-3" />
          <h3 className="text-lg font-medium text-slate-900">No Assets Assigned</h3>
          <p className="text-sm text-slate-500 mt-1">You currently do not have any organizational assets assigned to your identity.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myAssets.map(asset => (
            <Card key={asset.id} className="p-0 flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-slate-200">
              <div className="h-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
              <div className="p-6 flex-1 flex flex-col bg-white">
                <div className="flex justify-between items-start mb-5">
                  <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 shadow-sm">
                     {asset.type.includes('Laptop') ? <Laptop className="w-7 h-7"/> : 
                      asset.type.includes('Mobile') ? <Smartphone className="w-7 h-7"/> :
                      asset.type.includes('Vehicle') ? <Car className="w-7 h-7"/> :
                      <Cpu className="w-7 h-7"/>}
                  </div>
                  <Badge variant="success" className="bg-green-50 text-green-700 border-green-200 shadow-sm">Active Assignment</Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5">{asset.name}</h3>
                <div className="text-sm text-slate-500 mb-6 font-medium">{asset.type} • {asset.id}</div>
                
                <div className="mt-auto pt-5 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between text-xs items-center">
                    <span className="text-slate-500 font-medium">NFT Token ID</span>
                    <span className="font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{asset.tokenId}</span>
                  </div>
                  <div className="flex justify-between text-xs items-center">
                    <span className="text-slate-500 font-medium">Assignment Date</span>
                    <span className="text-slate-700 font-medium">{new Date(asset.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 border-t border-slate-200 p-3.5 flex space-x-3">
                <Button variant="outline" size="sm" className="flex-1 text-xs py-2 bg-white" onClick={() => handleReport(asset.name)}>
                  <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-500"/> Report Issue
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-xs py-2 text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-100 border border-transparent hover:border-blue-200">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5"/> View on Ledger
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsView = ({ currentUser, onLogout, notify }) => {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    notify('Settings saved successfully');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences and security options.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-100 transition-colors flex items-center"><Settings className="w-4 h-4 mr-2.5"/> General Preferences</button>
          <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg border border-transparent transition-colors flex items-center"><Shield className="w-4 h-4 mr-2.5"/> Security </button>
          <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg border border-transparent transition-colors flex items-center"><Bell className="w-4 h-4 mr-2.5"/> Notifications</button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 border-b border-slate-100 pb-3">Profile Information</h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="Full Name" defaultValue={currentUser.name} disabled className="opacity-80" />
                <Input label="Email Address" defaultValue={currentUser.email} disabled className="opacity-80" />
              </div>
              <Input label="Department" defaultValue={currentUser.dept} disabled className="opacity-80 w-full sm:w-1/2 pr-2" />
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                 <p className="text-xs text-slate-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1.5 text-slate-400"/> Profile information is locked by organizational identity policies. Contact HR for changes.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 border-b border-slate-100 pb-3">Security & Access</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Two-Factor Authentication (2FA)</div>
                  <div className="text-sm text-slate-500 mt-0.5">Require wallet signature for sensitive actions like asset transfer.</div>
                </div>
                <button 
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactor ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <div>
                  <div className="font-medium text-slate-900">Wallet Session</div>
                  <div className="text-sm text-slate-500 mt-0.5">End current session and disconnect cryptographic keys.</div>
                </div>
                <Button variant="danger" size="sm" onClick={onLogout}><LogOut className="w-4 h-4 mr-2"/> Disconnect</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 border-b border-slate-100 pb-3">Notification Preferences</h3>
            <div className="space-y-5">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                <div>
                  <div className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">Email Activity Summaries</div>
                  <div className="text-sm text-slate-500 mt-0.5">Receive daily summaries and critical security alerts.</div>
                </div>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                <div>
                  <div className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">Asset Assignment Alerts</div>
                  <div className="text-sm text-slate-500 mt-0.5">Get notified immediately when a new digital asset is minted to your identity.</div>
                </div>
              </label>
            </div>
          </Card>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="shadow-sm">Save Preferences</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    const { users: u, assets: a, auditLogs: al } = generateInitialData();
    setUsers(u);
    setAssets(a);
    setAuditLogs(al);
  }, []);

  const currentUser = useMemo(() => users.find(u => u.id === currentUserId) || users[0], [users, currentUserId]);

  const addLog = (action, target, source, status, hash = '—') => {
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleString(),
      actor: currentUser.name,
      action, target, source, status, hash
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const notify = (msg, type = 'success') => setToastMessage({msg, type, id: Date.now()});

  const handleLoginSuccess = (userId) => {
    setCurrentUserId(userId);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    addLog('Login Successful', 'System Login', 'Frontend', 'Success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUserId(null);
  };

  const handleDemoRoleSwitch = (id) => {
    setCurrentUserId(id);
    setCurrentView('dashboard');
    notify(`Switched to Demo Role: ${users.find(u=>u.id===id)?.role}`, 'info');
  };


  if (!isAuthenticated || !users.length) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} users={users} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} userRole={currentUser.role} />
      
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Topbar 
          currentUser={currentUser} 
          setDemoRole={handleDemoRoleSwitch} 
          users={users} 
          onLogout={handleLogout} 
        />
        
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50 custom-scrollbar relative">
          <div className="max-w-6xl mx-auto pb-12">
            {currentView === 'dashboard' && <DashboardOverview users={users} assets={assets} auditLogs={auditLogs} role={currentUser.role} currentUser={currentUser} />}
            {currentView === 'identities' && <IdentityManagement users={users} role={currentUser.role} setUsers={setUsers} addLog={addLog} notify={notify} />}
            {currentView === 'roles' && <RolesManagement users={users} role={currentUser.role} setUsers={setUsers} currentUser={currentUser} addLog={addLog} notify={notify} />}
            {currentView === 'assets' && <AssetManagement assets={assets} users={users} role={currentUser.role} setAssets={setAssets} currentUser={currentUser} addLog={addLog} notify={notify} />}
            {currentView === 'audit' && <AuditLogs auditLogs={auditLogs} />}
            {currentView === 'blockchain' && <BlockchainActivity auditLogs={auditLogs} />}
            
            {currentView === 'my-identity' && <MyIdentityView currentUser={currentUser} notify={notify} />}
            {currentView === 'my-assets' && <MyAssetsView assets={assets} currentUser={currentUser} notify={notify} />}
            {currentView === 'settings' && <SettingsView currentUser={currentUser} onLogout={handleLogout} notify={notify} />}
          </div>
        </main>
      </div>

      {toastMessage && (
        <Toast 
          key={toastMessage.id} 
          message={toastMessage.msg} 
          type={toastMessage.type} 
          onClose={() => setToastMessage(null)} 
        />
      )}

      {/* Global Styles for Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}