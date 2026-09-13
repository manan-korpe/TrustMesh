import {
  AlertCircle,
} from "lucide-react";

import Modal from "@/components/ui/Model";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

import {
  Button,
  Variant,
} from "@/components/ui/Button";

import { Department } from "@/types/department";
import { User, UserRole } from "@/types/user";

const DEPARTMENTS = [
  "IT",
  "Operations",
  "Security",
  "Finance",
  "HR",
  "Administration",
];

interface CreateEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  usersCount: number;
  onCreateEmployee: (user: User) => void;
}

export default function CreateEmployeeModal({
  isOpen,
  onClose,
  usersCount,
  onCreateEmployee,
}: CreateEmployeeModalProps) {

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const newEmployee: User = {
      id: String(
        formData.get("empId")
      ),

      name: String(
        formData.get("name")
      ),

      email: String(
        formData.get("email")
      ),

      dept:
        String(
          formData.get("dept")
        ) as Department,

      role: UserRole.User,

      status: "Pending",

      wallet: null,

      did: null,

      active: true,
    };

    onCreateEmployee(newEmployee);

    event.currentTarget.reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Employee Invitation"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Name */}
        <Input
          label="Full Name"
          name="name"
          placeholder="e.g. Jane Doe"
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@TrustMesh.com"
          required
        />

        {/* ID + Department */}
        <div className="grid grid-cols-2 gap-4">

          <Input
            label="Employee ID"
            name="empId"
            defaultValue={`EMP-00${
              usersCount + 1
            }`}
            required
          />

          <Select
            label="Department"
            name="dept"
            options={DEPARTMENTS.map(
              (department) => ({
                label: department,
                value: department,
              })
            )}
            required
          />

        </div>

        {/* Information */}
        <div
          className="
            bg-blue-50
            p-3
            rounded-lg
            flex
            items-start
            border
            border-blue-100
            mt-4
            text-sm
            text-blue-800
          "
        >

          <AlertCircle
            className="
              w-5
              h-5
              mr-2
              shrink-0
              mt-0.5
            "
          />

          <p>
            An invitation will be sent.
            The employee must connect
            their wallet to generate
            their Decentralized ID and
            verify their status.
          </p>

        </div>

        {/* Actions */}
        <div
          className="
            flex
            justify-end
            space-x-3
            pt-4
            border-t
            border-slate-100
            mt-6
          "
        >

          <Button
            type="button"
            variant={Variant.Ghost}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            Create Invitation
          </Button>

        </div>

      </form>

    </Modal>
  );
}