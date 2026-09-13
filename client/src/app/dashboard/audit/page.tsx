import AuditLogsClient from "./components/AuditLogsClient";

export default function AuditPage() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Audit Trail
        </h1>
        <p className="mt-1 text-slate-500">
          Tamper-evident record of identity and asset activities.
        </p>
      </header>

      <AuditLogsClient />
    </main>
  );
}