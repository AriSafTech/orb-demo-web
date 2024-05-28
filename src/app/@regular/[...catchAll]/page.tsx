"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function RegularClosedRedirect() {
  const router = useRouter();

  useEffect(() => {
    // router.replace("/transactions");
    router.replace("/transactions");
  }, [router]);
  return <></>;
}

export default RegularClosedRedirect;
