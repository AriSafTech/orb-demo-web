"use client";
import useLongPress from "@/lib/hooks/useLongPress";
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = ButtonProps & {
  onLongPress: () => void;
  delay?: number;
  onStart?: () => void;
  onCancel?: () => void;
};

function LongPressButton({
  children,
  className,
  onLongPress,
  // onStart,
  // onCancel,
  // delay,
  ...rest
}: Props) {
  const onStart = () => {
    setIsPressing(true);
  };

  const onCancel = () => {
    setIsPressing(false);
  };

  const longPressEvent = useLongPress(onLongPress, {
    delay: 1000,
    isPreventDefault: true,
    onStart,
    onCancel,
  });
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  return (
    <Button
      {...rest}
      {...longPressEvent}
      className={cn(className, "relative overflow-clip")}
      type="button"
    >
      <div
        className={cn("bg-violet-700 absolute left-0 top-0 right-0 bottom-0", {
          "animate-from-left": isPressing,
          "-translate-x-full": !isPressing,
        })}
      />
      <div className="z-50">{children}</div>
    </Button>
  );
}

export default LongPressButton;
