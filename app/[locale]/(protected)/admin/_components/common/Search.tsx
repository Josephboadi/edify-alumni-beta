"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiSearch2Line } from "react-icons/ri";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  placeholder: string;
}
const Search = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const handleSearch = useDebouncedCallback((e: any) => {
    if (e.target.value) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="w-full h-[40px] bg-[var(--clr-primary)] p-3 py-1 flex rounded-[4px] items-center gap-2 border border-slate-400">
      <RiSearch2Line />
      <div className="flex flex-grow h-full">
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={params.get("q") || ""}
          className="w-full h-full focus-visible:ring-transparent outline-none border-none pr-1"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Search;
