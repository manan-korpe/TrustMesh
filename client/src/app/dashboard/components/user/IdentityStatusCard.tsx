import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface IdentityStatusCardProps {
  status: string;
  did?: string;
}

export default function IdentityStatusCard({
  status,
  did,
}: IdentityStatusCardProps) {
  return (
    <Card noPadding>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center text-slate-600 font-medium">
          <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
          Identity Status
        </div>

        <Badge variant={status === "Verified" ? "success" : "warning"}>
          {status}
        </Badge>
      </div>

      <div className="p-6 bg-slate-50">
        <div className="text-xs text-slate-500 mb-1">Decentralized ID</div>

        <div className="font-mono text-sm text-slate-900 break-all">
          {did || "Not Generated"}
        </div>
      </div>
    </Card>
  );
}
