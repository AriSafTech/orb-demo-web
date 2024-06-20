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
import LanguageSwitcher from "@/components/custom/LanguageSwitcher";
import { Label } from "@/components/ui/label";
import { Components } from "@/api/generated-api-types";

type Props = {
  selfInfo: Components.Schemas.UserResponseAttribute;
};

const Profile = ({ selfInfo }: Props) => {
  //   validation
  const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
    phone: z.string().max(50).optional(),

    address: z.string().max(50).optional(),
    bank_details: z.string().max(50).optional(),
    gender: z.string().max(50).optional(),
    avatar: z
      .union([
        z.string().nullable(),
        z.instanceof(FileList),
        z.instanceof(File),
      ])
      .optional(),
  });

  //   type
  type FormData = z.infer<typeof formSchema>;

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
        toast.success(t.success.profile_update);
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
    <div className="max-w-md mx-auto px-4 overflow-auto h-full">
      <Form {...form}>
        <Card className="w-full shadow-md">
          <CardHeader className="flex flex-col items-start gap-4">
            {/* <CardTitle className="text-center">{t.me.title}</CardTitle> */}
            <CardTitle className="text-center flex justify-center">
              {t.me.title}
            </CardTitle>
            <Avatar className="w-32 h-32 sm:w-48 sm:h-48 self-center">
              {avatarPreview ? (
                <AvatarImage src={avatarPreview} />
              ) : (
                <AvatarImage src={selfInfo.avatar} />
              )}
              <AvatarFallback>
                {selfInfo?.name ? selfInfo.name.charAt(0).toUpperCase() : ""}{" "}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input placeholder={t.me.phone} {...field} type="text" />
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
              <div className="flex flex-col gap-3">
                <Label>{t.me.language}</Label>
                <LanguageSwitcher />
              </div>
              <Button
                type="submit"
                className="w-full !mt-8 mb-4"
                isLoading={isPending}
              >
                {t.me.btn}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};

const ProfilePage = () => {
  const { data: selfInfo } = authService.useMe();
  if (selfInfo) {
    return <Profile selfInfo={selfInfo} />;
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

export default ProfilePage;
