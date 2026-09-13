import { cssClassJoin } from "@/utils/ui.util";
import type { ComponentProps } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends ComponentProps<"select"> {
  label?: string;
  options: SelectOption[];
}

export const Select = ({
  label,
  options,
  className,
  id,
  ...props
}: SelectProps) => (
  <div className={cssClassJoin("space-y-1.5", className)}>
    {label && (
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
    )}

    <select
      id={id}
      className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;