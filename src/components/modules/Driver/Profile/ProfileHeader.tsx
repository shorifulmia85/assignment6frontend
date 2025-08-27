import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IDriver } from "@/types/auth";
import { Camera } from "lucide-react";

// ====== Sub‑components ======
export const ProfileHeader = ({ user }: { user: Partial<IDriver> }) => {
  console.log(user);
  return (
    <Card className="rounded-2xl border border-muted overflow-hidden">
      <div className="-mt-6">
        <img
          className="h-56 w-full object-cover"
          src="https://scontent.fdac24-1.fna.fbcdn.net/v/t39.30808-6/506700885_1821341208414087_7944346551289789721_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGeNey4bIWCwcHs1ve_C6JTenWwv86r0rl6dbC_zqvSuTgq3Vb-2cWgtaU9u0SBSK97ba3Xaob5OaF6-WQJe-kg&_nc_ohc=YCKR5KlaAwkQ7kNvwHLdjq8&_nc_oc=AdnM1fSbWnYSfkNYgS-CPJaWsSPVOdDnX6MZTBeL3idJgvwt0VkJD5M8abF5H3Oa63E&_nc_zt=23&_nc_ht=scontent.fdac24-1.fna&_nc_gid=8a1El9-0Rq3_fCrQDxONAQ&oh=00_AfU0ChYqWnkAnJpdcp1Uvq_-7HR9pHvelYc3UgN7m3Fb5g&oe=68B27299"
          alt=""
        />

        <div className="flex items-center justify-end -mt-14 mr-6">
          <Button variant={"outline"} className="border-none">
            <Camera />
            <span className="hidden lg:block"> Change photo</span>
          </Button>
        </div>
      </div>
      <CardContent className="-mt-6 flex flex-col lg:flex-row items-center gap-4">
        <Avatar className="flex items-center justify-center h-24 w-24 ring-4 ring-background rounded-full">
          <AvatarImage
            src="https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-1/507040319_1821358481745693_7759811219555703310_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHf3NN5Ws2yFg6o6XdXd0w0OCVz4SMuCvs4JXPhIy4K-x9IgLH6OgtTiiuB6GM6j8mAmwVphbkIyPwnhfoqPVSh&_nc_ohc=TT0U9_wQTDoQ7kNvwE024d4&_nc_oc=Adm03iBB1763IDcnh61-kSii9iF9iW8ClipKt6cw7NPxBnxCXRQmRlNvHGyu7TY3yLQ&_nc_zt=24&_nc_ht=scontent.fdac24-5.fna&_nc_gid=8a1El9-0Rq3_fCrQDxONAQ&oh=00_AfUGPcZRXTw6hSFCqtfLLIzbeuG5CjgpFks7aIL2VEydPw&oe=68B28CE1"
            alt="avatar"
          />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center mt-5">
          <div className="flex flex-col ">
            <h2 className="text-2xl font-bold">{user?.userId?.name}</h2>
            <h2 className="text-sm ">{user?.userId?.email}</h2>
          </div>

          <div>{/* <Badge></Badge> */}</div>
        </div>
      </CardContent>
    </Card>
  );
};
