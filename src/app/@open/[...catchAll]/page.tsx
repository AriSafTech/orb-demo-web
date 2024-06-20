"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

function OpenRedirect() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams().toString();

  useEffect(() => {
    if (path && searchParams) {
      router.replace(
        `/login?redirectTo=${path}${encodeURIComponent("?" + searchParams)}`,
      );
    } else if (path) {
      router.replace(`/login?redirectTo=${path}`);
    } else {
      router.replace("/login");
    }
  }, [router, path, searchParams]);
  return <></>;
}

function OpenRedirectPage() {
  return (
    <Suspense>
      <OpenRedirect />
    </Suspense>
  );
}

export default OpenRedirectPage;
