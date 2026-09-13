import { Plus } from "lucide-react";

import {
  Button,
} from "@/components/ui/Button";

interface IdentityHeaderProps {
  canCreateEmployee: boolean;
  onAddEmployee: () => void;
}

export default function IdentityHeader({
  canCreateEmployee,
  onAddEmployee,
}: IdentityHeaderProps) {
  return (
    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          Identity Management
        </h1>

        <p className="text-slate-500 mt-1">
          Manage organizational identities and verification status.
        </p>

      </div>

      {canCreateEmployee && (
        <Button onClick={onAddEmployee}>
          <Plus className="w-4 h-4 mr-2" />

          Add Employee
        </Button>
      )}

    </div>
  );
}