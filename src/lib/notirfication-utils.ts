type NotificationUser = {
  id: string;
  name: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  is_seen: boolean;
  coin_id: string;
  variant: "payment_sent" | "payment_received" | "recharged_received";
  created_at: string; // eg. 2024-06-13 10:04:58
  user: NotificationUser;
};

export type PaymentSentNotification = NotificationItem & {
  receiver: NotificationUser;
  amount: string; // eg. "3.00"
  coin_id: string;
};

export type PaymentReceivedNotification = NotificationItem & {
  sender: NotificationUser;
  amount: string; // eg. "3.00"
  coin_id: string;
};

export type RechargeNotification = NotificationItem & {
  variant: "recharged_received";
  sender: NotificationUser;
  amount: string; // eg. "3.00"
  coin_id: string;
};

/**
 *
 * @param notification
 * @param coinNames Record<coin_id, coin_names>
 */
export const getNotificationMessage = (
  notification: NotificationItem,
  coinNames: Record<string, string>,
) => {
  switch (notification.variant) {
    case "payment_received": {
      const n = notification as PaymentReceivedNotification;
      return `You have received a payment of ${n.amount} of coin, ${coinNames[n.coin_id]} from ${n.sender.name}.`;
    }
    case "payment_sent": {
      const n = notification as PaymentSentNotification;
      return `You have sent a payment of ${n.amount} of coin, ${coinNames[n.coin_id]} to ${n.receiver.name}.`;
    }
    case "recharged_received": {
      const n = notification as RechargeNotification;
      return `You have received a recharge of ${n.amount} of coin, ${coinNames[n.coin_id]}.`;
    }
  }
};
