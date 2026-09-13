import { Badge } from "@/components/ui/Badge";
import { Button, Size, Variant } from "@/components/ui/Button";
import { cssClassJoin } from "@/utils/ui.util";
import { User } from "@/types/user";

interface RoleAssignmentRowProps {
  user: User;
  onSelect: (user: User) => void;
}

export default function RoleAssignmentRow({
  user,
  onSelect,
}: RoleAssignmentRowProps) {
  const getRoleVariant = () => {
    switch (user.role) {
      case "Admin":
        return "purple";

      case "Manager":
        return "primary";

      case "Auditor":
        return "warning";

      default:
        return "neutral";
    }
  };

  const isVerified = user.status === "Verified";

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-6 py-4">
        <div className="font-medium text-slate-900">
          {user.name}
        </div>

        <div className="text-xs text-slate-500">
          {user.dept}
        </div>
      </td>

      <td className="px-6 py-4">
        <Badge variant={getRoleVariant()}>
          {user.role}
        </Badge>
      </td>

      <td className="px-6 py-4">
        <span
          className={cssClassJoin(
            "text-xs flex items-center",
            isVerified
              ? "text-green-600"
              : "text-amber-600",
          )}
        >
          <span
            className={cssClassJoin(
              "w-1.5 h-1.5 rounded-full mr-1.5",
              isVerified
                ? "bg-green-500"
                : "bg-amber-500",
            )}
          />

          {user.status}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <Button
          variant={Variant.Outline}
          size={Size.SM}
          onClick={() => onSelect(user)}
          disabled={!isVerified}
        >
          Change Role
        </Button>
      </td>
    </tr>
  );
}