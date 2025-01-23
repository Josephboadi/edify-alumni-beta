"use client";
import React, { useRef } from "react";

const ToolTip = ({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip: any;
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left, right } = container.current.getBoundingClientRect();

        tooltipRef.current.style.right = clientX - right + "px";
      }}
      className="group relative inline-block justify-center items-center "
    >
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-[var(--clr-primary)]  text-[var(--clr-secondary)] border border-[var(--clr-primary-secondary)] p-1 px-2 rounded absolute -top-full -mt-3 whitespace-nowrap !z-[190800000] shadow-2xl "
        >
          {tooltip}
        </span>
      ) : null}
      {children}
    </div>
  );
};

export default ToolTip;
