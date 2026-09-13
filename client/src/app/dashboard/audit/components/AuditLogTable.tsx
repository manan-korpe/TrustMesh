"use client";

import { Badge } from "@/components/ui/Badge";
import { Log } from "@/types/log";
import { Database } from "lucide-react";

interface AuditLogTableProps {
  logs: Log[];
}

export default function AuditLogTable({ logs }: AuditLogTableProps) {
  if (logs.length === 0) {
    return (
      <p className="p-8 text-center text-sm text-slate-500">
        No audit logs match your search.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="whitespace-nowrap px-6 py-4 font-semibold">Timestamp</th>
            <th className="px-6 py-4 font-semibold">Actor</th>
            <th className="px-6 py-4 font-semibold">Action &amp; Target</th>
            <th className="px-6 py-4 font-semibold">Source</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Tx Hash</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {logs.map((log) => (
            <tr key={log.id} className="transition-colors hover:bg-slate-50">
              <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-500">
                {log.time}
              </td>

              <td className="px-6 py-4 font-medium text-slate-900">
                {log.actor}
              </td>

              <td className="px-6 py-4">
                <div className="font-semibold text-slate-900">{log.action}</div>
                <div className="mt-0.5 text-xs text-slate-500">{log.target}</div>
              </td>

              <td className="px-6 py-4">
                <Badge
                  variant={log.source === "Blockchain" ? "primary" : "neutral"}
                  className="text-[10px]"
                >
                  {log.source}
                </Badge>
              </td>

              <td className="px-6 py-4">
                <Badge variant={log.status === "Success" ? "success" : "danger"}>
                  {log.status}
                </Badge>
              </td>

              <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-blue-600">
                {log.hash !== "—" ? (
                  <span
                    className="inline-flex items-center gap-1"
                    title={log.hash}
                  >
                    <Database className="h-3 w-3" />
                    {log.hash.slice(0, 10)}...
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}