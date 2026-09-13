import AssetManagementClient from "./components/assets/AssetManagementClient";


export default function AssetsPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Asset Management
        </h1>

        <p className="mt-1 text-slate-500">
          Manage organizational assets, ownership and blockchain records.
        </p>
      </div>

      <AssetManagementClient />
    </main>
  );
}