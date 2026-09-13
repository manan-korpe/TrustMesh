"use client";

import { Badge } from "@/components/ui/Badge";
import { Box } from "lucide-react";

import { useApp } from "@/hooks/app.hook";

import MyAssetsGrid from "./MyAssetsGrid";

export default function MyAssetsView() {
  const { assets, currentUser } = useApp();

  if (!currentUser) {
    return <h1>Loading...</h1>;
  }

  const myAssets = assets.filter(
    (asset) => asset.ownerId === currentUser.id
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Assigned Assets
          </h1>

          <p className="mt-1 text-slate-500">
            Digital NFTs representing physical and digital equipment
            assigned to you.
          </p>
        </div>

        <Badge
          variant="primary"
          className="px-3 py-1.5 text-sm"
        >
          <Box className="mr-2 h-4 w-4" />

          {myAssets.length} Total Assets
        </Badge>
      </div>

      <MyAssetsGrid assets={myAssets} />
    </div>
  );
}