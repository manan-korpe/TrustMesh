"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/hooks/app.hook";
import AuditLogSearch from "./AuditLogSearch";
import AuditLogTable from "./AuditLogTable";

export default function AuditLogsClient() {
  const { auditLogs } = useApp();
  const [filter, setFilter] = useState("");

  const filteredLogs = useMemo(() => {
    const query = filter.trim().toLowerCase();

    if (!query) return auditLogs;

    return auditLogs.filter((log) =>
      [log.actor, log.action, log.target].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [auditLogs, filter]);

  return (
    <Card noPadding>
      <div className="border-b border-slate-200 bg-slate-50/50 p-4">
        <AuditLogSearch value={filter} onChange={setFilter} />
      </div>

      <AuditLogTable logs={filteredLogs} />
    </Card>
  );
}