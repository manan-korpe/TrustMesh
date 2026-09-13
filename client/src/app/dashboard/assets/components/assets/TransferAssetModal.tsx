"use client";

import { FormEvent } from "react";
import { ArrowRight } from "lucide-react";

import {Button} from "@/components/ui/Button";
import {Loader2} from "@/components/ui/Loader";
import Model from "@/components/ui/Model";
import Select from "@/components/ui/Select";

import { Asset } from "@/types/asset";
import { User } from "@/types/user";

interface TransferAssetModalProps {
  open: boolean;
  asset: Asset | null;
  users: User[];
  loading: boolean;
  onClose: () => void;
  onSubmit: (
    asset: Asset,
    newOwnerId: string
  ) => void;
}

export default function TransferAssetModal({
  open,
  asset,
  users,
  loading,
  onClose,
  onSubmit,
}: TransferAssetModalProps) {
  if (!asset) {
    return null;
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newOwnerId = String(
      formData.get("newOwner") ?? ""
    ).trim();

    if (!newOwnerId) {
      return;
    }

    onSubmit(asset, newOwnerId);
  };

  const ownerOptions = users
    .filter((user) => user.id !== asset.ownerId)
    .map((user) => ({
      label: `${user.name} (${user.email})`,
      value: user.id,
    }));

  const currentOwner = users.find(
    (user) => user.id === asset.ownerId
  );

  return (
    <Model
      isOpen={open}
      onClose={onClose}
      title="Transfer Asset"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Asset */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase text-slate-500">
            Asset
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {asset.name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {asset.id}
          </p>
        </div>

        {/* Current owner */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-500">
              Current Owner
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {currentOwner?.name ?? "Unassigned"}
            </p>
          </div>

          <ArrowRight className="h-5 w-5 text-slate-400" />

          <div className="flex-1">
            <p className="text-xs font-medium text-slate-500">
              New Owner
            </p>

            <p className="mt-1 text-sm font-medium text-blue-600">
              Select below
            </p>
          </div>
        </div>

        <Select
          name="newOwner"
          label="New Owner"
          required
          options={ownerOptions}
        />

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Transferring...
              </>
            ) : (
              "Transfer Asset"
            )}
          </Button>
        </div>
      </form>
    </Model>
  );
}