import React from "react";
import { RotateLoader } from "react-spinners";
import { cn } from "../../lib/utils";

type Props = React.HTMLProps<HTMLDivElement>;
function Loading({ className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center",
        className,
      )}
      {...rest}
    >
      <RotateLoader color="#36d7b7" />
    </div>
  );
}

export default Loading;
