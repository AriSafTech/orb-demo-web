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

import { toast } from "sonner";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/stores/authStore";
import Loading from "@/components/custom/Loading";

//   validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  phone: z.string().max(50).optional(),

  address: z.string().max(50).optional(),
  bank_details: z.string().max(50).optional(),
  gender: z.string().max(50).optional(),
  avatar: z
    .union([z.string().nullable(), z.instanceof(FileList), z.instanceof(File)])
    .optional(),
});

//   type
type FormData = z.infer<typeof formSchema>;

const userDetails = () => {
  const { data: selfInfo } = authService.useMe();
  if (selfInfo) {
    return <Me selfInfo={selfInfo} />;
  } else {
    return (
      <div className="h-full flex items-center justify-center">
        <div>
          <Loading />
        </div>
      </div>
    );
  }
};

//@ts-ignore
const Me = ({ selfInfo }) => {
  const router = useRouter();
  const { data: t } = useLanguageStore();
  const { setData, user } = useAuthStore();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: selfInfo.name,
      phone: selfInfo?.phone ?? "",
      address: selfInfo?.address ?? "",
      bank_details: selfInfo?.bank_details ?? "",
      gender: selfInfo?.gender ?? "",
    },
  });

  const { mutateAsync: updateUser, isPending } = userService.useUpdateUserInfo(
    selfInfo?.id as string,
  );
  // submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values) {
      const transformedValues = {
        ...values,
        phone: values.phone === "" ? null : values.phone,
        address: values.address === "" ? null : values.address,
        bank_details: values.bank_details === "" ? null : values.bank_details,
        gender: values.gender === "" ? null : values.gender,
      };

      try {
        //@ts-ignore
        await updateUser(transformedValues);
        toast.success(t.success.success_message);
        router.refresh();
      } catch (e: any) {
        //@ts-ignore
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
                        // onValueChange={field.onChange}
                        // value={field.value || ""}
                        // onValueChange={(value) =>
                        //   field.onChange(value === "unselected" ? null : value)
                        // }
                        // onValueChange={field.onChange}
                        // value={field.value || selfInfo?.gender}
                        defaultValue={field.value || ""}
                        onValueChange={(value) =>
                          field.onChange(value === "" ? null : value)
                        }
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

export default userDetails;
