/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useLoginMutation } from "@/redux/features/authApi/authApi";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type z from "zod";
import { loginSchema } from "./zodRegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import UserBlockedDialog from "@/components/UserBlockedDialog";
import { useGetMeQuery } from "@/redux/features/userApi/userApi";
import { Role } from "@/constant";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [blockedOpen, setBlockedOpen] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const { refetch } = useGetMeQuery(undefined);

  const navigateGuard = async (normalizeRole: string) => {
    console.log(normalizeRole);
    if (normalizeRole === Role.rider) {
      navigate("/rider/dashboard");
    }
    if (normalizeRole === Role.driver) {
      navigate("/driver/dashboard");
    }
    if (normalizeRole === Role.admin) {
      navigate("/admin/dashboard");
    }
  };
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(data).unwrap();

      if (res?.success) {
        toast.success(res?.message);

        const userRes = await refetch();

        const roleFromRefetch =
          userRes?.data?.data?.role || userRes?.data?.data?.userId?.role;
        if (roleFromRefetch) {
          const normalizeRole = roleFromRefetch.toLowerCase();
          console.log(normalizeRole);
          await navigateGuard(normalizeRole);
        }
      }
    } catch (error: any) {
      console.log(error);

      if (error?.status === 423 || error?.status === 451) {
        setBlockedMsg(error?.data?.message);
        setBlockedOpen(true);
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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
                      aria-label={showPass ? "Hide password" : "Show password"}
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

          <div>
            <Button
              disabled={isLoading}
              className="w-full mt-5"
              size="lg"
              type="submit"
            >
              {isLoading ? "Wait..." : "Login"}
            </Button>
          </div>

          {blockedMsg && (
            <UserBlockedDialog
              open={blockedOpen}
              onClose={() => setBlockedOpen(false)}
              message={blockedMsg}
            />
          )}
        </form>
      </Form>
      <div className="mt-5 text-lg font-normal">
        <p>
          Are your new?{" "}
          <Link className="text-primary font-medium" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
