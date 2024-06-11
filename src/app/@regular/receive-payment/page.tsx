"use client";
import React, { useEffect, useMemo, useRef } from "react";
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
import { toast } from "sonner";
import { copyToClipboard, downloadCanvasAsImg } from "@/lib/utils";
import QRBasic from "./QRBasic";
import QRDetails from "./QRDetails";
import { coinService } from "@/services/coin.service";
import Loading from "@/components/custom/Loading";

const ReceivePaymentPage = () => {
  const { tokens, user } = useAuthStore();
  const { data: coinsData, status: coinsStatus } = coinService.useAllCoins();

  console.log("USER:", user);

  const coins = useMemo(
    () => coinsData?.map((cd) => ({ id: cd.coin_id!, name: cd.name! })) ?? [],
    [coinsData],
  );

  useEffect(() => {
    if (coinsStatus === "error") {
      toast.error("Failed to fetch coin data.");
    }
  }, [coinsStatus]);

  return (
    <>
      <Tabs
        defaultValue="qr-basic"
        className="px-4 max-w-sm mx-auto flex flex-col items-center sm:items-start"
      >
        <TabsList className="mx-auto">
          <TabsTrigger value="qr-basic">QR (basic)</TabsTrigger>
          <TabsTrigger value="qr-with-details">QR (with details)</TabsTrigger>
        </TabsList>
        {/* QR BASIC */}
        <TabsContent value="qr-basic">
          <QRBasic receiverId={user!.userName} receiverName={user!.name} />
        </TabsContent>

        {/* QR WITH DETAILS */}
        <TabsContent value="qr-with-details">
          {!coins && <Loading />}
          {coins && (
            <QRDetails
              receiverId={user!.userName}
              receiverName={user!.name}
              coins={coins}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ReceivePaymentPage;
