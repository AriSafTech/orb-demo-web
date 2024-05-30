"use client";
import { authService } from "@/services/auth.service";
import { useLanguageStore } from "@/stores/languageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";

//   validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  phone: z.string().max(50).nullable(),
  address: z.string().max(50).nullable(),
  bank_details: z.string().max(50).nullable(),
  gender: z.enum(["male", "female", "other"]),
  avatar: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});
//   type
type FormData = z.infer<typeof formSchema>;

const Me = () => {
  const router = useRouter();
  const { data: t } = useLanguageStore();
  const { data: selfInfo, status } = authService.useMe();
  //   console.log(selfInfo);

  //   const { user } = useAuthStore();

  //default
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      phone: "",
      address: "",
      bank_details: "",
      gender: "male",
      avatar: "",
    },
  });

  useEffect(() => {
    if (selfInfo) {
      form.reset({
        name: selfInfo?.name,
        phone: selfInfo.phone,
        address: selfInfo.address,
        bank_details: selfInfo?.bank_details,
        gender: "male",
        avatar: "",
      });
    }
  }, [selfInfo, form]);
  const fileRef = form.register("avatar");
  // submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values) {
      console.log(values);

      try {
        // const registerValue = await register(values);
        // // console.log("registerValue", registerValue);
        // toast.success("Registered successfully");
        // router.push("/");
      } catch (e: any) {
        // @ts-ignore
        // if (e.response.status === 422) {
        //   toast.error(t.errors.unprocessableContent);
        // }
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <div className="w-full  flex justify-center items-center">
          <Card className="w-[650px] shadow-md">
            <CardHeader>
              <CardTitle className="text-center">{t.me.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.me.name}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.me.name} {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.me.phone}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.me.phone}
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.me.address}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.me.address}
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
                  name="bank_details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.me.bankDetails}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.me.bankDetails}
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.me.gender}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">{t.me.male}</SelectItem>
                          <SelectItem value="female">{t.me.female}</SelectItem>
                          <SelectItem value="other">{t.me.other}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{t.me.avatar}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder={t.me.avatar}
                            {...fileRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <Button
                  type="submit"
                  className="w-full"
                  // isLoading={isPending}
                >
                  {t.me.btn}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  );
};

export default Me;
