import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className=" rounded-[6px] shadow-lg p-0 bg-[var(--clr-primary-light)] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  hover:cursor-pointer "
    >
      <div className=" hidden md:block relative w-[80px] h-[40px] ">
        <Image
          src="/logo.png"
          alt="logo"
          sizes="true"
          fill
          className="flex justify-start rounded-[6px] object-contain"
        />
      </div>

      <div className=" block md:hidden relative w-[40px] h-[40px] ">
        <Image
          src="/loggo.jpg"
          alt="logo"
          sizes="true"
          fill
          className="flex justify-start rounded-[6px] object-contain"
        />
      </div>
    </Link>
  );
}

export default Logo;
