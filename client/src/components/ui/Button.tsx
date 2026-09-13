import type { ReactNode, ComponentProps } from "react";
import { cssClassJoin } from "@/utils/ui.util";
import { Loader2 } from "./Loader";

export enum Variant {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
  Ghost = "ghost",
  Outline = "outline",
}

export enum Size {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = Variant.Primary,
  size = Size.MD,
  className,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const variants: Record<Variant, string> = {
    [Variant.Primary]:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm border border-transparent",

    [Variant.Secondary]:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",

    [Variant.Danger]:
      "bg-red-600 text-white hover:bg-red-700 shadow-sm border border-transparent",

    [Variant.Ghost]:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900",

    [Variant.Outline]:
      "bg-transparent text-blue-600 border border-blue-200 hover:bg-blue-50",
  };

  const sizes: Record<Size, string> = {
    [Size.SM]: "px-3 py-1.5 text-xs",
    [Size.MD]: "px-4 py-2 text-sm",
    [Size.LG]: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cssClassJoin(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}

      {children}
    </button>
  );
};