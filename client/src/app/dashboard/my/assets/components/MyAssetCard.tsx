"use client";

import {
  AlertTriangle,
  Box,
  Car,
  Cpu,
  ExternalLink,
  Laptop,
  Smartphone,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import {
  Button,
  Size,
  Variant,
} from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { useApp } from "@/hooks/app.hook";
import { Asset } from "@/types/asset";
import { NoticeType } from "@/types/notice";

import { getAssetIcon } from "./my-assets.utils";

interface MyAssetCardProps {
  asset: Asset;
}

export default function MyAssetCard({
  asset,
}: MyAssetCardProps) {
  const { notify } = useApp();

  const AssetIcon = getAssetIcon(asset.type);

  const handleReport = () => {
    notify(
      `Issue reported for ${asset.name}. IT Support has been notified.`,
      "info"
    );
  };

  const handleViewLedger = () => {
    if (!asset.txHash) {
      notify(
        "Blockchain transaction is not available.",
        "info"
      );

      return;
    }

    // Replace with your actual explorer URL.
    window.open(
      `https://sepolia.etherscan.io/tx/${asset.txHash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Card className="flex flex-col overflow-hidden border-slate-200 p-0 transition-shadow hover:shadow-lg">
      {/* Top gradient */}
      <div className="h-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="flex flex-1 flex-col bg-white p-6">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 shadow-sm">
            <AssetIcon className="h-7 w-7" />
          </div>

          <Badge
            variant="success"
            className="border-green-200 bg-green-50 text-green-700 shadow-sm"
          >
            Active Assignment
          </Badge>
        </div>

        {/* Asset information */}
        <h3 className="mb-1.5 text-lg font-bold text-slate-900">
          {asset.name}
        </h3>

        <div className="mb-6 text-sm font-medium text-slate-500">
          {asset.type} • {asset.id}
        </div>

        {/* Metadata */}
        <div className="mt-auto space-y-3 border-t border-slate-100 pt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500">
              NFT Token ID
            </span>

            <span className="rounded border border-purple-100 bg-purple-50 px-2 py-0.5 font-mono font-bold text-purple-700">
              {asset.tokenId || "Not minted"}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500">
              Assignment Date
            </span>

            <span className="font-medium text-slate-700">
              {new Date(asset.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 border-t border-slate-200 bg-slate-50 p-3.5">
        <Button
          variant={Variant.Outline}
          size={Size.SM}
          className="flex-1 bg-white py-2 text-xs"
          onClick={handleReport}
        >
          <AlertTriangle className="mr-1.5 h-3.5 w-3.5 text-amber-500" />

          Report Issue
        </Button>

        <Button
          variant={Variant.Ghost}
          size={Size.SM}
          className="flex-1 border border-transparent bg-blue-50/50 py-2 text-xs text-blue-600 hover:border-blue-200 hover:bg-blue-100 hover:text-blue-700"
          onClick={handleViewLedger}
        >
          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />

          View on Ledger
        </Button>
      </div>
    </Card>
  );
}