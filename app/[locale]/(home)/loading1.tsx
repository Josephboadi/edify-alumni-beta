import React from "react";
import { ImSpinner2 } from "react-icons/im";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <ImSpinner2 className="animate-spin h-12 w-12 text-[var(--clr-secondary)]" />
    </div>
  );
}

export default Loading;
