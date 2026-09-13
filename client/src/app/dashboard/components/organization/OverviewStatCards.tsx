import {
  AlertCircle,
  Box,
  CheckCircle2,
  Shield,
  Users,
  XCircle,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

interface OverviewStatCardsProps {
  totalEmployees: number;
  verifiedEmployees: number;
  pendingEmployees: number;
  totalAssets: number;
  securityEvents: number;
}

export default function OverviewStatCards({
  totalEmployees,
  verifiedEmployees,
  pendingEmployees,
  totalAssets,
  securityEvents,
}: OverviewStatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Employees */}
      <Card className="p-5 border-l-4 border-l-blue-500">
        <div className="flex items-center justify-between">
          <div className="text-slate-500 text-sm font-medium">
            Total Employees
          </div>

          <Users className="w-5 h-5 text-blue-500" />
        </div>

        <div className="mt-4 text-3xl font-bold text-slate-900">
          {totalEmployees}
        </div>

        <div className="mt-2 flex items-center text-sm text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          {verifiedEmployees} Verified
        </div>
      </Card>

      {/* Pending */}
      <Card className="p-5 border-l-4 border-l-amber-500">
        <div className="flex items-center justify-between">
          <div className="text-slate-500 text-sm font-medium">
            Pending Verification
          </div>

          <AlertCircle className="w-5 h-5 text-amber-500" />
        </div>

        <div className="mt-4 text-3xl font-bold text-slate-900">
          {pendingEmployees}
        </div>

        <div className="mt-2 text-sm text-slate-500">
          Require wallet connection
        </div>
      </Card>

      {/* Assets */}
      <Card className="p-5 border-l-4 border-l-purple-500">
        <div className="flex items-center justify-between">
          <div className="text-slate-500 text-sm font-medium">
            Active NFT Assets
          </div>

          <Box className="w-5 h-5 text-purple-500" />
        </div>

        <div className="mt-4 text-3xl font-bold text-slate-900">
          {totalAssets}
        </div>

        <div className="mt-2 text-sm text-slate-500">Represented on-chain</div>
      </Card>

      {/* Security */}
      <Card className="p-5 border-l-4 border-l-red-500">
        <div className="flex items-center justify-between">
          <div className="text-slate-500 text-sm font-medium">
            Security Events (24h)
          </div>

          <Shield className="w-5 h-5 text-red-500" />
        </div>

        <div className="mt-4 text-3xl font-bold text-slate-900">
          {securityEvents || 1}
        </div>

        <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 w-fit px-2 py-0.5 rounded">
          <XCircle className="w-4 h-4 mr-1" />1 Blocked Attempt
        </div>
      </Card>
    </div>
  );
}
