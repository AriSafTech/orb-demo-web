"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getApiClient } from "@/api/client";

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count % 3 === 0) {
      toast.info("INFO TOAST", {
        description: "hello",
        action: { label: "Undo", onClick: () => console.log("UNDO") },
      });
    } else if (count % 3 === 1) {
      toast.error("ERROR TOAST", {
        description: "hello",
        action: { label: "Undo", onClick: () => console.log("UNDO") },
      });
    } else {
      toast.success("SUCCESS TOAST", {
        description: "hello",
        action: { label: "Undo", onClick: () => console.log("UNDO") },
      });
    }
  }, [count]);

  return (
    <div className="flex flex-col h-full items-center p-4">
      <Button onClick={() => setCount((state) => state + 1)}>Show toast</Button>
      <Button
        onClick={async () => {
          const c1 = await getApiClient();
          const c2 = await getApiClient();
          console.log("CLIENT 1:", c1);
          console.log("CLIENT 2:", c2);
          console.log(c1 === c2);
        }}
      >
        Test
      </Button>
    </div>
  );
}
