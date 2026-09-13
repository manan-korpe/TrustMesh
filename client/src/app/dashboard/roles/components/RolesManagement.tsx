"use client";

import { useState } from "react";

import Modal from "@/components/ui/Model";
import { useApp } from "@/hooks/app.hook";
import { User } from "@/types/user";
import { generateHash } from "@/utils/seed.util";

import RoleDefinitions from "./RoleDefinitions";
import RoleAssignments from "./RoleAssignments";
import AssignRoleModal from "./AssignRoleModal";

export default function RolesManagement() {
  const {
    users,
    setUsers,
    currentUser,
    addLog,
    notify,
  } = useApp();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState("");
  const [processState, setProcessState] = useState(0);

  const role = currentUser?.role ?? "User";

  const ROLE_DEFS = [
    {
      name: "Admin",
      desc: "Full organizational control",
      perms: [
        "Manage identities",
        "Assign roles",
        "Create/Transfer assets",
      ],
    },
    {
      name: "Manager",
      desc: "Operational management",
      perms: [
        "Create authorized assets",
        "Assign assets",
        "View team assets",
      ],
    },
    {
      name: "Auditor",
      desc: "Read-only compliance access",
      perms: [
        "View identities",
        "View roles",
        "View audit logs",
      ],
    },
    {
      name: "User",
      desc: "Employee access",
      perms: [
        "View own identity",
        "View own assets",
      ],
    },
  ];

  const handleAssign = () => {
    if (!selectedUser) return;

    setProcessState(1);

    setTimeout(() => {
      // RBAC check
      if (currentUser?.role !== "Admin") {
        setProcessState(4);

        addLog(
          "Role Assignment Attempt",
          `${selectedUser.name} → ${newRole}`,
          "API",
          "Blocked",
        );

        setTimeout(() => {
          setProcessState(0);
          setSelectedUser(null);

          notify(
            "Access Denied: Admin role required.",
            "error",
          );
        }, 2000);

        return;
      }

      // Blockchain transaction simulation
      setProcessState(2);

      setTimeout(() => {
        setProcessState(3);

        const txHash = generateHash(64);

        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  role: newRole,
                }
              : user,
          ),
        );

        addLog(
          "Role Assigned",
          `${selectedUser.name} → ${newRole}`,
          "Blockchain",
          "Success",
          txHash,
        );

        notify(
          `Role updated to ${newRole} for ${selectedUser.name}`,
        );

        setTimeout(() => {
          setProcessState(0);
          setSelectedUser(null);
        }, 2000);
      }, 1500);
    }, 1000);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
  };

  const handleCloseModal = () => {
    if (processState === 0) {
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Roles & Permissions
        </h1>

        <p className="text-slate-500 mt-1">
          Blockchain-enforced Role-Based Access Control (RBAC).
        </p>
      </div>

      {/* Static Role Definitions */}
      <RoleDefinitions roles={ROLE_DEFS} />

      {/* Employee Role Assignments */}
      <RoleAssignments
        users={users}
        role={role}
        onSelectUser={handleSelectUser}
      />

      {/* Assign Role Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={handleCloseModal}
        title="Assign Role"
      >
        {selectedUser && (
          <AssignRoleModal
            selectedUser={selectedUser}
            newRole={newRole}
            processState={processState}
            currentRole={currentUser?.role}
            roleDefinitions={ROLE_DEFS}
            onRoleChange={setNewRole}
            onCancel={() => setSelectedUser(null)}
            onConfirm={handleAssign}
          />
        )}
      </Modal>
    </div>
  );
}