import React from "react";
interface HeadWrapperProps {
  children: React.ReactNode;
}

const Head = ({ children }: HeadWrapperProps) => {
  return <section className="w-full h-[24vh] relative">{children}</section>;
};

export default Head;
