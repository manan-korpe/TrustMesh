"use client";

import { useApp } from "@/hooks/app.hook";
import { UserRole } from "@/types/user";

import UserOverview from "./user/UserOverview";
import OrganizationOverview from "./organization/OrganizationOverview";

export default function DashboardOverview() {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <h1>Loading...</h1>;
  }

  if (currentUser.role === UserRole.User) {
    return <UserOverview />;
  }

  return <OrganizationOverview />;
}
