"use client";

import { useState } from "react";

import { useApp } from "@/hooks/app.hook";
import { User } from "@/types/user";
import { generateDID, generateHash } from "@/utils/seed.util";

import IdentityHeader from "./IdentityHeader";
import IdentityFilters from "./IdentityFilters";
import IdentityTable from "./IdentityTable";
import CreateEmployeeModal from "./CreateEmployeeModal";

export default function IdentityManagement() {
  const {
    users,
    currentUser,
    setUsers,
    addLog,
    notify,
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [isVerifying, setIsVerifying] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  /*
   * Filter users
   */
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(search) ||
      user.id.toLowerCase().includes(search);

    const matchesDepartment =
      !departmentFilter ||
      user.dept === departmentFilter;

    const matchesStatus =
      !statusFilter ||
      user.status === statusFilter;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesStatus
    );
  });

  /*
   * Create employee
   */
  const handleCreateEmployee = (employee: User) => {
    setUsers((prev) => [
      employee,
      ...prev,
    ]);

    setIsAdding(false);

    notify(
      `Employee invitation created for ${employee.name}`
    );

    addLog(
      "Employee Created",
      `${employee.name} (${employee.id})`,
      "System",
      "Success"
    );
  };

  /*
   * Simulate blockchain verification
   */
  const handleSimulateVerification = (user: User) => {
    setIsVerifying(user.id);

    setTimeout(() => {
      const newWallet = generateHash(40);

      setUsers((prev) =>
        prev.map((currentUser) =>
          currentUser.id === user.id
            ? {
                ...currentUser,
                status: "Verified",
                wallet: newWallet,
                did: generateDID(newWallet),
                registeredAt:
                  new Date().toISOString(),
              }
            : currentUser
        )
      );

      setIsVerifying(null);

      notify(
        `Identity verified for ${user.name}`
      );

      addLog(
        "Identity Registered",
        user.name,
        "Blockchain",
        "Success",
        generateHash(64)
      );
    }, 2000);
  };

  /*
   * Permissions
   */
  const canCreateEmployee =
    currentUser?.role === "Admin" ||
    currentUser?.role === "Manager";

  const canVerifyIdentity =
    currentUser?.role === "Admin";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Header */}
      <IdentityHeader
        canCreateEmployee={canCreateEmployee}
        onAddEmployee={() => setIsAdding(true)}
      />

      {/* Main table */}
      <div>
        <IdentityFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          department={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          status={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <IdentityTable
          users={filteredUsers}
          canVerifyIdentity={canVerifyIdentity}
          verifyingUserId={isVerifying}
          onVerify={handleSimulateVerification}
        />
      </div>

      {/* Create Employee Modal */}
      <CreateEmployeeModal
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        usersCount={users.length}
        onCreateEmployee={handleCreateEmployee}
      />

    </div>
  );
}