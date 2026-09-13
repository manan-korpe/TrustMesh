import { cssClassJoin } from "@/utils/ui.util";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  style?:Object
}

export const Card = ({ children, className,style={}, noPadding = false }:CardProps) => (
  <div
    className={cssClassJoin(
      "bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden",
      className,
    )}
    style={style}
  >
    {noPadding ? children : <div className="p-6">{children}</div>}
  </div>
);
