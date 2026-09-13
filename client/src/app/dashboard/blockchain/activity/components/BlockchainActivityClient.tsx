"use client";

import { useMemo } from "react";

import { useApp } from "@/hooks/app.hook";

import BlockchainStats from "./BlockchainStats";
import BlockchainTransactionTable from "./BlockchainTransactionTable";

export default function BlockchainActivityClient() {
  const { auditLogs } = useApp();

  const blockchainEvents = useMemo(
    () => auditLogs.filter((log) => log.source === "Blockchain"),
    [auditLogs]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Blockchain Network Activity
        </h1>

        <p className="mt-1 text-slate-500">
          Live monitoring of smart contract interactions.
        </p>
      </div>

      <BlockchainStats />

      <BlockchainTransactionTable
        transactions={blockchainEvents}
      />
    </div>
  );
}