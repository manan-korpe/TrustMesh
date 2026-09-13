import { AlertCircle, CheckCircle2, Copy } from "lucide-react";

import { Button, Size, Variant } from "@/components/ui/Button";

import { Badge } from "@/components/ui/Badge";

import { User } from "@/types/user";

interface IdentityTableRowProps {
  user: User;
  canVerifyIdentity: boolean;
  isVerifying: boolean;
  onVerify: (user: User) => void;
}

export default function IdentityTableRow({
  user,
  canVerifyIdentity,
  isVerifying,
  onVerify,
}: IdentityTableRowProps) {
  const roleVariant =
    user.role === "Admin"
      ? "purple"
      : user.role === "Manager"
        ? "primary"
        : user.role === "Auditor"
          ? "warning"
          : "neutral";

  const copyDID = async () => {
    if (!user.did) return;

    await navigator.clipboard.writeText(user.did);
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      {/* Employee */}
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div
            className="
              w-8
              h-8
              rounded-full
              bg-slate-200
              text-slate-600
              flex
              items-center
              justify-center
              font-bold
              text-xs
              mr-3
            "
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <div className="font-medium text-slate-900">{user.name}</div>

            <div className="text-slate-500 text-xs">{user.email}</div>
          </div>
        </div>
      </td>

      {/* ID + Department */}
      <td className="px-6 py-4">
        <div className="font-medium text-slate-700">{user.id}</div>

        <div className="text-slate-500 text-xs">{user.dept}</div>
      </td>

      {/* DID */}
      <td className="px-6 py-4">
        {user.did ? (
          <div className="flex items-center space-x-2">
            <span
              className="
                font-mono
                text-xs
                text-blue-700
                bg-blue-50
                px-2
                py-1
                rounded
                border
                border-blue-100
              "
            >
              {user.did.substring(0, 22)}...
            </span>

            <button
              type="button"
              onClick={copyDID}
              title="Copy DID"
              className="
                text-slate-400
                hover:text-blue-600
              "
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <span className="text-slate-400 italic text-xs">Not generated</span>
        )}
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <Badge variant={roleVariant}>{user.role}</Badge>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <Badge variant={user.status === "Verified" ? "success" : "warning"}>
          {user.status === "Verified" ? (
            <CheckCircle2 className="w-3 h-3 mr-1" />
          ) : (
            <AlertCircle className="w-3 h-3 mr-1" />
          )}

          {user.status}
        </Badge>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right space-x-2">
        {user.status === "Pending" && canVerifyIdentity ? (
          <Button
            size={Size.SM}
            variant={Variant.Outline}
            isLoading={isVerifying}
            onClick={() => onVerify(user)}
          >
            Simulate Verify
          </Button>
        ) : (
          <Button
            size={Size.SM}
            variant={Variant.Ghost}
            className="text-blue-600"
          >
            View
          </Button>
        )}
      </td>
    </tr>
  );
}
