import { Badge } from "@/components/ui/Badge";
import { Button, Variant } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { AlertTriangle } from "lucide-react";

import { User } from "@/types/user";

import RoleProcessStatus from "./RoleProcessStatus";

interface RoleDefinition {
  name: string;
  desc: string;
  perms: string[];
}

interface AssignRoleModalProps {
  selectedUser: User;
  newRole: string;
  processState: number;
  currentRole?: string;
  roleDefinitions: RoleDefinition[];

  onRoleChange: (role: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AssignRoleModal({
  selectedUser,
  newRole,
  processState,
  currentRole,
  roleDefinitions,
  onRoleChange,
  onCancel,
  onConfirm,
}: AssignRoleModalProps) {
  if (processState > 0) {
    return (
      <RoleProcessStatus
        processState={processState}
        currentRole={currentRole}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Selected employee */}
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
        <div>
          <div className="text-sm font-medium text-slate-900">
            {selectedUser.name}
          </div>

          <div className="text-xs text-slate-500">
            {selectedUser.id}
          </div>
        </div>

        <Badge>
          {selectedUser.role}
        </Badge>
      </div>

      {/* Role select */}
      <Select
        label="Select New Role"
        value={newRole}
        onChange={(event) =>
          onRoleChange(event.target.value)
        }
        options={roleDefinitions.map((role) => ({
          label: role.name,
          value: role.name,
        }))}
      />

      {/* Blockchain warning */}
      <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-xs flex items-start border border-amber-200 mt-4">
        <AlertTriangle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />

        <div>
          <strong>
            Blockchain Transaction Required
          </strong>

          <p className="mt-1">
            Role assignment invokes the{" "}
            <code>grantRole</code> function on the RBAC
            smart contract. Gas fees apply.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant={Variant.Ghost}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          disabled={newRole === selectedUser.role}
        >
          Confirm Assignment
        </Button>
      </div>
    </div>
  );
}