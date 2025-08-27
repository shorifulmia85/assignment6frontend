import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { KeyRound, Mail } from "lucide-react";
import { AvatarCard } from "./AvatarCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { IDriver } from "@/types/auth";

const ContactInfo = ({ user }: { user: Partial<IDriver> }) => {
  const form = useForm();

  const onSubmit = async () => {
    console.log("clicked");
  };
  return (
    <div>
      <TabsContent value="contact" className="mt-4">
        <Card className="rounded-2xl border-muted shadow-sm">
          <CardHeader className="text-lg font-bold">Contact Info</CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-12 gap-6 ">
              <div className="col-span-12 lg:col-span-6">
                {" "}
                <AvatarCard />{" "}
              </div>

              <div className="col-span-12 lg:col-span-6 bg-background border border-muted rounded-2xl p-5">
                {" "}
                <Form {...form}>
                  <form
                    className="space-y-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                defaultValue={user?.userId?.name}
                                className="pl-9"
                                placeholder="Your name"
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
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                className="pl-9 pr-10"
                                placeholder="Phone number"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-end">
                      <Button>Save change</Button>
                    </div>
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

export default ContactInfo;
