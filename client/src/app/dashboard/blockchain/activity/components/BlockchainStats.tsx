import { Card } from "@/components/ui/Card";

export default function BlockchainStats() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      {/* Network */}
      <Card
        className="border-slate-800 bg-slate-900 p-4"
        style={{
          backgroundColor: "#0f172b",
          color: "#1d293d",
        }}
      >
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Network
        </div>

        <div className="flex items-center text-lg font-bold text-white">
          <div className="mr-2 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          Sepolia Testnet
        </div>
      </Card>

      {/* Latest Block */}
      <Card
        className="border-slate-800 bg-slate-900 p-4"
        style={{
          backgroundColor: "#0f172b",
          color: "#1d293d",
        }}
      >
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Latest Block
        </div>

        <div className="font-mono text-lg font-bold text-white">#5,182,934</div>
      </Card>

      {/* RPC */}
      <Card
        className="border-slate-800 bg-slate-900 p-4"
        style={{
          backgroundColor: "#0f172b",
          color: "#1d293d",
        }}
      >
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          RPC Connection
        </div>

        <div className="text-lg font-bold text-green-400">Healthy</div>
      </Card>

      {/* Contracts */}
      <Card
        className="border-slate-800 bg-slate-900 p-4"
        style={{
          backgroundColor: "#0f172b",
          color: "#1d293d",
        }}
      >
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Smart Contracts
        </div>

        <div className="text-lg font-bold text-white">3 Active</div>
      </Card>
    </div>
  );
}
