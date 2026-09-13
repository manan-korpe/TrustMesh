"use client";

import { Search } from "lucide-react";

interface AuditLogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AuditLogSearch({
  value,
  onChange,
}: AuditLogSearchProps) {
  return (
    <label className="relative block w-full max-w-sm">
      <span className="sr-only">Filter audit logs</span>
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

      <input
        type="search"
        placeholder="Filter logs..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}