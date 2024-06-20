import React, { useState, useEffect, useMemo } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { coinService } from "@/services/coin.service";
import {
  getNotificationMessage,
  NotificationItem,
} from "@/lib/notirfication-utils";

export const notifyUser = (
  notification: NotificationItem,
  coinNames: Record<string, string>,
) => {
  toast.info(getNotificationMessage(notification, coinNames));
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
      const handleNotification = (data: { notification: NotificationItem }) => {
        if (data && coins) {
          notifyUser(data.notification, coins);
        }
      };
      channel.bind("notification-event", handleNotification);
      return () => {
        channel.unbind("notification-event", handleNotification);
        pusher.unsubscribe(`notification-${user.id}`);
      };
    }
  }, [coins, pusher, user?.id]);

  return <div></div>;
};

export default PusherComponent;
