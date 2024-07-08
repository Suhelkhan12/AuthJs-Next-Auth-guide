"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="mt-6 flex w-full items-center gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        onClick={() => onClick("google")}
        className="w-full"
      >
        <FcGoogle className=" size-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        onClick={() => onClick("github")}
        className="w-full"
      >
        <FaGithub className=" size-5" />
      </Button>
    </div>
  );
};
