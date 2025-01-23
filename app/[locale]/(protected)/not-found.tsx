import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col  w-full  h-[100vh] justify-center items-center bg-[#fff]">
      <Image
        width={72}
        height={80}
        src="/void.png"
        alt="void"
        className=" w-72 h-80"
      />
      <div className="flex justify-center items-center gap-6 h-12">
        <h1 className=" text-3xl">404</h1>
        <div className="w-[1px] h-full bg-black" />
        <p>This page could not be found.</p>
      </div>
    </div>
  );
};


