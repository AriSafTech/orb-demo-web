import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useAuthStore } from "@/stores/authStore";

const PusherComponent = () => {
  const [data, setData] = useState([]);
  const { tokens, user } = useAuthStore();

  Pusher.logToConsole = true;

  var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  });

  var channel = pusher.subscribe(`notification-${user?.id}`);
  channel.bind("notification-event", function (data: any) {
    console.log("data", data);
  });

  return (
    <div>
      {/* <h2>Received Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default PusherComponent;
