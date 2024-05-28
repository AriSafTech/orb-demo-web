"use client";
import QRCode from "react-qr-code";

const Page = () => {
  return (
    <div>
      <QRCode value="http://localhost:3000/payment" />
    </div>
  );
};

export default Page;
