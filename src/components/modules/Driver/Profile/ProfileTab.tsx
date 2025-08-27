import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarFront, ShieldCheck, User } from "lucide-react";

const ProfileTab = () => {
  return (
    <div>
      <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
        <TabsList className="h-11 rounded-2xl px-1">
          <TabsTrigger value="contact" className="rounded-xl">
            <User className="mr-2 h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="vehicle" className="rounded-xl">
            <CarFront className="mr-2 h-4 w-4" />
            Vehicle
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default ProfileTab;
