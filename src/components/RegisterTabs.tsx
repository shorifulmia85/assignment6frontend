import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Dispatch } from "react";

export default function RegisterTabs({
  role,
  setRole,
}: {
  role: string;
  setRole: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Tabs value={role} onValueChange={setRole} className="items-center ">
      <TabsList className="gap-3 bg-transparent w-full ">
        <TabsTrigger
          value="rider"
          className="border w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground  data-[state=active]:shadow-none"
        >
          Rider
        </TabsTrigger>

        <TabsTrigger
          value="driver"
          className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground  data-[state=active]:shadow-none"
        >
          Driver
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
