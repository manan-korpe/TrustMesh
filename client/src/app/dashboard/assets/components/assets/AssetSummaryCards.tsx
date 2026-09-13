import {
  Box,
  CheckCircle2,
  Database,
  UserCheck,
} from "lucide-react";

import {Card} from "@/components/ui/Card";

interface AssetSummaryStats {
  total: number;
  assigned: number;
  unassigned: number;
  blockchainAssets: number;
}

interface AssetSummaryCardsProps {
  stats: AssetSummaryStats;
}

export default function AssetSummaryCards({
  stats,
}: AssetSummaryCardsProps) {
  const cards = [
    {
      title: "Total Assets",
      value: stats.total,
      description: "Registered assets",
      icon: Box,
    },
    {
      title: "Assigned",
      value: stats.assigned,
      description: "Assets with owners",
      icon: UserCheck,
    },
    {
      title: "Unassigned",
      value: stats.unassigned,
      description: "Available assets",
      icon: CheckCircle2,
    },
    {
      title: "Blockchain Assets",
      value: stats.blockchainAssets,
      description: "NFT-backed assets",
      icon: Database,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {card.value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {card.description}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-2">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}