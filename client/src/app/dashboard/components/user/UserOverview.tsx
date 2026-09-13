"use client";

import { Activity } from "lucide-react";

import { useApp } from "@/hooks/app.hook";
import { Log } from "@/types/log";

import IdentityStatusCard from "./IdentityStatusCard";
import OrganizationalRoleCard from "./OrganizationalRoleCard";
import AssignedAssetsCard from "./AssignedAssetsCard";
import UserRecentActivity from "./UserRecentActivity";

export default function UserOverview() {
  const {
    currentUser,
    assets,
    auditLogs,
  } = useApp();

  if (!currentUser) {
    return <h1>Loading...</h1>;
  }

  const userAssets = assets.filter(
    (asset) => asset.ownerId === currentUser.id
  );

  const recentActivity = auditLogs.filter(
    (log: Log) =>
      log.actor === currentUser.name ||
      log.target.includes(currentUser.name)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Header */}
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <IdentityStatusCard
          status={currentUser.status}
          did={currentUser.did}
        />

        <OrganizationalRoleCard
          role={currentUser.role}
        />

        <AssignedAssetsCard
          assetCount={userAssets.length}
        />

      </div>

      {/* Activity */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-500" />
          My Recent Activity
        </h2>

        <UserRecentActivity
          logs={recentActivity}
        />
      </div>

    </div>
  );
}