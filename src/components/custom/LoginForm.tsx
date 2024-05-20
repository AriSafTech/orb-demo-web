"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { unknown, z, ZodType } from "zod";
import { useRouter } from "next/navigation";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useLanguageStore } from "@/stores/languageStore";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
};

const formSchema: ZodType<FormData> = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const { data: t } = useLanguageStore();
  const { user } = useAuthStore();
  console.log(t.errors?.login_wrongCredentials_title);

  const { mutateAsync: login } = authService.useLogin();
  const { mutateAsync: logout } = authService.useLogout();

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      if (user.role === "consumer" || user.role === "merchant") {
        // TODO: redirect to main dashboard
      } else if (user.role === "admin") {
        logout();
        toast.error(t.errors.login_wrongRole_title, {
          description: t.errors.login_wrongRole_desc,
        });
      }
    }
  }, [logout, user]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values) {
      try {
        const loginValues = await login(values);
        console.log("loginValues", loginValues);
      } catch (e) {
        // form.setError("email", {
        //   message: "Login failed. Please check your credentials.",
        // });
        if (e) {
          // @ts-ignore
          console.log("ERROS STAUS:", e.response.status);
          toast.error(t.errors.login_wrongCredentials_title, {
            description: t.errors.login_wrongCredentials_desc,
          });
          // setError("Login failed. Please check your credentials");
          // setError(t.login.errorMessage);
        }
      }

      // console.log("submitValue", loginValues);
    }
  }

  return (
    <Form {...form}>
      <div className="w-full flex justify-center">
        <Card className="w-[450px] shadow-md">
          <CardHeader>
            <CardTitle className="text-center">{t.login.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.login.email}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.login.email}
                        {...field}
                        type="email"
                        // style={{
                        //   outlineColor: form?.formState?.errors?.email?.message
                        //     ? "red"
                        //     : "initial",
                        // }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.login.password}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.login.password}
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t.login.button}
              </Button>
            </form>
            <p className="text-center mt-2 text-sm">
              {t.login.redirect}{" "}
              <Link href={"register"} className="text-blue-500 hover:underline">
                {t.register.title}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};

export default LoginForm;
