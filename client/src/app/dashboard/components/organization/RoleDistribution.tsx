import { Card } from "@/components/ui/Card";
import { User, UserRole } from "@/types/user";
import { cssClassJoin } from "@/utils/ui.util";

interface RoleDistributionProps {
  users: User[];
}

const ROLES = [
  UserRole.User,
  UserRole.Manager,
  UserRole.Auditor,
  UserRole.Admin,
];

const ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.Admin]: "bg-purple-500",
  [UserRole.Manager]: "bg-blue-500",
  [UserRole.Auditor]: "bg-amber-500",
  [UserRole.User]: "bg-slate-500",
};

export default function RoleDistribution({ users }: RoleDistributionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Role Distribution
      </h2>

      <div className="space-y-5">
        {ROLES.map((role) => {
          const count = users.filter((user) => user.role === role).length;

          const percentage =
            users.length > 0 ? (count / users.length) * 100 : 0;

          const color = ROLE_COLORS[role];

          return (
            <div key={role}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-slate-700 flex items-center">
                  <span
                    className={cssClassJoin("w-2 h-2 rounded-full mr-2", color)}
                  />

                  {role}
                </span>

                <span className="text-slate-500 font-medium">
                  {count} users
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={cssClassJoin(
                    "h-full rounded-full transition-all duration-1000",
                    color,
                  )}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
