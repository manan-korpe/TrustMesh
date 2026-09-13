import { Card } from "@/components/ui/Card";
import { User } from "@/types/user";

import IdentityTableRow from "./IdentityTableRow";

interface IdentityTableProps {
  users: User[];
  canVerifyIdentity: boolean;
  verifyingUserId: string | null;
  onVerify: (user: User) => void;
}

export default function IdentityTable({
  users,
  canVerifyIdentity,
  verifyingUserId,
  onVerify,
}: IdentityTableProps) {
  return (
    <Card noPadding>

      <div className="overflow-x-auto">

        <table className="w-full text-sm text-left">

          <thead
            className="
              text-xs
              text-slate-500
              bg-slate-50
              uppercase
              border-b
              border-slate-200
            "
          >
            <tr>

              <th className="px-6 py-4 font-semibold">
                Employee
              </th>

              <th className="px-6 py-4 font-semibold">
                ID & Dept
              </th>

              <th className="px-6 py-4 font-semibold">
                Decentralized ID
              </th>

              <th className="px-6 py-4 font-semibold">
                Role
              </th>

              <th className="px-6 py-4 font-semibold">
                Status
              </th>

              <th className="px-6 py-4 font-semibold text-right">
                Actions
              </th>

            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-200">

            {users.map((user) => (
              <IdentityTableRow
                key={user.id}
                user={user}
                canVerifyIdentity={canVerifyIdentity}
                isVerifying={
                  verifyingUserId === user.id
                }
                onVerify={onVerify}
              />
            ))}

          </tbody>

        </table>

        {/* Empty state */}
        {users.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No identities found.
          </div>
        )}

      </div>

    </Card>
  );
}