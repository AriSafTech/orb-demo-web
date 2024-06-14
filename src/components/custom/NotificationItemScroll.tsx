import React, { useEffect } from "react";

import { useInView } from "react-intersection-observer"; // Import useInView if needed

import { userService } from "@/services/user.service";
import { cn } from "@/lib/utils";
import {
  getNotificationMessage,
  NotificationItem,
} from "@/lib/notirfication-utils";
import { Separator } from "@/components/ui/separator";

const NotificationScrollItem = ({
  notification,
  coins,
}: {
  notification: NotificationItem;
  coins: Record<string, string>;
}) => {
  const { mutateAsync: updateIsSeenStatus } =
    userService.useUpdateUserIsSeenNotifications(notification.id);
  const [ref, inView] = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView && !notification.is_seen) {
      updateIsSeenStatus({ is_seen: true });
    }
  }, [inView, notification.is_seen, updateIsSeenStatus]);

  return (
    <div
      key={notification.id}
      ref={ref}
      className={cn({
        "bg-secondary": !notification.is_seen,
      })}
    >
      <div className="text-sm pt-1.5 px-2">
        {getNotificationMessage(notification, coins)}
        <div className="text-xs">{notification.created_at}</div>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default NotificationScrollItem;
