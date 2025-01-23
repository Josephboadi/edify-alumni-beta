"use client";

import { Country } from "@/app/[locale]/(protected)/admin/_components/setups/Country";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";

type DropdownRCountryProps = {
  value?: string;
  arrayData: Country[];
  onChangeHandler?: any;
  isError: boolean;
};

const DropdownRCountry = ({
  value,
  arrayData,
  onChangeHandler,
  isError,
}: DropdownRCountryProps) => {
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [selected, setSelected] = useState("");
  const [selected1, setSelected1] = useState("");
  const [open, setOpen] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const selectMenuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getCountries = async () => {
      if(arrayData){
      await setCountryData(arrayData);
      arrayData.map((dat)=>{
        if(dat?.country_id === value){
          setSelected(dat?.country_name);
          setSelected1(dat?.country_id);
        }
      })
    }
    };
    getCountries();
  }, [arrayData]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target) &&
        selectMenuRef.current &&
        !selectMenuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setInputValue1(
      selected
        ? selected?.length > 25
          ? selected?.substring(0, 25) + "..."
          : selected
        : ""
    );
    onChangeHandler(selected1);
  }, [selected]);

  const handleClick = async () => {
    await setOpen((prev) => !prev);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div className="w-full font-medium relative">
        <div
          ref={contextMenuRef}
          onClick={() => handleClick()}
          className={` w-full h-[38px] bg-[var(--clr-silver-v6)] cursor-pointer relative ${isError ? "border-[1px] border-red-500" : ""}`}
        >
          <input
            type="text"
            disabled
            autoComplete="off"
            id="country"
            name="country"
            className={`text-sm font-normal placeholder:text-sm placeholder:text-muted-foreground placeholder:font-normal w-full h-full px-4 pl-3 cursor-pointer outline-none caret-transparent`}
            placeholder="eg. Ghana"
            defaultValue={inputValue1}
          />

          <div className="absolute left-0 top-0 bottom-0 right-9 bg-transparent" />

          <div className=" absolute right-3 top-2 w-5 ">
            <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
          </div>
        </div>

        <div
          ref={selectMenuRef}
          className={`bg-[var(--clr-silver-v6)] no-scrollbar shadow-2xl overflow-y-auto max-h-60 absolute top-[36] left-0 right-0 z-[10] rounded rounded-tl-md rounded-tr-md ${
            open ? "block" : "hidden"
          } `}
        >
          <div className="flex w-full items-center px-2 gap-2 sticky top-0 bg-[var(--clr-silver-v6)] overflow-hidden">
            <div className="absolute w-[5%] ">
              <AiOutlineSearch className="text-[var(--clr-black-light)] !text-lg" />
            </div>

            <div className="flex flex-1 ml-[20px] overflow-x-auto">
              <input
                type="text"
                ref={inputRef}
                autoFocus={true}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                placeholder="Search here..."
                className="text-sm font-normal placeholder:text-sm placeholder:text-muted-foreground placeholder:font-normal p-2 outline-none flex flex-1 bg-transparent"
              />
            </div>
          </div>
          <p
            className={`p-2 text-sm text-[var(--clr-black)] hover:bg-[var(--clr-secondary)] hover:text-[var(--clr-primary)]
            ${
              selected === "" &&
              "bg-[var(--clr-secondary)] text-[var(--clr-primary)]"
            }
            `}
            onClick={() => {
              setSelected("");
              setSelected1("");
              setOpen(false);
              setInputValue("");
            }}
          >
            Select a Country
          </p>
          {countryData?.map((item, index) => (
            <p
              key={index}
              className={`p-2 text-[var(--clr-black)] text-sm hover:bg-[var(--clr-secondary)] hover:text-[var(--clr-primary)]
            ${
              (item?.country_name?.toLowerCase() === selected?.toLowerCase() ||
                item?.country_id === value) &&
              "bg-[var(--clr-secondary)] text-[var(--clr-primary)]"
            }
            ${
              item?.country_name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
              onClick={() => {
                if (
                  item?.country_name?.toLowerCase() !==
                    selected.toLowerCase() ||
                  item?.country_id !== value
                ) {
                  setSelected(item?.country_name);
                  setSelected1(item?.country_id);
                  setOpen(false);
                  setInputValue("");
                }
              }}
            >
              {item?.country_name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default DropdownRCountry;
