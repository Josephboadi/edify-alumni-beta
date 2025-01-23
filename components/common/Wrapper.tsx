import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="md:max-w-[1300px] mx-auto md:px-6 px-4 sm:px-6 max-w-[100%] h-[100%] ">
      {children}
    </div>
  );
};

export default Wrapper;
