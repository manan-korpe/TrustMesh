import { AlertTriangle, Bell, LogOut, Search } from "lucide-react";

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