"use client";
import React, { useMemo, useRef, useState } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

type Props = {
  link: string | null;
  message: string | null;
};
function QRCommon({ link, message }: Props) {
  const { data: t } = useLanguageStore();
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center items-center my-4">
      <div className="flex flex-col gap-3">
        <div ref={qrRef}>
          {link && <QRCodeCanvas value={link} />}
          {!link && (
            <div className="w-[128px] h-[128px] bg-accent flex flex-col justify-center items-center p-4 text-center opacity-70">
              <p>{t.receivePayment.qr_details_please_fill_out_form}</p>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-2">
          {/* DOWNLOAD */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={!link}
                  onClick={() => downloadCanvasAsImg(qrRef, "orb-qr-code")}
                >
                  <DownloadIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.receivePayment.tooltip_download}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* COPY MESSAGE */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={!message}
                  onClick={() =>
                    message &&
                    copyToClipboard(message, "Copied message to clipboard.")
                  }
                >
                  <CopyIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.receivePayment.tooltip_message}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* COPY LINK */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={!link}
                  onClick={() =>
                    link && copyToClipboard(link, "Copied link to clipboard.")
                  }
                >
                  <LinkIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.receivePayment.tooltip_link}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default QRCommon;
