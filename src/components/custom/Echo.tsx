import React, { useState, useEffect, useMemo } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

const PusherComponent = () => {
  const { tokens, user } = useAuthStore();
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
          toast.success(data.notification.title);
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
