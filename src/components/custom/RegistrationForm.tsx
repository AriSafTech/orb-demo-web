"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
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
import { AppRole, RegistrationRoles } from "@/api/api-types";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(50),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must have at least 6 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    role: z.enum(["consumer", "merchant"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const { mutateAsync: register } = authService.useRegister();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "consumer",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values) {
      const registerValue = await register(values);
      console.log("registerValue", registerValue);
    }
  }

  const { data: t } = useLanguageStore();

  // TODO: add role dropdown
  return (
    <Form {...form}>
      <div className="w-full  flex justify-center items-center">
        <Card className="w-[450px] shadow-md">
          <CardHeader>
            <CardTitle className="text-center">{t.register.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.register.name}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.register.name}
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.register.email}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.register.email}
                        {...field}
                        type="email"
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
                    <FormLabel>{t.register.password}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.register.password}
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.register.confirmPassword}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.register.confirmPassword}
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t.register.button}
              </Button>
            </form>
            <p className="text-center mt-2 text-sm">
              {t.register.redirect}{" "}
              <Link href={"login"} className="text-blue-500 hover:underline">
                {t.login.title}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};

export default RegistrationForm;
