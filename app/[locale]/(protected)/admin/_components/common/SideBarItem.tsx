"use client";
import DynamicIcons from "@/components/common/DynamicIcons";
import { useAppStore } from "@/store/store";
import Link from "next/link";
import { useParams } from "next/navigation";

const SideBarItem = ({
  menu,
  mtitle,
  subToggle,
  showLable,
  highlightMenu,
}: any) => {
  const { toggleSide, setToggleSide, mouseCLick, setMouseClick } =
    useAppStore();
  const param = useParams();
  //   console.log(menu);

  if (menu.isParent) {
    return (
      <div
        className={`${
          mtitle === menu?.title ? "sidebar-item open" : "sidebar-item "
        } ${
          menu.subMenu.find(
            (meu: any) =>
              meu?.path === mouseCLick ||
              (param.id && mouseCLick === `${meu?.path}/${param.id}`)
          )
            ? "bg-[var(--clr-secondary-v1)]  border-l-[3px] border-l-[var(--clr-secondary-light)] text-[var(--clr-primary)]"
            : "text-[var(--clr-primary)]"
        }`}
        key={menu.id}
      >
        <div
          className={`sidebar-title cursor-pointer transition-all duration-300 `}
          onClick={() => subToggle(menu?.title)}
        >
          <span
            onMouseOver={() => showLable({ title: menu?.title })}
            className={`flex items-center gap-4`}
          >
            <DynamicIcons
              name={menu?.icon}
              iconColor=""
              // className=" text-2xl  cursor-pointer hover:text-3xl"
              style={`text-2xl hover:scale-105 cursor-pointer`}
            />
            {/* <BsThreeDots
              className={`text-xl  cursor-pointer hover:text-2xl`}
            /> */}
            <p>{menu.title}</p>
          </span>
          <i
            className={`bi-chevron-down toggle-btn transition ease-in-out delay-600 duration-500 mr-3 block text-lg !font-black
            }`}
          ></i>
        </div>
        {mtitle && (
          <div
            className={`${
              mtitle === menu?.title
                ? "h-auto pt-[0.5em] overflow-hidden block"
                : "h-0 hidden"
            } ${toggleSide ? " w-full" : "w-full"} pb-2 `}
          >
            {menu.subMenu?.map((menu: any) => (
              <SideBarItem
                key={menu.id}
                menu={menu}
                mtitle={mtitle}
                subToggle={subToggle}
                showLable={showLable}
                highlightMenu={highlightMenu}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        key={menu.id}
        className={`mb-4 px-4 py-2 cursor-pointer text-[var(--clr-primary)] hover:bg-slate-100 hover:text-[var(--clr-black)] rounded-[4px] ${
          (mouseCLick === menu?.path ||
            (param.id && mouseCLick === `${menu?.path}/${param.id}`)) &&
          "bg-slate-100 !text-[var(--clr-black)]"
        }`}
        onClick={() => {
          highlightMenu(menu?.path);
          !menu.isChild && subToggle("");
          setToggleSide();
        }}
      >
        <Link
          href={`${menu.path}`}
          className="flex items-center gap-3 "
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
      </div>
    );
  }
};

export default SideBarItem;
