"use client";

import { useApp } from "@/hooks/app.hook";

import OverviewStatCards from "./OverviewStatCards";
import RecentAuditActivity from "./RecentAuditActivity";
import RoleDistribution from "./RoleDistribution";
import SmartContractsStatus from "./SmartContractsStatus";

export default function OrganizationOverview() {
  const { users, assets, auditLogs } = useApp();

  const verifiedCount = users.filter(
    (user) => user.status === "Verified",
  ).length;

  const securityEvents = auditLogs.filter(
    (log) => log.status !== "Success",
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
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

      {/* Statistics */}
      <OverviewStatCards
        totalEmployees={users.length}
        verifiedEmployees={verifiedCount}
        pendingEmployees={users.length - verifiedCount}
        totalAssets={assets.length}
        securityEvents={securityEvents}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentAuditActivity logs={auditLogs} />

        <div className="space-y-6">
          <RoleDistribution users={users} />

          <SmartContractsStatus />
        </div>
      </div>
    </div>
  );
}
