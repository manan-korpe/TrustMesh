import { CheckCircle2, Key } from "lucide-react";

import { Card } from "@/components/ui/Card";

interface OrganizationalRoleCardProps {
  role: string;
}

export default function OrganizationalRoleCard({
  role,
}: OrganizationalRoleCardProps) {
  return (
    <Card className="p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center text-slate-600 font-medium mb-4">
          <Key className="w-5 h-5 mr-2 text-blue-500" />
          Organizational Role
        </div>

        <div className="text-3xl font-bold text-slate-900 mb-1">{role}</div>
      </div>

      <div className="text-sm text-slate-500 flex items-center mt-4">
        <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
        Standard permissions active
      </div>
    </Card>
  );
}
