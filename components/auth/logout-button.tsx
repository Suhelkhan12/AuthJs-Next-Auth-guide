"use client";

import { logOut } from "@/actions/logout";
import React from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logOut();
  };
  return (
    <span onClick={onClick} className=" cursor-pointer">
      {children}
    </span>
  );
};
