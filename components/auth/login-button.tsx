"use client";
import React from "react";
import { useRouter } from "next/navigation";

// props
interface loginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: loginButtonProps) => {
  const router = useRouter();

  // button click handler
  const onClick = () => {
    router.push("/auth/login");
  };

  return (
    <span className=" cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
