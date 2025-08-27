import Loading from "@/components/ui/Loading";
import { useGetMeQuery } from "@/redux/features/userApi/userApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ChangePassword from "@/utils/ChangePassword";

function initials(name?: string) {
  if (!name) return "U";
  const p = name.trim().split(/\s+/);
  return (p[0]?.[0] ?? "U").toUpperCase() + (p[1]?.[0]?.toUpperCase() ?? "");
}

export default function ProfilePage() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const user = data?.data;

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto w-full max-w-md px-2">
      <Card className="rounded-[28px] bg-card shadow-sm border-none">
        {/* Top photo like the sample */}
        <div className="flex w-full items-center justify-center pt-6">
          <Avatar className="h-28 w-28 ring-4 ring-background shadow-sm">
            <AvatarImage
              src={user?.avatarUrl as string | undefined}
              alt={user?.name}
            />
            <AvatarFallback className="text-lg font-semibold">
              {initials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <CardHeader className="pt-4 pb-0">
          <div className="flex items-start justify-between">
            <h2 className="text-[15px] font-semibold">My profile</h2>
            <div className="text-right text-[11px] leading-4 text-muted-foreground">
              <div>
                Last login{" "}
                {new Date().toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="opacity-80">Windows 10 Pro, New York (US)</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 py-4">
          {/* Name + Phone (one line) */}
          <div className="grid grid-cols-1 items-center gap-3 text-sm text-foreground md:grid-cols-2">
            <p className="text-lg font-normal">
              Full Name: <span className="font-semibold">{user?.name}</span>
            </p>
            <p className="text-lg font-normal">
              Email: <span className="font-semibold">{user?.email}</span>
            </p>
            <p className="text-lg font-normal">
              Phone Number:{" "}
              <span className="font-semibold">{user?.phoneNumber}</span>
            </p>
          </div>

          {/* Email */}
          <div className="text-sm text-muted-foreground truncate">
            {user?.email ?? "—"}
          </div>

          <Separator />
          <ChangePassword />
        </CardContent>
      </Card>
    </div>
  );
}
