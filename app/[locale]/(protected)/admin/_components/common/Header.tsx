"use client";

import { logout } from "@/actions/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notificationsData } from "@/data/notifications";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExitIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiNotification2Fill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
// import ContextMenu from "../common/ContextMenu";
// import { LanguageButton } from "../common/Language-button";
// import Wrapper from "../common/Wrapper";
// import Logo from "../header/Logo";

import { LanguageButton } from "@/components/common/Language-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store/store";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [open, setOpen] = useState(false);
  // const screenSize = useScreenSize();
  // console.log(session);
  const {
    toggleSide,
    setToggleSide,
    toggleSide1,
    setToggleSide1,
    mouseCLick,
    setMouseClick,
  } = useAppStore();

  const user = useCurrentUser();
  const [selectedMenu, setSelectedMenu] = useState(pathname);
  const newPath = locale === "en" ? "/" : `/${locale}/`;

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <header
      className={`w-full z-[20] pl-2 lg:pr-8 py-4 ${
        toggleSide ? "left-[270px] lg:left-[280px]" : "left-0"
      } right-0 top-0  ${
        scrolled ? "bg-slate-100 shadow-;d" : "bg-slate-100 shadow-sm"
      }`}
    >
      <div className="px-5">
        <div
          className={`flex items-center w-full ${toggleSide ? "justify-between " : "justify-end"} ${toggleSide1 ? "lg:justify-end " : "lg:justify-between"}`}
        >
          <div
            className={` ${toggleSide ? "flex lg:hidden items-center gap-6" : "hidden"}`}
          >
            <AiOutlineMenu
              className="text-2xl text-[var(--clr-black)] hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setToggleSide()}
            />
          </div>

          <div
            className={` ${toggleSide1 ? "hidden " : "hidden lg:flex items-center gap-6"}`}
          >
            <AiOutlineMenu
              className="text-2xl text-[var(--clr-black)] hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setToggleSide1()}
            />
          </div>
          <div className="flex items-center ">
            {session?.status === "authenticated" && (
              <>
                <LanguageButton asChild mode="modal">
                  <div className=" h-[38px]   rounded-full p-2 px-2 flex items-center justify-center  bg-[var(--clr-silver)] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer mr-1">
                    <div className="group flex items-center">
                      <BiWorld className="text-xl" />
                      <MdKeyboardArrowDown className=" group-hover:rotate-180 transition-all duration-300" />
                    </div>
                  </div>
                </LanguageButton>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className=" h-[38px]   rounded-full ml-2 p-2 px-2 pr-4 flex items-center justify-center bg-[var(--clr-silver)] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer mr-4 relative">
                      <div className="absolute right-2 top-1   min-w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[var(--clr-primary)] pl-[2px]">
                        <p className="text-[9px] text-center">9+</p>
                      </div>
                      <div className="group flex items-center gap-1 ">
                        <RiNotification2Fill className="text-xl" />
                      </div>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="rounded-[5px] w-72 p-0 border-none bg-[var(--clr-primary-light)] max-h-96 overflow-y-auto no-scrollbar relative ">
                    <DropdownMenuLabel className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] px-5 sticky top-0 left-0 right-0 z-30">
                      Notifications
                    </DropdownMenuLabel>
                    <div className="w-full h-full divide-y-2 divide-solid divide-white ">
                      {notificationsData?.map((notification) => {
                        return (
                          <DropdownMenuItem
                            asChild
                            className={`px-5 py-4`}
                            key={notification.key}
                          >
                            <Link
                              href={""}
                              className="flex items-start gap-4 h-full"
                            >
                              <div className="flex !h-[100%] items-start">
                                <Avatar className="w-[40px] h-[40px] relative">
                                  {/* <Suspense
                                    fallback={
                                      <FaSpinner className="animate-spin" />
                                    }
                                  > */}
                                  <AvatarImage
                                    src={notification?.image || ""}
                                  />
                                  {/* </Suspense> */}
                                  <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] text-lg font-bold">
                                    {notification?.name
                                      ?.split("")
                                      ?.shift()
                                      ?.toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex flex-col items-start gap-1">
                                <h4 className="text-xs font-bold  line-clamp-1">
                                  {notification?.title}
                                </h4>
                                <p className="text-xs line-clamp-3">
                                  {notification?.description}
                                </p>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div
                  className=" h-[40px] min-w-[70px]   rounded-full p-4 px-2 flex items-center justify-center bg-[var(--clr-silver)] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  // onClick={() => setIsContextMenuVisible(true)}
                >
                  {session?.status === "authenticated" ? (
                    <>
                      <div className="">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-[30px] h-[30px] relative">
                                {/* <Suspense
                              fallback={<FaSpinner className="animate-spin" />}
                            > */}
                                <AvatarImage
                                  src={session?.data?.user?.image || ""}
                                />
                                {/* </Suspense> */}
                                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                                  {session?.data?.user?.name
                                    ?.split("")
                                    ?.shift()
                                    ?.toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <RxHamburgerMenu />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="rounded-[5px] w-56 py-1 px-0 block ">
                            <DropdownMenuLabel className="px-5 flex flex-col items-start">
                              <h1 className="text-md font-semibold text-[var(--clr-jet)]">
                                {session?.data?.user?.name}
                              </h1>
                              <p className="text-xs text-[var(--clr-jet-v1)] font-normal">
                                {session?.data?.user?.email}
                              </p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              asChild
                              className={`px-5 py-2 ${
                                newPath === selectedMenu && "bg-slate-100"
                              } `}
                              onClick={() => setSelectedMenu(newPath)}
                            >
                              <Link href={newPath}>Home</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleLogout()}
                              className="px-4"
                            >
                              <ExitIcon className="mr-2 h-4 w-4" />
                              <span>Log out</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-[30px] h-[30px] relative">
                        <AvatarFallback className="bg-gray-500 h-[30px] w-[30px]">
                          <FaUser className="text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <RxHamburgerMenu />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
