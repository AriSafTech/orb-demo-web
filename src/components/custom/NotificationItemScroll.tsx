import React, { useEffect } from "react";

import { useInView } from "react-intersection-observer"; // Import useInView if needed

import { userService } from "@/services/user.service";
import { cn } from "@/lib/utils";
import {
  getNotificationMessage,
  NotificationItem,
} from "@/lib/notirfication-utils";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Card } from "../ui/card";

const formatNotificationTime = (notificationTime: string) => {
  const notificationDate = parseISO(notificationTime);

  const now = new Date();
  const diffInMilliseconds = now.getTime() - notificationDate.getTime();

  const millisecondsInAMinute = 1000 * 60;
  const millisecondsInAnHour = millisecondsInAMinute * 60;
  const millisecondsInADay = millisecondsInAnHour * 24;

  if (diffInMilliseconds < millisecondsInAnHour) {
    const minutes = Math.floor(diffInMilliseconds / millisecondsInAMinute);
    return `${minutes} min`;
  } else if (diffInMilliseconds < millisecondsInADay) {
    const hours = Math.floor(diffInMilliseconds / millisecondsInAnHour);
    return `${hours} h`;
  } else {
    const days = Math.floor(diffInMilliseconds / millisecondsInADay);
    return `${days} d`;
  }
};

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
    <Card
      key={notification.id}
      ref={ref}
      className={cn(
        "relative bg-accent/10",
        {
          "bg-accent border border-dashed": !notification.is_seen,
        },
        "my-1.5",
      )}
    >
      <div className="text-sm pt-1.5 p-2">
        {getNotificationMessage(notification, coins)}
        <div className="text-xs text-primary">
          {formatNotificationTime(notification.created_at)}
          {/* {notification.created_at} */}
        </div>
        {!notification.is_seen && (
          <div className="w-2 h-2 rounded-full bg-primary absolute right-2 bottom-2" />
        )}
      </div>
      {/* <Separator className="my-2" /> */}
    </Card>
  );
};

export default NotificationScrollItem;
