import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { Asset } from "@/types/asset";
import { User } from "@/types/user";

import AssetTableRow from "./AssetTableRow";

interface AssetTableProps {
  assets: Asset[];
  users: User[];
  canManageAssets: boolean;
  onCreate: () => void;
  onTransfer: (asset: Asset) => void;
  onDetails: (asset: Asset) => void;
}

export default function AssetTable({
  assets,
  users,
  canManageAssets,
  onCreate,
  onTransfer,
  onDetails,
}: AssetTableProps) {
  return (
    <Card noPadding>
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Registered Assets
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage organizational assets.
          </p>
        </div>

        {canManageAssets && (
          <Button type="button" onClick={onCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Asset
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase">
                Asset
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase ">
                Category
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase ">
                Owner
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase ">
                Token
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase ">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold">
                Actions
              </th>
            </tr>
          </thead> */}
          <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold">Asset</th>

              <th className="px-6 py-4 font-semibold">Category</th>

              <th className="px-6 py-4 font-semibold">Owner</th>

              <th className="px-6 py-4 font-semibold ">Token</th>
              <th className="px-6 py-4 font-semibold  ">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assets.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  No assets found.
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <AssetTableRow
                  key={asset.id}
                  asset={asset}
                  users={users}
                  canManageAssets={canManageAssets}
                  onTransfer={onTransfer}
                  onDetails={onDetails}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
