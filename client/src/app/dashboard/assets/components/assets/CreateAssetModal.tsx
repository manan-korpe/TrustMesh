"use client";

import { FormEvent } from "react";

import {Button, Variant} from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {Loader2} from "@/components/ui/Loader";
import Model from "@/components/ui/Model";
import Select from "@/components/ui/Select";

import { User } from "@/types/user";

interface CreateAssetModalProps {
  open: boolean;
  users: User[];
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: {
    assetId: string;
    name: string;
    category: string;
    ownerId?: string;
  }) => void;
}

export default function CreateAssetModal({
  open,
  users,
  loading,
  onClose,
  onSubmit,
}: CreateAssetModalProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const assetId = String(formData.get("assetId") ?? "").trim();

    const name = String(formData.get("name") ?? "").trim();

    const category = String(formData.get("category") ?? "").trim();

    const ownerIdValue = String(formData.get("owner") ?? "").trim();

    onSubmit({
      assetId,
      name,
      category,
      ownerId: ownerIdValue || undefined,
    });
  };

  const ownerOptions = users.map((user) => ({
    label: `${user.name} (${user.email})`,
    value: user.id,
  }));

  return (
    <Model isOpen={open} onClose={onClose} title="Create New Asset">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          name="assetId"
          label="Asset ID"
          placeholder="e.g. LAP-001"
          required
        />

        <Input
          name="name"
          label="Asset Name"
          placeholder="e.g. Dell Laptop"
          required
        />

        <Select
          name="category"
          label="Category"
          required
          options={[
            {
              label: "Laptop",
              value: "Laptop",
            },
            {
              label: "Mobile",
              value: "Mobile",
            },
            {
              label: "Vehicle",
              value: "Vehicle",
            },
            {
              label: "Equipment",
              value: "Equipment",
            },
            {
              label: "Document",
              value: "Document",
            },
            {
              label: "Other",
              value: "Other",
            },
          ]}
        />

        <Select
          name="owner"
          label="Assign Owner"
          options={[
            {
              label: "Unassigned",
              value: "",
            },
            ...ownerOptions,
          ]}
        />

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button
            type="button"
            variant={Variant.Outline}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Asset"
            )}
          </Button>
        </div>
      </form>
    </Model>
  );
}
