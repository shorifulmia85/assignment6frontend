import { Card, CardContent } from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import ChangePassword from "@/utils/ChangePassword";

const Security = () => {
  return (
    <div>
      <TabsContent value="security" className="mt-4">
        <Card className="rounded-2xl border-muted shadow-sm">
          <CardContent>
            <ChangePassword />
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Security;
