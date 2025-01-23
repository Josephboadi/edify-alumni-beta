"use client";

import { ReactNode, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
interface LayoutProps {
  children: ReactNode;
  // params: any;
}
const Layout = ({ children }: LayoutProps) => {
  const [toggleSide, setToggleSide] = useState<boolean>(true);
  return (
    <main className="h-screen flex w-screen flex-row overflow-hidden ">
      <div
        className={`z-[50] fixed left-0 bottom-0 top-0  lg:static overflow-hidden  transition-all ease-in-out duration-300 ${
          toggleSide
            ? "block transition-all ease-in-out duration-300"
            : " hidden lg:block transition-all ease-in-out duration-300"
        }`}
      >
        <SideBar />
      </div>

      {/* <div
        className={` fixed z-[1000] left-0 bottom-0 top-0  ${
          toggleSide ? "block" : "hidden lg:hidden"
        } overflow-hidden  transition-all ease-in-out delay-100 duration-200`}
      >
        <SideBar />
      </div> */}

      <div className={`flex flex-col flex-1 overflow-hidden scroll-side  `}>
        <Header />
        <div className="h-[92vh] flex-1  overflow-hidden">
          <div
            className={`flex-1 bg-[var(--clr-primary)]  py-4  pt-0 overflow-auto overflow-x-hidden h-[82vh] xsm:h-[84vh] ${
              toggleSide ? "px-4 sm:px-10" : "px-4 sm:px-10 xl:px-56"
            }`}
          >
            {children}
          </div>
          <div className="h-[8vh] xsm:h-[6vh] w-full bg-[var(--clr-primary)] flex items-center z-[1002]">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
