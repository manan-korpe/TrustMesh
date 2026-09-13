import { ExternalLink } from "lucide-react";

import {Badge} from "@/components/ui/Badge";
import {Button, Size, Variant} from "@/components/ui/Button";

import { Asset } from "@/types/asset";
import { User } from "@/types/user";

interface AssetTableRowProps {
  asset: Asset;
  users: User[];
  canManageAssets: boolean;
  onTransfer: (asset: Asset) => void;
  onDetails: (asset: Asset) => void;
}

export default function AssetTableRow({
  asset,
  users,
  canManageAssets,
  onTransfer,
  onDetails,
}: AssetTableRowProps) {
  const owner = users.find(
    (user) => user.id === asset.ownerId
  );

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
      {/* Asset */}
      <td className="px-5 py-4">
        <div>
          <p className="font-medium text-slate-900">
            {asset.name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            ID: {asset.id}
          </p>
        </div>
      </td>

      {/* Category */}
      <td className="px-5 py-4">
        <span className="text-sm text-slate-700">
          {asset.type}
        </span>
      </td>

      {/* Owner */}
      <td className="px-5 py-4">
        {owner ? (
          <div>
            <p className="text-sm font-medium text-slate-800">
              {owner.name}
            </p>

            <p className="text-xs text-slate-500">
              {owner.email}
            </p>
          </div>
        ) : (
          <span className="text-sm text-slate-400">
            Unassigned
          </span>
        )}
      </td>

      {/* Token */}
      <td className="px-5 py-4">
        {asset.tokenId ? (
          <div>
            <p className="max-w-37.5 truncate text-sm font-medium text-slate-700">
              {asset.tokenId}
            </p>

            {asset.metadataCid && (
              <p className="mt-1 max-w-37.5 truncate text-xs text-slate-400">
                {asset.metadataCid}
              </p>
            )}
          </div>
        ) : (
          <span className="text-sm text-slate-400">
            Not minted
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <Badge
          variant={
            asset.status === "Assigned"
              ? "success"
              : "warning"
          }
        >
          {asset.status}
        </Badge>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            size={Size.SM}
            variant={Variant.Ghost}
            onClick={() => onDetails(asset)}
          >
            Details
          </Button>

          {canManageAssets && (
            <Button
              type="button"
             size={Size.SM}
              onClick={() => onTransfer(asset)}
            >
              Transfer
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}