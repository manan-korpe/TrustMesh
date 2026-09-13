"use client"
import { Badge } from "@/components/ui/Badge";
import { Button, Size, Variant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/hooks/app.hook";
import { Asset } from "@/types/asset";
import { Log } from "@/types/log";
import { UserRole, User } from "@/types/user";
import { cssClassJoin } from "@/utils/ui.util";
import {
  Activity,
  AlertCircle,
  Box,
  CheckCircle2,
  Database,
  Key,
  Shield,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

const ROLES = [
  UserRole.User,
  UserRole.Manager,
  UserRole.Auditor,
  UserRole.Admin,
];

export default function DashboardOverview() {
  const role:string = "Admin";
  const { users, assets, auditLogs, currentUser } = useApp();
  if(!currentUser){
    return (
        <h1>Loading</h1>
    )
  }

  const verifiedCount = users.filter(
    (u: User) => u.status === "Verified",
  ).length;


  if (role === "User") {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your identity and assigned organizational assets.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card noPadding>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center text-slate-600 font-medium">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-500" /> Identity
                Status
              </div>
              <Badge
                variant={
                  currentUser.status === "Verified" ? "success" : "warning"
                }
              >
                {currentUser.status}
              </Badge>
            </div>
            <div className="p-6 bg-slate-50">
              <div className="text-xs text-slate-500 mb-1">
                Decentralized ID
              </div>
              <div className="font-mono text-sm text-slate-900 break-all">
                {currentUser.did || "Not Generated"}
              </div>
            </div>
          </Card>
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-slate-600 font-medium mb-4">
                <Key className="w-5 h-5 mr-2 text-blue-500" /> Organizational
                Role
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {currentUser.role}
              </div>
            </div>
            <div className="text-sm text-slate-500 flex items-center mt-4">
              <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Standard
              permissions active
            </div>
          </Card>
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-slate-600 font-medium mb-4">
                <Box className="w-5 h-5 mr-2 text-purple-500" /> Assigned Assets
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {
                  assets.filter((a: Asset) => a.ownerId === currentUser.id)
                    .length
                }
              </div>
            </div>
            <Button
              variant={Variant.Outline}
              className="w-full mt-4"
              size={Size.SM}
            >
              View My Assets
            </Button>
          </Card>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-4">
          My Recent Activity
        </h2>
        <Card noPadding>
          <div className="divide-y divide-slate-100">
            {auditLogs
              .filter(
                (l: Log) =>
                  l.actor === currentUser.name ||
                  l.target.includes(currentUser.name),
              )
              .slice(0, 3)
              .map((log: Log, i: number) => (
                <div
                  key={i}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {log.action}
                      </p>
                      <p className="text-xs text-slate-500">{log.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={log.status === "Success" ? "success" : "danger"}
                    >
                      {log.status}
                    </Badge>
                    <p className="text-xs text-slate-400 mt-1">
                      {log.time.split(",")[0]}
                    </p>
                  </div>
                </div>
              ))}
            {auditLogs.filter(
              (l: Log) =>
                l.actor === currentUser.name ||
                l.target.includes(currentUser.name),
            ).length === 0 && (
              <div className="p-8 text-center text-slate-500 text-sm">
                No recent activity found.
              </div>
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
          <h1 className="text-2xl font-bold text-slate-900">
            Organization Overview
          </h1>
          <p className="text-slate-500 mt-1">
            Real-time status of identities, roles, and assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm font-medium">
              Total Employees
            </div>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl font-bold text-slate-900">
              {users.length}
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded">
            <CheckCircle2 className="w-4 h-4 mr-1" /> {verifiedCount} Verified
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm font-medium">
              Pending Verification
            </div>
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl font-bold text-slate-900">
              {users.length - verifiedCount}
            </div>
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Require wallet connection
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm font-medium">
              Active NFT Assets
            </div>
            <Box className="w-5 h-5 text-purple-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl font-bold text-slate-900">
              {assets.length}
            </div>
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Represented on-chain
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 text-sm font-medium">
              Security Events (24h)
            </div>
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl font-bold text-slate-900">
              {auditLogs.filter((l: Log) => l.status !== "Success").length || 1}
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 w-fit px-2 py-0.5 rounded">
            <XCircle className="w-4 h-4 mr-1" /> 1 Blocked Attempt
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Audit Activity
            </h2>
            <Button variant={Variant.Ghost} size={Size.SM}>
              View All
            </Button>
          </div>
          <div className="space-y-4 flex-1">
            {auditLogs.slice(0, 5).map((log: Log) => (
              <div
                key={log.id}
                className="flex items-start p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100 group"
              >
                <div
                  className={cssClassJoin(
                    "p-2 rounded-full mr-4 shrink-0",
                    log.status === "Success"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600",
                  )}
                >
                  {log.status === "Success" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      <span className="font-semibold text-blue-700">
                        {log.actor}
                      </span>{" "}
                      {log.action}
                    </p>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                      {log.time.split(",")[0]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5 truncate">
                    Target: {log.target}
                  </p>
                  <div className="flex items-center mt-2 space-x-3">
                    <Badge
                      variant={
                        log.source === "Blockchain" ? "primary" : "neutral"
                      }
                      className="text-[10px]"
                    >
                      {log.source}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono truncate">
                      {log.hash !== "—" ? log.hash : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Role Distribution
            </h2>
            <div className="space-y-5">
              {ROLES.map((r) => {
                const count = users.filter((u: User) => u.role === r).length;
                const percentage = (count / users.length) * 100;
                const colors = {
                  Admin: "bg-purple-500",
                  Manager: "bg-blue-500",
                  Auditor: "bg-amber-500",
                  User: "bg-slate-500",
                };
                return (
                  <div key={r}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700 flex items-center">
                        <span
                          className={cssClassJoin(
                            "w-2 h-2 rounded-full mr-2",
                            colors[r],
                          )}
                        ></span>
                        {r}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {count} users
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={cssClassJoin(
                          "h-full rounded-full transition-all duration-1000",
                          colors[r],
                        )}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Database className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-lg font-semibold mb-2">Smart Contracts</h2>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                  <span className="text-blue-100">Identity Registry</span>
                  <Badge
                    variant="success"
                    className="bg-green-500/20 text-green-100 border-transparent"
                  >
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                  <span className="text-blue-100">RBAC Manager</span>
                  <Badge
                    variant="success"
                    className="bg-green-500/20 text-green-100 border-transparent"
                  >
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-100">Asset NFT (ERC-721)</span>
                  <Badge
                    variant="success"
                    className="bg-green-500/20 text-green-100 border-transparent"
                  >
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
