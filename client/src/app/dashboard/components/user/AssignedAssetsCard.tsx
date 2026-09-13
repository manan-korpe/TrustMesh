import { Box } from "lucide-react";

import {
  Button,
  Size,
  Variant,
} from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";

interface AssignedAssetsCardProps {
  assetCount: number;
}

export default function AssignedAssetsCard({
  assetCount,
}: AssignedAssetsCardProps) {
  return (
    <Card className="p-6 flex flex-col justify-between">

      <div>

        <div className="flex items-center text-slate-600 font-medium mb-4">
          <Box className="w-5 h-5 mr-2 text-purple-500" />

          Assigned Assets
        </div>

        <div className="text-3xl font-bold text-slate-900 mb-1">
          {assetCount}
        </div>

      </div>

      <Button
        variant={Variant.Outline}
        className="w-full mt-4"
        size={Size.SM}
      >
        View My Assets
      </Button>

    </Card>
  );
}