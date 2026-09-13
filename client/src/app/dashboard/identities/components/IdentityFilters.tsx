import { Search } from "lucide-react";

import Select from "@/components/ui/Select";

const DEPARTMENTS = [
  "IT",
  "Operations",
  "Security",
  "Finance",
  "HR",
  "Administration",
];

interface IdentityFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;

  department: string;
  onDepartmentChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;
}

export default function IdentityFilters({
  searchTerm,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
}: IdentityFiltersProps) {
  return (
    <div
      className="
        p-4
        border-b
        border-slate-200
        flex
        flex-col
        sm:flex-row
        space-y-3
        sm:space-y-0
        sm:space-x-4
        bg-slate-50/50
      "
    >

      {/* Search */}
      <div className="relative flex-1 max-w-md">

        <Search
          className="
            w-4
            h-4
            absolute
            left-3
            top-2.5
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search identities..."
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          className="
            w-full
            pl-9
            pr-4
            py-2
            text-sm
            border
            border-slate-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            bg-white
          "
        />

      </div>

      {/* Filters */}
      <div className="flex space-x-2">

        <Select
          value={department}
          onChange={(event) =>
            onDepartmentChange(event.target.value)
          }
          options={[
            {
              label: "All Departments",
              value: "",
            },

            ...DEPARTMENTS.map(
              (department) => ({
                label: department,
                value: department,
              })
            ),
          ]}
          className="w-40"
        />

        <Select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
          options={[
            {
              label: "All Status",
              value: "",
            },
            {
              label: "Verified",
              value: "Verified",
            },
            {
              label: "Pending",
              value: "Pending",
            },
          ]}
          className="w-36"
        />

      </div>

    </div>
  );
}