import React, { useState, useEffect, useMemo } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { coinService } from "@/services/coin.service";

export const notifyUser = (notification: any, coinName: string | null) => {
  const { variant, amount, receiver, sender } = notification;

  switch (variant) {
    case "recharged_received":
      toast.info(
        `You have received a recharge of ${amount} of coin, ${coinName}.`,
      );
      break;
    case "payment_sent":
      toast.info(
        `You have sent a payment of ${amount} of coin, ${coinName} to ${receiver.name}.`,
      );
      break;
    case "payment_received":
      toast.info(
        `You have received a payment of ${amount} of coin, ${coinName} from ${sender.name}.`,
      );
      break;
    default:
      console.warn(`Unknown notification variant: ${variant}`);
  }
};

const PusherComponent = () => {
  const { tokens, user } = useAuthStore();
  const { data: coinsData } = coinService.useAllCoins();
  const coins = useMemo(
    () =>
      coinsData
        ? Object.fromEntries(coinsData.map((c) => [c.coin_id!, c.name!]))
        : null,
    [coinsData],
  );

  // Pusher.logToConsole = true;
  const pusher = useMemo(() => {
    return new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      const channel = pusher.subscribe(`notification-${user.id}`);
      const handleNotification = (data: any) => {
        if (data) {
          //   console.log(data);
          const coinName = coins ? coins[data.notification.coin_id] : null;
          notifyUser(data.notification, coinName);
        }
      };
      channel.bind("notification-event", handleNotification);
      return () => {
        channel.unbind("notification-event", handleNotification);
        pusher.unsubscribe(`notification-${user.id}`);
      };
    }
  }, [pusher, user?.id]);

  return <div></div>;
};

export default PusherComponent;
