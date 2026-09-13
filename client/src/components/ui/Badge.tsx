import { cssClassJoin } from "@/utils/ui.util";
import type { ReactNode } from "react";

// enum Variant{
//     success,
//     warning,
//     danger,
//     neutral,
//     primary,
//     purple
// }

interface BadgeProps{
    children?:ReactNode;
     variant?:string
     className?:string
}

export const Badge = ({ children, variant = 'neutral', className }:BadgeProps) => {
  const variants:any = {
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-slate-50 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };
  
  return (
    <span className={cssClassJoin("px-2.5 py-0.5 rounded-full text-xs font-medium border inline-flex items-center", variants[variant] || variants.neutral, className)}>
      {children}
    </span>
  );
};