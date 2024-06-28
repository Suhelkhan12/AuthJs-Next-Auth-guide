import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session) return <div>No session found</div>;
  return (
    <div>
      Settings page
      <pre>{session}</pre>
    </div>
  );
};

export default page;
