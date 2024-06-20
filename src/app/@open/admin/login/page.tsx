"use client";
import LoginForm from "@/components/custom/LoginForm";
import React, { Suspense } from "react";

const AdminLoginPage = () => {
  return (
    <div className="h-full flex items-center">
      <Suspense>
        <LoginForm isAdminPortal />
      </Suspense>
    </div>
  );
};

export default AdminLoginPage;
