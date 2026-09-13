import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, Size, Variant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Log } from "@/types/log";
import { cssClassJoin } from "@/utils/ui.util";

interface RecentAuditActivityProps {
  logs: Log[];
}

export default function RecentAuditActivity({
  logs,
}: RecentAuditActivityProps) {
  return (
    <Card className="p-6 col-span-2 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Audit Activity
        </h2>

        <Button variant={Variant.Ghost} size={Size.SM}>
          View All
        </Button>
      </div>

      <div className="space-y-4 flex-1">
        {logs.slice(0, 5).map((log) => (
          <div
            key={log.id}
            className="
              flex
              items-start
              p-3
              hover:bg-slate-50
              rounded-lg
              transition-colors
              border
              border-transparent
              hover:border-slate-100
              group
            "
          >
            {/* Status icon */}
            <div
              className={cssClassJoin(
                "p-2 rounded-full mr-4 shrink-0",
                log.status === "Success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600",
              )}
            >
              {log.status === "Success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-900 truncate">
                  <span className="font-semibold text-blue-700">
                    {log.actor}
                  </span>{" "}
                  {log.action}
                </p>

                <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                  {log.time.split(",")[0]}
                </span>
              </div>

              <p className="text-sm text-slate-600 mt-0.5 truncate">
                Target: {log.target}
              </p>

              <div className="flex items-center mt-2 space-x-3">
                <Badge
                  variant={log.source === "Blockchain" ? "primary" : "neutral"}
                  className="text-[10px]"
                >
                  {log.source}
                </Badge>

                {log.hash !== "—" && (
                  <span className="text-xs text-slate-400 font-mono truncate">
                    {log.hash}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
