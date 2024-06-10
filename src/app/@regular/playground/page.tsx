"use client";
import LongPressButton from "@/components/custom/LongPressButton";
import React from "react";

function PlaygroundPage() {
  return (
    <>
      <h2 className="text-xl">LongPressButton</h2>
      <LongPressButton
        size="lg"
        className="my-8 w-full"
        onLongPress={() => console.log("LONG PRESS COMPLETE")}
        onStart={() => console.log("LONG PRESS STARTED")}
      >
        Send
      </LongPressButton>
    </>
  );
}

export default PlaygroundPage;
