import { AppRole } from "@/api/api-types";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

type Props = {
  allowedRoles: AppRole[];
  redirectTo: string;
} & PropsWithChildren;

function AuthWrapper({ allowedRoles, redirectTo, children }: Props) {
  const router = useRouter();
  const { tokens, user } = useAuthStore();

  if (
    user == null ||
    tokens?.accessToken == null ||
    !allowedRoles.includes(user.role)
  ) {
    router.push(redirectTo);
  }
  return <>{children}</>;
}

export default AuthWrapper;
