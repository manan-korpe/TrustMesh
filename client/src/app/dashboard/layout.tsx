"use client";

import Sidebar from "@/components/layout/Sidebar";
import Toast from "@/components/ui/Toast";
import { useApp } from "@/hooks/app.hook";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  const {
    users,
    assets,
    auditLogs,
    currentUser,
    toastMessage,
    setToastMessage,
  } = useApp();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
        <Sidebar userRole={currentUser?.role} />

        <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
          <main className="flex-1 overflow-y-auto p-8 bg-slate-50 custom-scrollbar relative">
            <div className="max-w-6xl mx-auto pb-12">{children}</div>
          </main>
        </div>

        {toastMessage && (
          <Toast
            key={toastMessage.id}
            message={toastMessage.msg}
            type={toastMessage.type}
            onClose={() => setToastMessage(null)}
          />
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `,
          }}
        />
      </div>
    </>
  );
}
