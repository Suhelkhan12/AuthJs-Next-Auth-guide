"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      asChild
      variant={"link"}
      size={"sm"}
      className=" w-full font-normal"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
