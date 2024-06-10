import React from "react";
import { RotateLoader } from "react-spinners";

function Loading() {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center">
      <RotateLoader color="#36d7b7" />
    </div>
  );
}

export default Loading;
