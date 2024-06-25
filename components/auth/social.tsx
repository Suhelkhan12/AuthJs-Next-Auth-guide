"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <div className="mt-6 flex w-full items-center gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        onClick={() => {}}
        className="w-full"
      >
        <FcGoogle className=" size-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        onClick={() => {}}
        className="w-full"
      >
        <FaGithub className=" size-5" />
      </Button>
    </div>
  );
};
