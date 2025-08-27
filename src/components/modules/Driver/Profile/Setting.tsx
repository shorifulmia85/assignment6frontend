import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Save } from "lucide-react";

const Setting = () => {
  return (
    <div>
      <TabsContent value="settings" className="mt-4">
        <Card className="rounded-2xl border-muted shadow-sm">
          <CardHeader className="pb-2"></CardHeader>
          <Separator />
          <CardContent className="pt-6 grid gap-6 max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="rideUpdates">Ride updates</Label>
                <p className="text-xs text-muted-foreground">
                  Push + email on status changes
                </p>
              </div>
              <Switch id="rideUpdates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing">Marketing emails</Label>
                <p className="text-xs text-muted-foreground">
                  Occasional product updates
                </p>
              </div>
              <Switch id="marketing" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="rounded-xl">
              <Save className="mr-2 h-4 w-4" /> Save preferences
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Setting;
