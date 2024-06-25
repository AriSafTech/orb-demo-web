"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { z } from "zod";
import { authService } from "@/services/auth.service";
import Loading from "@/components/custom/Loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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

import { LuDownload as DownloadIcon } from "react-icons/lu";
import { FaRegCopy as CopyIcon } from "react-icons/fa";
import { IoUnlinkOutline as LinkIcon } from "react-icons/io5";
import { toast } from "sonner";
import { copyToClipboard, downloadCanvasAsImg } from "@/lib/utils";
import {
  generateDetailedPaymentMessage,
  generatePaymentLink,
} from "@/lib/payment-utils";
import { Label } from "@/components/ui/label";
import { useLanguageStore } from "@/stores/languageStore";
import { Input } from "@/components/ui/input";
import QRCommon from "./QRCommon";
import { userService } from "@/services/user.service";

type CoinData = {
  id: string;
  name: string;
};

type Props = {
  receiverId: string;
  receiverName: string;
  coins: CoinData[];
};

const QRDetails = ({ receiverId, receiverName, coins }: Props) => {
  const { data: t } = useLanguageStore();

  const coinsMap = useMemo(
    () => Object.fromEntries(coins.map((c) => [c.id, c])),
    [coins],
  );

  const [coin, setCoin] = useState<CoinData | null>(null);
  const [amount, setAmount] = useState<number>(0);

  // const qrLinkBasic = useMemo(
  //   () => `${BASE_URL}payment?receiverId=${receiverId}`,
  //   [receiverId],
  // );

  const link = useMemo(
    () =>
      coin != undefined && amount > 0
        ? generatePaymentLink(
            {
              receiverId,
              amount,
              coinId: coin.id ?? undefined,
            },
            true,
          )
        : null,
    [amount, coin, receiverId],
  );

  const message = useMemo(
    () =>
      coin != undefined && link != undefined
        ? generateDetailedPaymentMessage({
            receiverName,
            amount,
            coinName: coin.name,
            link,
          })
        : null,
    [amount, coin, link, receiverName],
  );

  return (
    <Card className="overflow-auto h-[450px]">
      <CardHeader>
        <CardTitle>{t.receivePayment.qr_details_title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{t.receivePayment.qr_details_desc}</CardDescription>
        <div className="flex flex-col gap-2 my-8">
          {/* COIN */}
          <Label className="mt-2">{t.receivePayment.coin}</Label>
          <Select
            onValueChange={(val) =>
              setCoin(val != undefined ? coinsMap[val] ?? null : null)
            }
            defaultValue={undefined}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder={t.receivePayment.coin_placeholder} />
            </SelectTrigger>
            <SelectContent>
              {coins.map((coin) => (
                <SelectItem key={coin.id} value={coin.id}>
                  {coin.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* AMOUNT */}
          <Label className="mt-4">{t.receivePayment.amount}</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder={t.receivePayment.amount_placeholder}
          />
        </div>
        <QRCommon link={link} message={message} />
      </CardContent>
    </Card>
  );
};

export default QRDetails;
