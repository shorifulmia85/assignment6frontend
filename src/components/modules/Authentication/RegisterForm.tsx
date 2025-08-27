/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { schemaFor, DriverSchema, RiderSchema } from "./zodRegisterSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Car,
  Eye,
  EyeOff,
  IdCard,
  KeyRound,
  Mail,
  Phone,
  User,
} from "lucide-react";
import {
  useRegisterDriverMutation,
  useRegisterRiderMutation,
} from "@/redux/features/authApi/authApi";
import toast from "react-hot-toast";
import type { IDriver, IUser } from "@/types/auth";
import { Link, useNavigate } from "react-router";

// ---------- Types ----------
export type RiderFormInputs = z.infer<typeof RiderSchema>;
export type DriverFormInputs = z.infer<typeof DriverSchema>;
export type FormInputs = RiderFormInputs | DriverFormInputs;

type Role = "rider" | "driver";

const RegisterForm = ({ role }: { role: string }) => {
  const normalizedRole: Role =
    role?.trim().toLowerCase() === "driver" ? "driver" : "rider";

  const schema = useMemo(() => schemaFor(normalizedRole), [normalizedRole]);

  const defaultValues: FormInputs =
    normalizedRole === "driver"
      ? ({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          drivingLicense: "",
          vehicleInfo: { model: "", license: "" },
        } as DriverFormInputs)
      : ({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
        } as RiderFormInputs);

  const form = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [showPass, setShowPass] = useState(false);
  const [registerDriver, { isLoading }] = useRegisterDriverMutation();
  const [registerRider, { isLoading: riderLoading }] =
    useRegisterRiderMutation();
  const navigate = useNavigate();

  // runtime type guard
  const isDriverForm = (d: FormInputs): d is DriverFormInputs =>
    !!(d as any).drivingLicense &&
    !!(d as any).vehicleInfo?.model &&
    !!(d as any).vehicleInfo?.license;

  const onSubmit = async (data: FormInputs) => {
    const basePayload: IUser = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    };

    try {
      if (normalizedRole === "driver") {
        if (!isDriverForm(data)) {
          toast.error("Driver info missing");
          return;
        }
        const driverPayload: IDriver = {
          ...basePayload,
          drivingLicense: data.drivingLicense,
          vehicleInfo: {
            model: data.vehicleInfo.model,
            license: data.vehicleInfo.license,
          },
        };
        const res = await registerDriver(driverPayload).unwrap();
        if ((res as any)?.success)
          toast.success((res as any)?.message ?? "Driver created");
        navigate("/login");
      } else {
        const riderPayload: IUser = basePayload;
        const res = await registerRider(riderPayload).unwrap();
        if ((res as any)?.success)
          toast.success((res as any)?.message ?? "Rider created");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Registration failed");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl className="relative">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="Full name"
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        type="email"
                        placeholder="you@example.com"
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
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="01712345678"
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
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-9 pr-10"
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent"
                        aria-label={
                          showPass ? "Hide password" : "Show password"
                        }
                      >
                        {showPass ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {normalizedRole === "driver" && (
            <div className="space-y-5 mt-5">
              <FormField
                control={form.control}
                name="drivingLicense"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Driving License</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="DL-2025-123456"
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
                name="vehicleInfo.model"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="e.g. Toyota Axio 2019"
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
                name="vehicleInfo.license"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Vehicle License</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="DHA-123456"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div>
            <Button
              disabled={isLoading || riderLoading}
              className="w-full mt-5"
              size="lg"
              type="submit"
            >
              {isLoading || riderLoading ? "Wait..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-5 text-lg font-normal">
        <p>
          Already have and account?{" "}
          <Link className="bg-background font-medium" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
