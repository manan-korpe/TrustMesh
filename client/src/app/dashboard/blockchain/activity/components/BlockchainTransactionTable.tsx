import { Activity } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Log } from "@/types/log";

import BlockchainTransactionRow from "./BlockchainTransactionRow";

interface BlockchainTransactionTableProps {
  transactions: Log[];
}

export default function BlockchainTransactionTable({
  transactions,
}: BlockchainTransactionTableProps) {
  return (
    <Card noPadding>
      <div className="border-b border-slate-200 bg-slate-50/50 p-4">
        <h2 className="flex items-center font-semibold text-slate-900">
          <Activity className="mr-2 h-4 w-4 text-blue-600" />

          Recent Transactions
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-sm">
          <thead className="border-b border-slate-200 bg-slate-100 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3 font-semibold">
                Tx Hash
              </th>

              <th className="px-6 py-3 font-semibold">
                Method
              </th>

              <th className="px-6 py-3 font-semibold">
                Block
              </th>

              <th className="px-6 py-3 font-semibold">
                Age
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No blockchain transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((log, index) => (
                <BlockchainTransactionRow
                  key={`${log.hash}-${index}`}
                  log={log}
                  index={index}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}