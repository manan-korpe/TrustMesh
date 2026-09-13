import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AlertTriangle } from "lucide-react";

import { User } from "@/types/user";
import RoleAssignmentRow from "./RoleAssignmentRow";

interface RoleAssignmentsProps {
  users: User[];
  role: string;
  onSelectUser: (user: User) => void;
}

export default function RoleAssignments({
  users,
  role,
  onSelectUser,
}: RoleAssignmentsProps) {
  return (
    <Card noPadding>
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
        <h2 className="font-semibold text-slate-900">
          Current Assignments
        </h2>

        {role !== "Admin" && (
          <Badge variant="warning">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Read-Only View
          </Badge>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold">
                Employee
              </th>

              <th className="px-6 py-4 font-semibold">
                Current Role
              </th>

              <th className="px-6 py-4 font-semibold">
                Status
              </th>

              <th className="px-6 py-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <RoleAssignmentRow
                key={user.id}
                user={user}
                onSelect={onSelectUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}