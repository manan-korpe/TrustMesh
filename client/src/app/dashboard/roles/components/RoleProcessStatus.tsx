import { CheckCircle2, Database, XCircle } from "lucide-react";

import { Loader2 } from "@/components/ui/Loader";

interface RoleProcessStatusProps {
  processState: number;
  currentRole?: string;
}

export default function RoleProcessStatus({
  processState,
  currentRole,
}: RoleProcessStatusProps) {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
      {processState === 1 && (
        <>
          <Loader2 className="w-10 h-10 text-blue-600" />

          <p className="font-medium text-slate-900">
            Checking RBAC Permissions...
          </p>

          <p className="text-xs text-slate-500">
            Verifying {currentRole} privileges
          </p>
        </>
      )}

      {processState === 2 && (
        <>
          <Database className="w-10 h-10 text-purple-600 animate-pulse" />

          <p className="font-medium text-slate-900">
            Submitting to Blockchain...
          </p>

          <p className="text-xs text-slate-500 font-mono">
            Waiting for block confirmation
          </p>
        </>
      )}

      {processState === 3 && (
        <>
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>

          <h3 className="font-bold text-lg text-slate-900">
            Role Granted
          </h3>

          <p className="text-sm text-slate-500">
            Transaction confirmed successfully.
          </p>
        </>
      )}

      {processState === 4 && (
        <>
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>

          <h3 className="font-bold text-lg text-slate-900">
            Access Denied
          </h3>

          <p className="text-sm text-slate-500">
            Your current role ({currentRole}) does not have
            permission to grant roles.
          </p>
        </>
      )}
    </div>
  );
}