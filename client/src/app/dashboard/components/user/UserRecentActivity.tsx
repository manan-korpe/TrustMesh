import { Activity } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Log } from "@/types/log";

interface UserRecentActivityProps {
  logs: Log[];
}

export default function UserRecentActivity({ logs }: UserRecentActivityProps) {
  return (
    <Card noPadding>
      <div className="divide-y divide-slate-100">
        {logs.slice(0, 3).map((log, index) => (
          <div
            key={log.id ?? index}
            className="
              p-4
              flex
              items-center
              justify-between
              hover:bg-slate-50
              transition-colors
            "
          >
            <div className="flex items-center">
              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-blue-50
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  mr-4
                "
              >
                <Activity className="w-4 h-4" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900">
                  {log.action}
                </p>

                <p className="text-xs text-slate-500">{log.target}</p>
              </div>
            </div>

            <div className="text-right">
              <Badge variant={log.status === "Success" ? "success" : "danger"}>
                {log.status}
              </Badge>

              <p className="text-xs text-slate-400 mt-1">
                {log.time.split(",")[0]}
              </p>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-sm">
            No recent activity found.
          </div>
        )}
      </div>
    </Card>
  );
}
