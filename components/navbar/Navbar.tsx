"use client";

import { logout } from "@/actions/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { menusData } from "@/data/menus";
import { notificationsData } from "@/data/notifications";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiNotification2Fill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { LanguageButton } from "../common/Language-button";
import Wrapper from "../common/Wrapper";
import Logo from "../header/Logo";

import { useCurrentAuth } from "@/hooks/use-current-auth";
import { useAppStore } from "@/store/store";
import { createPortal } from "react-dom";
import { LoginForm } from "../auth/login-form";
import { RegisterForm } from "../auth/register-form";
import ModalForm from "../common/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = ({ locale }: any) => {
  const session = useCurrentAuth();
  const { t } = useTranslation();
  const { formType, authModal, setAuthModal } = useAppStore();
  const pathname = usePathname();

  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  // const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  // const [open, setOpen] = useState(false);
  // const screenSize = useScreenSize();
  // const user = useCurrentUser();
  const [selectedMenu, setSelectedMenu] = useState(pathname);
  const [authStatus, setAuthStatus] = useState(false);

  const handleCloseButtonClick = () => {
    setAuthModal();
  };

  // if (session?.status === "authenticated") {
  //   router.refresh();
  // }

  // useEffect(() => {

  // }, [session]);

  // const contextMenuOptions = [
  //   {
  //     name: "Home",
  //     callBack: () => {
  //       router.push("/");
  //       setIsContextMenuVisible(false);
  //     },
  //   },
  //   {
  //     name: "Login User",
  //     callBack: () => {},
  //   },
  // ];

  // const authenticatedUserContextMenuOptions = [
  //   {
  //     name: "Home",
  //     callBack: () => {
  //       router.push("/");
  //       setIsContextMenuVisible(false);
  //     },
  //   },
  //   {
  //     name: "Wallet",
  //     callBack: () => {
  //       router.push("/user/wallet");
  //       setIsContextMenuVisible(false);
  //     },
  //   },
  //   {
  //     name: "KYC Verification",
  //     callBack: () => {
  //       router.push("/user/kyc");
  //       setIsContextMenuVisible(false);
  //     },
  //   },
  //   {
  //     name: "Logout",
  //     callBack: () => {
  //       logout();
  //       setIsContextMenuVisible(false);
  //     },
  //   },
  // ];

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });

    // Clean up the event listener when the component unmounts
    // return () => {
    //   document.removeEventListener('scroll', handleResize);
    // };
  }, []);

  // useEffect(() => {

  // }, []);

  console.log("session from navigation=====================", session);

  // router.refresh();

  // bg-[var(--clr-primary-light-trans)]
  return (
    <>
      {authModal &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{formType === "login" ? <LoginForm /> : <RegisterForm />}</div>
          </ModalForm>,
          document.body
        )}
      <header
        className={`fixed z-[20] lg:px-8 py-3 w-full left-0 right-0 top-0  ${
          scrolled
            ? "bg-[var(--clr-secondary-trans1)]  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-xl"
            : "bg-[var(--clr-secondary-trans1)]  bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-10 "
        }`}
      >
        <Wrapper>
          <div className="flex items-center justify-between w-full">
            <div className=" flex items-center justify-center rounded-md">
              <Logo />
            </div>
            {/* bg-[var(--clr-primary-light)] bg-clip-padding backdrop-filter
          backdrop-blur-sm bg-opacity-10 */}
            <div className="flex items-center ">
              {session?.status === "authenticated" ? (
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
                    className=" h-[40px]   rounded-full p-4 px-2 flex items-center justify-center bg-[var(--clr-silver)] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                    // onClick={() => setIsContextMenuVisible(true)}
                  >
                    {session?.status === "authenticated" ? (
                      <>
                        <div className=" block md:hidden">
                          {/* {screenSize?.width <= 1024 ? ( */}
                          <Drawer>
                            <DrawerTrigger asChild className="block md:hidden">
                              <div className="flex md:hidden items-center gap-2">
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
                            </DrawerTrigger>
                            <DrawerContent className=" block md:hidden w-56 h-full outline-none border-none rounded-none !rounded-r-[6px] ">
                              <DrawerHeader className="px-0">
                                <div className="px-4 flex flex-col items-start">
                                  <h1 className="text-md font-semibold text-[var(--clr-jet)]">
                                    {session?.data?.user?.name}
                                  </h1>
                                  <p className="text-xs text-[var(--clr-jet-v1)] font-normal">
                                    {session?.data?.user?.email}
                                  </p>
                                </div>
                                <div className=" mt-1 mb-4 border-t-[1px] w-full border-[var(--clr-silver)]" />

                                {menusData?.map((menu) => {
                                  const newPath =
                                    locale === "en"
                                      ? menu.path
                                      : menu.path === "/"
                                        ? `/${locale}`
                                        : `/${locale}${menu.path}`;

                                  return (
                                    <DrawerClose asChild key={menu.key}>
                                      <Link
                                        href={newPath}
                                        className={`px-6 py-2 hover:bg-slate-100 cursor-pointer ${
                                          newPath === selectedMenu &&
                                          "bg-slate-100"
                                        } `}
                                        onClick={() => setSelectedMenu(newPath)}
                                      >
                                        <p className=" text-left">
                                          {menu.title}
                                        </p>
                                      </Link>
                                    </DrawerClose>
                                  );
                                })}
                              </DrawerHeader>
                              <DrawerFooter className="px-0">
                                <div className=" mt-10 border-t-[1px] w-full border-[var(--clr-silver)]" />
                                {/* <div className="flex items-center gap-4 px-4 hover:bg-slate-100 py-2 cursor-pointer">
                                <ExitIcon className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                              </div> */}
                                <DrawerClose asChild>
                                  <div
                                    onClick={logout}
                                    className="flex items-center gap-4 px-4 hover:bg-slate-100 py-2 cursor-pointer"
                                  >
                                    <ExitIcon className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                  </div>
                                </DrawerClose>
                              </DrawerFooter>
                            </DrawerContent>
                          </Drawer>
                          {/* ) : ( */}

                          {/* )} */}
                        </div>
                        <div className="hidden md:block">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div className="hidden  md:flex items-center gap-2">
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
                            <DropdownMenuContent className="rounded-[5px] w-56 py-1 px-0 hidden md:block ">
                              <DropdownMenuLabel className="px-5 flex flex-col items-start">
                                <h1 className="text-md font-semibold text-[var(--clr-jet)]">
                                  {session?.data?.user?.name}
                                </h1>
                                <p className="text-xs text-[var(--clr-jet-v1)] font-normal">
                                  {session?.data?.user?.email}
                                </p>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {menusData?.map((menu) => {
                                const newPath =
                                  locale === "en"
                                    ? menu.path
                                    : menu.path === "/"
                                      ? `/${locale}`
                                      : `/${locale}${menu.path}`;

                                return (
                                  <DropdownMenuItem
                                    asChild
                                    className={`px-5 py-2 ${
                                      newPath === selectedMenu && "bg-slate-100"
                                    } `}
                                    onClick={() => setSelectedMenu(newPath)}
                                    key={menu.key}
                                  >
                                    <Link href={newPath}>{menu.title}</Link>
                                  </DropdownMenuItem>
                                );
                              })}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => logout()}
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
                  {/* {isContextMenuVisible && (
                  <ContextMenu
                    contextMenu={isContextMenuVisible}
                    setContextMenu={setIsContextMenuVisible}
                    cordinates={{ x: window.innerWidth - 280, y: 70 }}
                    options={
                      // userInfo ? authenticatedContextMenuOptions : contextMenuOptions
                      session?.status === "authenticated" &&
                      authenticatedUserContextMenuOptions
                    }
                    locale={locale}
                  />
                )} */}
                </>
              ) : (
                <div className="flex items-center gap-3 ">
                  <LanguageButton asChild mode="modal">
                    <div className=" h-[38px]   rounded-full p-2 px-2 flex items-center justify-center  bg-[var(--clr-silver)] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer mr-1">
                      <div className="group flex items-center">
                        <BiWorld className="text-xl" />
                        <MdKeyboardArrowDown className=" group-hover:rotate-180 transition-all duration-300" />
                      </div>
                    </div>
                  </LanguageButton>

                  <Link
                    href={
                      locale === "en" ? `/auth/login` : `/${locale}/auth/login`
                    }
                  >
                    {/* <div onClick={() => setAuthModal()}> */}
                    {/* <LoginButton asChild mode="modal"> */}
                    <div className="w-[120px] h-[38px] rounded-[20px]  bg-[var(--clr-secondary-light)]  flex items-center justify-between pl-[10px] text-[14px] font-base text-[var(--clr-primary)] shadow-md hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div>
                        <p className="text-sm">Login</p>
                      </div>
                      <div className="w-[65px] h-full rounded-[20px] shadow-lg bg-[var(--clr-secondary)]  flex items-center justify-center">
                        <p className="text-sm">Signup</p>
                      </div>
                    </div>
                    {/* </LoginButton> */}
                    {/* </div> */}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default Navbar;
