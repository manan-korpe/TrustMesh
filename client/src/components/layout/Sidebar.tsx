import { UserRole } from "@/types/user";
import { cssClassJoin } from "@/utils/ui.util";
import {
  Activity,
  Box,
  Database,
  FileText,
  Laptop,
  LucideIcon,
  Settings,
  Shield,
  ShieldCheck,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MenuItem {
  id: string;
  href:string;
  icon: LucideIcon;
  label: string;
  roles: UserRole[];
}

interface SidebarProps {
  userRole: UserRole;
}

export default function Sidebar({ userRole }: SidebarProps) {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      href:"dashboard",
      icon: Activity,
      label: "Overview",
      roles: [
        UserRole.Admin,
        UserRole.Manager,
        UserRole.Auditor,
        UserRole.User,
      ],
    },
    {
      id: "identities",
      href:"dashboard/identities",
      icon: Users,
      label: "Identity Management",
      roles: [UserRole.Admin, UserRole.Manager, UserRole.Auditor],
    },
    {
      id: "roles",
      href:"dashboard/roles",
      icon: Shield,
      label: "Roles & Permissions",
      roles: [UserRole.Admin, UserRole.Auditor],
    },
    {
      id: "assets",
      href:"dashboard/assets",
      icon: Box,
      label: "Asset Management",
      roles: [UserRole.Admin, UserRole.Manager, UserRole.Auditor],
    },
    {
      id: "audit",
      href:"dashboard/audit",
      icon: FileText,
      label: "Audit Logs",
      roles: [UserRole.Admin, UserRole.Manager, UserRole.Auditor],
    },
    {
      id: "blockchain",
      href:"dashboard/blockchain/activity",
      icon: Database,
      label: "Blockchain Activity",
      roles: [UserRole.Admin, UserRole.Auditor],
    },
    {
      id: "my-identity",
      href:"dashboard/my/identity",
      icon: UserCircle,
      label: "My Identity",
      roles: [
        UserRole.User,
        UserRole.Manager,
        UserRole.Admin,
        UserRole.Auditor,
      ],
    },
    {
      id: "my/assets",
      href:"dashboard/my/assets",
      icon: Laptop,
      label: "My Assets",
      roles: [
        UserRole.User,
        UserRole.Manager,
        UserRole.Admin,
        UserRole.Auditor,
      ],
    },
    {
      id: "settings",
      href:"dashboard/settings",
      icon: Settings,
      label: "Settings",
      roles: [
        UserRole.Admin,
        UserRole.Manager,
        UserRole.Auditor,
        UserRole.User,
      ],
    },
  ];

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 z-20 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <ShieldCheck className="w-6 h-6 text-blue-500 mr-2" />
        <span className="text-white font-bold tracking-wide text-lg">
          TrustMesh
        </span>
      </div>
      <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
        <div className="px-4 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Main Menu
        </div>
        <nav className="space-y-1 px-3">
          {filteredMenu.map((item) => {
            const isActive = currentView === item.id;
            return (
              <Link
                href={`/${item.href}`}
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cssClassJoin(
                  "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                    : "hover:bg-slate-800 hover:text-white border border-transparent",
                )}
              >
                <item.icon
                  className={cssClassJoin(
                    "w-5 h-5 mr-3",
                    isActive ? "text-blue-500" : "text-slate-400",
                  )}
                />
                {item.label}
              </Link>
            );
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
}
