"use client";
import LoginForm from "@/components/custom/LoginForm";
import React from "react";

const AdminLoginPage = () => {
  return (
    <div className="h-full flex items-center">
      <LoginForm isAdminPortal />
    </div>
  );
};

export default AdminLoginPage;
