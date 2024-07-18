"use client";
import { logOut } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Page = () => {
  const user = useCurrentUser();
  console.log(user);
  const handleSignOut = () => {
    logOut();
  };

  return (
    <div className="rounded-xl bg-white p-10">
      <Button type="submit" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default Page;
