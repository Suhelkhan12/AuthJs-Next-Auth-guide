"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Client = () => {
  const user = useCurrentUser();
  return (
    <>
      <UserInfo user={user} label="Client component📱" />
    </>
  );
};

export default Client;
