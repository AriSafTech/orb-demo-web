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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/stores/authStore";

//   validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  phone: z
    .string()
    .max(50)
    .optional()
    .transform((data) => (data === "" ? null : data)),

  address: z
    .string()
    .max(50)
    .optional()
    .transform((data) => (data === "" ? null : data)),
  bank_details: z
    .string()
    .max(50)
    .optional()
    .transform((data) => (data === "" ? null : data)),
  gender: z
    .string()
    .max(50)
    .optional()
    .transform((data) => (data === "" ? null : data)),
  // gender: z.enum(["male", "female", "other", ""]).nullable(),
  // avatar: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
  avatar: z
    .union([z.string().nullable(), z.instanceof(FileList), z.instanceof(File)])
    .optional(),
});
//   type
type FormData = z.infer<typeof formSchema>;

const Me = () => {
  const router = useRouter();
  const { data: t } = useLanguageStore();
  const { setData, user } = useAuthStore();
  const { data: selfInfo, status } = authService.useMe();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // console.log(selfInfo);
  //   const { user } = useAuthStore();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      phone: selfInfo?.phone || null,
      address: null,
      bank_details: null,
      gender: null,
    },
  });

  useEffect(() => {
    if (selfInfo) {
      form.reset({
        name: selfInfo?.name,
        phone: selfInfo.phone || "",
        address: selfInfo.address || "",
        bank_details: selfInfo?.bank_details || "",
        gender: selfInfo?.gender ?? "",
        avatar: selfInfo?.avatar || "",
      });
    }
  }, [selfInfo, form]);

  // ref
  const fileRef = form.register("avatar");
  const { mutateAsync: myInfo, isPending } = userService.useSelfUser(
    selfInfo?.id as string,
  );
  // submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values) {
      console.log(values);

      try {
        const registerValue = await myInfo(values);
        // // console.log("registerValue", registerValue);
        toast.success("Updated successfully");
        // router.push("/");
        router.refresh();
      } catch (e: any) {
        // @ts-ignore
        if (e.response.status === 422) {
          toast.error(t.errors.unprocessableContent);
        }
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <div className="w-full  flex justify-center items-center">
          <Card className="w-[650px] shadow-md">
            <CardHeader>
              {/* <CardTitle className="text-center">{t.me.title}</CardTitle> */}
              <CardTitle className="text-center flex justify-center">
                {" "}
                <Avatar>
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} />
                  ) : selfInfo?.avatar ? (
                    <AvatarImage src={selfInfo.avatar} />
                  ) : (
                    <AvatarFallback>
                      {selfInfo?.name
                        ? selfInfo.name.charAt(0).toUpperCase()
                        : ""}{" "}
                    </AvatarFallback>
                  )}
                </Avatar>
              </CardTitle>
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
                  render={({ field }: any) => (
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
                  render={({ field }: any) => (
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
                  render={({ field }: any) => (
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
                        // onValueChange={field.onChange}
                        defaultValue={field.value || selfInfo?.gender}
                        onValueChange={(value) =>
                          field.onChange(value === "" ? null : value)
                        }
                        // value={field.value || selfInfo?.gender}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="unselected">
                            ----Unselected---
                          </SelectItem>
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
                    const handleFileChange = (
                      event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                      const file = event.target.files?.[0];
                      form.setValue("avatar", file || null);
                      if (file) {
                        setAvatarPreview(URL.createObjectURL(file));
                      } else {
                        setAvatarPreview(null);
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel>{t.me.avatar}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder={t.me.avatar}
                            onChange={handleFileChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <Button type="submit" className="w-full" isLoading={isPending}>
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
