import { Database } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const CONTRACTS = ["Identity Registry", "RBAC Manager", "Asset NFT (ERC-721)"];

export default function SmartContractsStatus() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Database className="w-24 h-24" />
      </div>

      <div className="relative z-10">
        <h2 className="text-lg font-semibold mb-2">Smart Contracts</h2>

        <div className="space-y-3 mt-4">
          {CONTRACTS.map((contract, index) => (
            <div
              key={contract}
              className={`
                flex
                justify-between
                items-center
                text-sm
                ${
                  index !== CONTRACTS.length - 1
                    ? "border-b border-white/20 pb-2"
                    : ""
                }
              `}
            >
              <span className="text-blue-100">{contract}</span>

              <Badge
                variant="success"
                className="bg-green-500/20 text-green-100 border-transparent"
              >
                Active
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
