"use client";
// import { useAppStore } from "@/store/store";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { CorporateMenus, UserMenus } from "../../data/menus";
// import { useAppStore } from "../../store/store";
import { menu } from "@/lib/menu";
import { useAppStore } from "@/store/store";
import { useSession } from "next-auth/react";
// import DynamicIcons from "./DynamicIcons";
import { MdClose } from "react-icons/md";
import SideBarItem from "./SideBarItem";

// toggleSide,
const SideBar = () => {
  const {
    toggleSide,
    toggleSide1,
    setToggleSide,
    setToggleSide1,
    mouseCLick,
    setMouseClick,
  } = useAppStore();

  const session = useSession();
  const [menuData, setMenuData] = useState<any>([]);
  const pathname = usePathname();
  const [mouseHover, setMouseHover] = useState("");
  const [open, setOpen] = useState(false);
  const [mtitle, setMtitle] = useState("");

  const subToggle = (title: string) => {
    if (title === mtitle) {
      setOpen(false);
      setMtitle("");
    } else {
      setOpen(true);
      setMtitle(title);
    }
  };

  const showLable = ({ title }: { title: string }) => {
    setMouseHover(title);
  };

  const hideLable = () => {
    setMouseHover("");
  };
  useEffect(() => {
    const getMenus = async () => {
      const menus = await menu();
      setMenuData(menus);
      setMouseClick(pathname);
    };
    getMenus();

    return;
  }, []);

  const highlightMenu = async (path: string) => {
    setMouseClick(path);
  };

  // useEffect(() => {
  //   // console.log(pathname);
  //   setMouseClick(pathname);
  //   return;
  // }, [pathname]);
  // bg - slate - 200;
  return (
    <>
      <div
        className={` transition-all  flex-col  h-screen w-[280px] shadow-xl bg-[var(--clr-secondary)]  overflow-hidden relative ${
          toggleSide1 ? "lg:flex hidden " : "hidden duration-300 ease-in-out"
        } `}
      >
        <div className="flex items-center justify-between px-2 sticky top-0 h-[83px] left-0 right-0 bg-[var(--clr-secondary)]  !border-b-[1px] !border-b-[var(--clr-silver-v5)]">
          <div className="absolute top-4 left-0 right-10 flex items-end pl-6  gap-4 transition-all duration-1000 delay-1000 ease-in-out">
            <div className="relative w-[50px] h-[50px] rounded-full border border-[var(--clr-silver)]">
              <Image
                src="/loggo.jpg"
                alt="logo"
                fill
                className="rounded-full"
              />
            </div>
            <div>
              {/* <h1 className="text-lg font-normal uppercase">Joseph Boadi</h1> */}
              <h1 className="text-sm font-bold mb-2 text-[var(--clr-primary)]">
                EDIFY ALUMNI
              </h1>
            </div>
          </div>
          <div className={`absolute right-2 top-6 `}>
            <MdClose
              className="text-xl text-[var(--clr-primary)] rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setToggleSide1()}
            />
          </div>
        </div>

        <div className=" flex-1 overflow-auto hover:overflow-y-auto px-6 py-6 pt-8">
          {menuData?.map((menu: any, index: any) => {
            return (
              <SideBarItem
                key={index}
                menu={menu}
                mtitle={mtitle}
                subToggle={subToggle}
                showLable={showLable}
                highlightMenu={highlightMenu}
              />
            );
          })}
        </div>
      </div>

      <div
        className={`z-[50] fixed left-0 top-0 bottom-0 transition-all  flex-col  w-[280px] shadow-xl bg-[var(--clr-secondary)] overflow-auto ${
          toggleSide ? "hidden" : " lg:hidden flex "
        } duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-2 sticky top-0 h-[73px] left-0 right-0 bg-[var(--clr-secondary)]  !border-b-[1px] !border-b-[var(--clr-silver-v5)]">
          <div className="absolute top-2 left-0 right-10 flex items-end pl-6  gap-4 transition-all duration-1000 delay-1000 ease-in-out">
            <div className="relative w-[50px] h-[50px] rounded-full border border-[var(--clr-silver)]">
              <Image
                src="/loggo.jpg"
                alt="logo"
                fill
                className="rounded-full"
              />
            </div>
            <div>
              {/* <h1 className="text-lg font-normal uppercase">Joseph Boadi</h1> */}
              <h1 className="text-sm font-bold mb-2 text-[var(--clr-primary)]">
                EDIFY ALUMNI
              </h1>
            </div>
          </div>
          <div className={`absolute right-2 top-6 `}>
            <MdClose
              className="text-xl text-[var(--clr-primary)] rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setToggleSide()}
            />
          </div>
        </div>

        <div className=" flex-1 overflow-auto hover:overflow-y-auto px-6 py-6 pt-8  bg-[var(--clr-secondary)]">
          {/* {menuData?.map((menu: any) => (
            <li
              key={menu.id}
              className={`mb-4 px-4 py-2 cursor-pointer hover:bg-[var(--clr-pumpkin)] transition-all duration-300 rounded-md ${
                mouseCLick === menu?.path && "bg-[var(--clr-pumpkin)]"
              }`}
              onClick={() => {
                highlightMenu(menu?.path);
                setToggleSide();
              }}
            >
              <Link
                href={`${menu.path}`}
                className="flex items-center gap-3 transition-all duration-300"
                passHref
              >
                <DynamicIcons
                  name={menu?.icon}
                  iconColor=""
                  // className=" text-2xl  cursor-pointer hover:text-3xl"
                  style={`text-2xl hover:scale-105 cursor-pointer`}
                />
                <span>{menu.title}</span>
              </Link>
            </li>
          ))} */}
          {menuData?.map((menu: any, index: any) => {
            return (
              <SideBarItem
                key={index}
                menu={menu}
                mtitle={mtitle}
                subToggle={subToggle}
                showLable={showLable}
                highlightMenu={highlightMenu}
              />
            );
            // if (menu.isParent) {
            //   return (
            //     <div
            //       className={
            //         mtitle === menu?.title
            //           ? "sidebar-item open "
            //           : "sidebar-item "
            //       }
            //       key={menu.id}
            //     >
            //       <div
            //         className="sidebar-title cursor-pointer transition-all duration-300"
            //         onClick={() => subToggle(menu?.title)}
            //       >
            //         <span
            //           onMouseOver={() => showLable({ title: menu?.title })}
            //           className="flex items-center gap-4 text-white"
            //         >
            //           <DynamicIcons
            //             name={menu?.icon}
            //             iconColor=""
            //             // className=" text-2xl  cursor-pointer hover:text-3xl"
            //             style={`text-2xl hover:scale-105 cursor-pointer`}
            //           />
            //           <BsThreeDots
            //             className={`text-xl  cursor-pointer hover:text-2xl ${
            //               toggleSide ? "block" : "hidden"
            //             }`}
            //           />
            //           <p>{menu.title}</p>
            //         </span>
            //         <i
            //           className={`${
            //             toggleSide
            //               ? "hidden"
            //               : "bi-chevron-down toggle-btn transition ease-in-out delay-600 duration-500 mr-3 block text-white text-lg !font-black"
            //           }`}
            //         ></i>
            //       </div>
            //       {mtitle && (
            //         <div
            //           className={`${
            //             mtitle === menu?.title
            //               ? "h-auto pt-[0.25em] overflow-hidden block"
            //               : "h-0 hidden"
            //           } ${toggleSide ? "-ml-4 w-[60px]" : "w-full"} pb-4 `}
            //         >
            //           {menu.subMenu?.map((menu: any) => (
            //             <SideBar key={menu.id} />
            //           ))}
            //         </div>
            //       )}
            //     </div>
            //   );
            // } else {
            //   <li
            //     key={menu.id}
            //     className={`mb-4 px-4 py-2 cursor-pointer hover:bg-[var(--clr-pumpkin)] transition-all duration-300 rounded-md ${
            //       mouseCLick === menu?.path && "bg-[var(--clr-pumpkin)]"
            //     }`}
            //     onClick={() => highlightMenu(menu?.path)}
            //   >
            //     <Link
            //       href={`${menu.path}`}
            //       className="flex items-center gap-3 transition-all duration-300"
            //       passHref
            //     >
            //       <DynamicIcons
            //         name={menu?.icon}
            //         iconColor=""
            //         // className=" text-2xl  cursor-pointer hover:text-3xl"
            //         style={`text-2xl hover:scale-105 cursor-pointer`}
            //       />
            //       <span>{menu.title}</span>
            //     </Link>
            //   </li>;
            // }
            // return (
            //   <li
            //     key={menu.id}
            //     className={`mb-4 px-4 py-2 cursor-pointer hover:bg-[var(--clr-pumpkin)] transition-all duration-300 rounded-md ${
            //       mouseCLick === menu?.path && "bg-[var(--clr-pumpkin)]"
            //     }`}
            //     onClick={() => highlightMenu(menu?.path)}
            //   >
            //     <Link
            //       href={`${menu.path}`}
            //       className="flex items-center gap-3 transition-all duration-300"
            //       passHref
            //     >
            //       <DynamicIcons
            //         name={menu?.icon}
            //         iconColor=""
            //         // className=" text-2xl  cursor-pointer hover:text-3xl"
            //         style={`text-2xl hover:scale-105 cursor-pointer`}
            //       />
            //       <span>{menu.title}</span>
            //     </Link>
            //   </li>
            // );
          })}
        </div>

        {/* <div className="mt-[10vh] ">
          <NavigationMenu>
            <NavigationMenuList aria-orientation="vertical">
              {menuData.map((menu: any) => (
                <NavigationMenuItem key={menu.id}>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link
                      href={`${menu.path}`}
                      className="flex items-center gap-3 transition-all duration-300"
                      passHref
                    >
                      <DynamicIcons
                        name={menu?.icon}
                        iconColor=""
                        // className=" text-2xl  cursor-pointer hover:text-3xl"
                        style={`text-2xl hover:scale-105 cursor-pointer`}
                      />
                      <span>{menu.title}</span>
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div> */}
      </div>
    </>
  );
};

export default SideBar;
