import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      {children}
      <footer className=" fixed bottom-0 flex w-full items-center justify-center py-4 text-center">
        <p className=" text-sm text-white">Implemented with ❤️ by </p>
        <Button asChild variant={"link"}>
          <Link
            href={"https://www.linkedin.com/in/suhell-khan/"}
            target="_blank"
            className="text-white"
          >
            Suhel
          </Link>
        </Button>
      </footer>
    </div>
  );
};

export default AuthLayout;
