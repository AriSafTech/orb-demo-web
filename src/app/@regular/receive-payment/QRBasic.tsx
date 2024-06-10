"use client";
import React, { useMemo, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LuDownload as DownloadIcon } from "react-icons/lu";
import { FaRegCopy as CopyIcon } from "react-icons/fa";
import { IoUnlinkOutline as LinkIcon } from "react-icons/io5";
import { copyToClipboard, downloadCanvasAsImg } from "@/lib/utils";
import {
  generateBasicPaymentMessage,
  generatePaymentLink,
} from "@/lib/payment-utils";
import QRCommon from "./QRCommon";

type Props = {
  receiverId: string;
  receiverName: string;
};

const QRBasic = ({ receiverId, receiverName }: Props) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const link = useMemo(() => generatePaymentLink({ receiverId }), [receiverId]);
  const message = useMemo(
    () => generateBasicPaymentMessage({ receiverName, link }),
    [link, receiverName],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic QR code</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Requires sender to designate coin type and amount.
        </CardDescription>
        <QRCommon link={link} message={message} />
      </CardContent>
    </Card>
  );
};

export default QRBasic;
