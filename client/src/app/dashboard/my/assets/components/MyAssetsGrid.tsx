import { Box } from "lucide-react";

import { Asset } from "@/types/asset";

import MyAssetCard from "./MyAssetCard";

interface MyAssetsGridProps {
  assets: Asset[];
}

export default function MyAssetsGrid({
  assets,
}: MyAssetsGridProps) {
  if (assets.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white">
        <Box className="mb-3 h-12 w-12 text-slate-300" />

        <h3 className="text-lg font-medium text-slate-900">
          No Assets Assigned
        </h3>

        <p className="mt-1 text-center text-sm text-slate-500">
          You currently do not have any organizational assets
          assigned to your identity.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {assets.map((asset) => (
        <MyAssetCard
          key={asset.id}
          asset={asset}
        />
      ))}
    </div>
  );
}