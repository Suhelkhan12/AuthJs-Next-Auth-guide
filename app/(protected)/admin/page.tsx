"use client";
import { UserRole } from "@prisma/client";
import RoleGate from "@/components/auth/role-gate";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const Admin = () => {
  const handleAdminApiClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  };

  const handleServerActionClick = async () => {
    const res = await admin();
    if (res.error) {
      toast.error(res.error);
    }

    if (res.success) {
      toast.success(res.success);
    }
  };
  return (
    <Card className=" w-[90%] sm:w-[600px]">
      <CardHeader>
        <p className=" text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to view this content." />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin only api route.</p>
          <Button onClick={handleAdminApiClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin only server action.</p>
          <Button onClick={handleServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;
