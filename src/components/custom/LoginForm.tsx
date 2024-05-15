"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { useRouter } from "next/navigation";
import { LanguageData } from "@/type";
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
import useLanguageStore from "@/stores/languageStore";

type FormData = {
  email: string;
  password: string;
};

const formSchema: ZodType<FormData> = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values) {
      router.push("/");
    }
  }
  // language data
  // const { data }: { data: LanguageData } = useLanguageStore();
  // const { data } = useLanguageStore();
  // const { login } = data;

  const { data: t } = useLanguageStore();

  return (
    <Form {...form}>
      <div className="w-full flex justify-center">
        <Card className="w-[450px] shadow-md">
          <CardHeader>
            <CardTitle className="text-center">{t.login.title}</CardTitle>
          </CardHeader>
          <CardContent>
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
              If you don&apos;t have an account, please{" "}
              <Link href={"register"} className="text-blue-500 hover:underline">
                Sing up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};

export default LoginForm;
