import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useAuthStore } from "@/stores/authStore";

const PusherComponent = () => {
  const [data, setData] = useState([]);
  const { tokens, user } = useAuthStore();

  //This will be called when your component is mounted
  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      forceTLS: true,
    });
    const channel1 = pusher.subscribe(`notification-${user?.id}`);
    // You can bind more channels here like this
    // const channel2 = pusher.subscribe('channel_name2')
    channel1.bind(`notification-event-${user?.id}`, function (data: any) {
      console.log("Noti", data);
      alert(JSON.stringify(data));
      // Code that runs when channel1 listens to a new message
    });

    // return () => {
    //   pusher.unsubscribe(`notification-${user?.id}`);
    //   // pusher.unsubscribe('channel_name2')
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // [] would ensure that useEffect is executed only once

  // const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  //   cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  //   forceTLS: true,
  // });

  // var channel = pusher.subscribe(`notification-${user?.id}`);
  // channel.bind(`notification-event-${user?.id}`, function (data: any) {
  //   alert(JSON.stringify(data));
  // });

  // const echo = new Echo({
  //   broadcaster: "pusher",
  //   key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  //   cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  //   forceTLS: true,
  //   encrypted: true,
  //   // auth: (channel: any, options: any) => {
  //   //   return {
  //   //     auth: {
  //   //       headers: {
  //   //         Authorization: `Bearer ${tokens?.accessToken}`,
  //   //         Accept: "application/json",
  //   //       },
  //   //     },
  //   //     channel,
  //   //   };
  //   // },
  //   // auth: {
  //   //   headers: {
  //   //     Authorization: `Bearer ${tokens?.accessToken}`,
  //   //     Accept: "application/json",
  //   //   },
  //   // },
  // });

  // echo
  //   .private(`notification-${user?.id}`)
  //   .listen(`notification-event-${user?.id}`, (receivedData: any) => {
  //     // setData((prevData: any) => [...prevData, receivedData]);
  //     console.log(receivedData);
  //   });

  // return () => {
  //   echo.leaveChannel(`notification-${user?.id}`);
  // };

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
