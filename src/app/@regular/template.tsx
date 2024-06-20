"use client";
import React from "react";
import SlideTransition from "@/components/custom/SlideTransition";

const Template = ({ children }: { children: React.ReactNode }) => {
  return <SlideTransition>{children}</SlideTransition>;
};

export default Template;
