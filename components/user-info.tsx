import { ExtenedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtenedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className=" w-[90%] shadow-sm md:w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <span>ID</span>
          <p className=" max-w-[180px] truncate rounded-sm bg-slate-100 p-1 text-xs font-medium ">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <span>Username</span>
          <p className=" max-w-[180px] truncate rounded-sm bg-slate-100 p-1 text-xs font-medium ">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <span>Useremail</span>
          <p className=" max-w-[180px] truncate rounded-sm bg-slate-100 p-1 text-xs font-medium ">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <span>Role</span>
          <p className=" max-w-[180px] truncate rounded-sm bg-slate-100 p-1 text-xs font-medium ">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <span>2FA</span>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "On" : "Off"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
