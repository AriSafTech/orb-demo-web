const BASE_URL = process.env.NEXT_PUBLIC_WEB_BASE_URL;

export function generatePaymentLink(
  {
    receiverId,
    amount,
    coinId,
  }: {
    receiverId: string;
    amount?: number;
    coinId?: string;
  },
  confirmOnly = false,
) {
  const baseUrl = BASE_URL.endsWith("/") ? BASE_URL : BASE_URL + "/";
  if (receiverId == undefined) {
    console.error("No receiver ID provided for payment link generation.");
  }
  let link = `${baseUrl}make-payment?receiverId=${receiverId}`;
  if (amount != undefined) {
    link += `&amount=${amount}`;
  }
  if (coinId != undefined) {
    link += `&coinId=${coinId}`;
  }
  if (confirmOnly) {
    link += `&confirmOnly=true`;
  }
  return link;
}

export function generateBasicPaymentMessage({
  receiverName,
  link,
}: {
  receiverName: string;
  link: string;
}) {
  return `Please make your payment to ${receiverName} using the following link:\n${link}`;
}

export function generateDetailedPaymentMessage({
  receiverName,
  amount,
  coinName,
  link,
}: {
  receiverName: string;
  amount: number;
  coinName: string;
  link: string;
}) {
  return `Payment details:\n------------------------------\nReceiver: ${receiverName}\nCoin: ${coinName}\nAmount: ${amount}\n------------------------------\n\nPlease make your payment using the following link: \n${link}`;
}
