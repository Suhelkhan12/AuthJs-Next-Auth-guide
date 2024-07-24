"use client";

import React from "react";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return <FormError message="You are not allowed to view this content." />;
  }
  return <>{children}</>;
};

export default RoleGate;
