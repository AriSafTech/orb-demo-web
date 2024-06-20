"use client";
import useLongPress from "@/lib/hooks/useLongPress";
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = Omit<ButtonProps, "onClick"> & {
  onLongPress: () => void;
  delay?: number;
  onStart?: () => void;
  onCancel?: () => void;
  enabled?: boolean;
};

function LongPressButton({
  children,
  className,
  onLongPress,
  onStart,
  onCancel,
  isLoading,
  enabled = true,
  // delay,
  ...rest
}: Props) {
  const handleStart = () => {
    setIsPressing(true);
    onStart?.();
  };

  const handleCancel = () => {
    setIsPressing(false);
    onCancel?.();
  };

  const handleLongPress = () => {
    if (enabled) {
      onLongPress();
      setIsPressing(false);
    }
  };

  const longPressEvent = useLongPress(handleLongPress, {
    delay: 1000,
    isPreventDefault: true,
    onStart: handleStart,
    onCancel: handleCancel,
  });
  const [isPressing, setIsPressing] = useState(false);

  return (
    <Button
      {...rest}
      {...longPressEvent}
      isLoading={isLoading}
      className={cn(className, "relative overflow-clip", {
        "!bg-cyan-800": isLoading,
      })}
      type="button"
    >
      <div
        className={cn("bg-cyan-800 absolute left-0 top-0 right-0 bottom-0", {
          "animate-from-left": isPressing && enabled,
          "-translate-x-full": !isPressing || !enabled,
        })}
      />
      <div className="z-50">{children}</div>
    </Button>
  );
}

export default LongPressButton;
