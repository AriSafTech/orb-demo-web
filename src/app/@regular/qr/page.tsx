"use client";
import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const downloadQRCode = () => {
    const canvas = qrRef?.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Canvas not found");
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="flex flex-col gap-3">
        <div ref={qrRef}>
          <QRCodeCanvas value="http://localhost:3000/payment" />
        </div>
        <Button onClick={downloadQRCode}>Download</Button>
      </div>
    </div>
  );
};

export default Page;