import { useCallback, useRef } from "react";
import { off, on } from "@/lib/utils";

interface Options {
  isPreventDefault?: boolean;
  delay?: number;
  onStart?: () => void;
  onCancel?: () => void;
}

const isTouchEvent = (ev: Event): ev is TouchEvent => {
  return "touches" in ev;
};

const preventDefault = (ev: Event) => {
  if (!isTouchEvent(ev)) return;

  if (ev.touches.length < 2 && ev.preventDefault) {
    ev.preventDefault();
  }
};

const useLongPress = (
  callback: (e: TouchEvent | MouseEvent) => void,
  { isPreventDefault = true, delay = 300, onStart, onCancel }: Options = {},
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (event: TouchEvent | MouseEvent) => {
      onStart?.();
      // prevent ghost click on mobile devices
      if (isPreventDefault && event.target) {
        on(event.target, "touchend", preventDefault, { passive: false });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => callback(event), delay);
    },
    [callback, delay, isPreventDefault, onStart],
  );

  const cancel = () => {
    onCancel?.();
    clear();
  };

  const clear = useCallback(() => {
    // clearTimeout and removeEventListener
    timeout.current && clearTimeout(timeout.current);

    if (isPreventDefault && target.current) {
      off(target.current, "touchend", preventDefault);
    }
  }, [isPreventDefault]);

  return {
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchEnd: cancel,
  } as const;
};

export default useLongPress;
