"use client";

import { useMemo, useState } from "react";

import { useApp } from "@/hooks/app.hook";
import { Asset } from "@/types/asset";
import { NoticeType } from "@/types/notice";

import AssetSummaryCards from "./AssetSummaryCards";
import AssetTable from "./AssetTable";
import CreateAssetModal from "./CreateAssetModal";
import TransferAssetModal from "./TransferAssetModal";

export default function AssetManagementClient() {
  const {
    assets,
    users,
    currentUser,
    setAssets,
    notify,
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  const canManageAssets =
    currentUser?.role === "Admin" ||
    currentUser?.role === "Manager";

  const stats = useMemo(() => {
    const total = assets.length;

    const assigned = assets.filter(
      (asset) => asset.status === "Assigned"
    ).length;

    const unassigned = assets.filter(
      (asset) => asset.status === "Assigned"
    ).length;

    const blockchainAssets = assets.filter(
      (asset) => Boolean(asset.tokenId)
    ).length;

    return {
      total,
      assigned,
      unassigned,
      blockchainAssets,
    };
  }, [assets]);

  const handleCreateAsset = async (
    assetData: {
      assetId: string;
      name: string;
      category: string;
      ownerId?: string;
    }
  ) => {
    try {
      setIsCreating(true);

      /*
       * DEMO IMPLEMENTATION
       *
       * Replace this section with:
       *
       * POST /api/assets
       *
       * Backend should:
       * 1. Validate user permission
       * 2. Create metadata
       * 3. Upload metadata to IPFS
       * 4. Mint NFT
       * 5. Save blockchain transaction
       * 6. Return actual asset
       */

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const tokenId = `TOKEN-${Date.now()}`;

      const newAsset: Asset = {
        id: assetData.assetId,
        name: assetData.name,
        type: assetData.category,
        ownerId: assetData.ownerId || "",
        tokenId,
        status: assetData.ownerId ? "Available" : "Assigned",
        date: new Date().toISOString(),
        metadataCid: `ipfs-demo-${Date.now()}`,
        txHash: `0xdemo${Date.now()}`,
      };

      setAssets((previousAssets) => [
        ...previousAssets,
        newAsset,
      ]);

      notify?.("Asset created successfully","success");

      setShowCreateModal(false);
    } catch (error) {
      console.error(error);

      notify?.("Failed to create asset.","error");
    } finally {
      setIsCreating(false);
    }
  };

  const handleTransferAsset = async (
    asset: Asset,
    newOwnerId: string
  ) => {
    try {
      setIsTransferring(true);

      /*
       * DEMO IMPLEMENTATION
       *
       * Replace with:
       *
       * POST /api/assets/:assetId/transfer
       *
       * Backend / smart contract must verify:
       * - caller permission
       * - current owner
       * - new owner
       * - asset existence
       */

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAssets((previousAssets) =>
        previousAssets.map((item) =>
          item.id === asset.id
            ? {
                ...item,
                ownerId: newOwnerId,
                status: "Assigned",
                date: new Date().toISOString(),
              }
            : item
        )
      );

      notify?.("Asset transferred successfully.","success")

      setShowTransferModal(false);
      setSelectedAsset(null);
    } catch (error) {
      console.error(error);

      notify?.("Failed to transfer asset.","error");
    } finally {
      setIsTransferring(false);
    }
  };

  const handleTransferClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowTransferModal(true);
  };

  const handleDetailsClick = (asset: Asset) => {
    console.log("Asset details:", asset);

    // Later:
    // router.push(`/dashboard/assets/${asset.id}`);
  };

  return (
    <div className="space-y-6">
      <AssetSummaryCards stats={stats} />

      <AssetTable
        assets={assets}
        users={users}
        canManageAssets={canManageAssets}
        onCreate={() => setShowCreateModal(true)}
        onTransfer={handleTransferClick}
        onDetails={handleDetailsClick}
      />

      <CreateAssetModal
        open={showCreateModal}
        users={users}
        loading={isCreating}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAsset}
      />

      <TransferAssetModal
        open={showTransferModal}
        asset={selectedAsset}
        users={users}
        loading={isTransferring}
        onClose={() => {
          setShowTransferModal(false);
          setSelectedAsset(null);
        }}
        onSubmit={handleTransferAsset}
      />
    </div>
  );
}