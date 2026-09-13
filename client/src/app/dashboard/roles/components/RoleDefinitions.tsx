import { Card } from "@/components/ui/Card";
import { CheckCircle2, Shield } from "lucide-react";

interface RoleDefinition {
  name: string;
  desc: string;
  perms: string[];
}

interface RoleDefinitionsProps {
  roles: RoleDefinition[];
}

export default function RoleDefinitions({
  roles,
}: RoleDefinitionsProps) {
  const getBorderColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "#8b5cf6";

      case "Manager":
        return "#3b82f6";

      case "Auditor":
        return "#f59e0b";

      default:
        return "#64748b";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {roles.map((role) => (
        <Card
          key={role.name}
          className="p-5 border-t-4 hover:shadow-md transition-shadow"
          style={{
            borderTopColor: getBorderColor(role.name),
          }}
        >
          <h3 className="font-bold text-slate-900 flex items-center mb-1 text-lg">
            {role.name}

            {role.name === "Admin" && (
              <Shield className="w-4 h-4 ml-2 text-purple-500" />
            )}
          </h3>

          <p className="text-xs text-slate-500 mb-4 h-8">
            {role.desc}
          </p>

          <ul className="space-y-2 text-sm text-slate-600">
            {role.perms.map((permission) => (
              <li
                key={permission}
                className="flex items-start"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />

                <span className="leading-tight text-xs">
                  {permission}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}