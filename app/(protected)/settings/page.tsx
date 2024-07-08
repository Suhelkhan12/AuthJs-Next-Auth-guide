import { wait } from "@/actions/wait";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();

  if (!session) return <div>No session found</div>;
  return (
    <div>
      Settings page
      <pre>{JSON.stringify(session)}</pre>
      <form
        action={async () => {
          "use server";
          await wait(1500);
          await signOut({
            redirectTo: "/auth/login",
          });
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default page;
