import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Car, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import carImage from "@/assets/images/car.png";
import type { IDriver } from "@/types/auth";

const VehicleInfo = ({ vehicle }: { vehicle: Partial<IDriver> }) => {
  const form = useForm();

  return (
    <div>
      <TabsContent value="vehicle" className="mt-4">
        <Card className="rounded-2xl border-muted shadow-sm">
          <CardTitle className="text-lg font-bold px-4">Vehicle Info</CardTitle>
          <CardContent>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-6">
                <img src={carImage} alt="" />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Form {...form}>
                  <form className="space-y-5">
                    <FormField
                      control={form.control}
                      name="drivingLicense"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Driving License</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                defaultValue={vehicle?.drivingLicense}
                                readOnly
                                className="pl-9"
                                placeholder="Driving License"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="carModel"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Card Model</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                defaultValue={vehicle?.vehicleInfo?.model}
                                readOnly
                                className="pl-9 pr-10"
                                placeholder="Car Model"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardLicense"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Card License</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                defaultValue={vehicle?.vehicleInfo?.license}
                                readOnly
                                className="pl-9 pr-10"
                                placeholder="Car License"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default VehicleInfo;
