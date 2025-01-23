"use client";
import { MouseEvent, useEffect, useRef } from "react";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";

const ContextMenu = ({
  options,
  cordinates,
  contextMenu,
  setContextMenu,
  locale,
}: any) => {
  const contextMenuRef = useRef<null | HTMLDivElement>(null);

  const handleClick = (
    e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    callBack: () => void
  ) => {
    e.stopPropagation();
    callBack();
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // bg-[var(--clr-primary)] border-[1px] border-[var(--clr-primary-light)]
  return (
    <div
      ref={contextMenuRef}
      style={{
        boxShadow:
          "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(11,20,26;),.16)",
        top: cordinates.y,
        left: cordinates.x,
      }}
      className="bg-[var(--clr-primary)] fixed py-5 z-[10] rounded-lg border border-[var(--clr-primary-light)]"
    >
      <ul>
        {options.map(({ name, callBack }: any) =>
          name === "Login User" ? (
            <li
              className="hover:bg-[var(--clr-primary-light)] pl-5 pr-4 py-2 cursor-pointer min-w-[258px]"
              key={name}
              //   onClick={(e) => handleClick(e, callBack)}
            >
              <LoginButton asChild mode="modal">
                <Button variant="outline" size="lg">
                  Sign in
                </Button>
                {/* <p className="text-black">Sign in</p> */}
              </LoginButton>
              {/* <span>{name}</span> */}
            </li>
          ) : (
            <li
              className="hover:bg-[var(--clr-primary-light)] pl-5 pr-4 py-2 cursor-pointer min-w-[258px]"
              key={name}
              onClick={(e) => handleClick(e, callBack)}
            >
              <span>{name}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ContextMenu;
