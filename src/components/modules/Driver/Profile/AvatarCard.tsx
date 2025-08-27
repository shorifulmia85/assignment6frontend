import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export function AvatarCard() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-muted bg-card p-4 text-center">
      <Avatar className="h-24 w-24">
        <AvatarImage src="https://i.pravatar.cc/200?img=5" alt="avatar" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">Profile Photo</p>
        <p className="text-xs text-muted-foreground">JPG or PNG, max 2MB</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="rounded-xl">
          <Camera className="mr-2 h-4 w-4" /> Upload
        </Button>
        <Button variant="ghost" size="sm" className="rounded-xl">
          Remove
        </Button>
      </div>
    </div>
  );
}
