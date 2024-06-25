import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

const page = () => {
  return (
    <>
      <main className=" flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <div className=" space-y-6 text-center">
          <h1
            className={cn(
              "text-6xl font-semibold text-white drop-shadow-sm ",
              poppins.className
            )}
          >
            🔐 Auth
          </h1>
          <p className="text-lg text-white">
            Simple auth setup with AuthJs and prisma.
          </p>
          <div>
            <LoginButton>
              <Button size={"lg"} variant={"secondary"}>
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
      </main>
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
    </>
  );
};

export default page;
