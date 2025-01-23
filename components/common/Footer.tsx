"use client";

import Wrapper from "@/components/common/Wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <section className=" w-full bg-[var(--clr-peach)] py-5 pb-4">
      <Wrapper>
        <div>
          <div className="w-full flex flex-col  lg:flex-row lg:justify-between gap-10">
            <div className="w-[220px] ">
              <Image
                src={"/translogo.png"}
                width={300}
                height={150}
                alt="-"
                className="object-contain"
              />
            </div>
            <div className="flex md:flex-grow lg:mt-4 pl-5 ">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full ">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-left font-bold">Useful Links</h1>
                  <p className="text-left text-sm font-normal">Home</p>
                  <p className="text-left text-sm font-normal">Contact Us</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h1 className="text-left font-bold">Community</h1>
                  <p className="text-left text-sm font-normal">Profile</p>
                  <p className="text-left text-sm font-normal">Event Center</p>
                  <p className="text-left text-sm font-normal">
                    Discussion Board
                  </p>
                  <p className="text-left text-sm font-normal">
                    Service Center
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h1 className="text-left font-bold">Info</h1>
                  <p className="text-left text-sm font-normal">About Us</p>
                </div>
              </div>
            </div>
            <div className="w-[220px] lg:pt-4">
              <Image
                src={"/edifylogo.png"}
                width={300}
                height={150}
                alt="-"
                className="object-contain"
              />
            </div>
          </div>
          <div className=" mt-10 border-t-[1px] w-full border-[var(--clr-black)]" />
          <div className="flex flex-col items-start mt-5 gap-4">
            <div className="flex items-center gap-1">
              <div>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  asChild
                  className="rounded-full bg-[var(--clr-jet)] p-[6px] group"
                >
                  <Link href="https://facebook.com">
                    <FaFacebookF className=" text-xl  text-white group-hover:text-[var(--clr-black)]" />
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  asChild
                  className="rounded-full bg-[var(--clr-jet)] p-[6px] group"
                >
                  <Link href="https://twitter.com">
                    <BsTwitterX className=" text-lg  text-white group-hover:text-[var(--clr-black)]" />
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  asChild
                  className="rounded-full bg-[var(--clr-jet)] p-[4px] group"
                >
                  <Link href="https://instagram.com">
                    <FaInstagram className="text-xl text-white group-hover:text-[var(--clr-black)]" />
                  </Link>
                </Button>
              </div>
            </div>
            <p className="text-left text-sm font-semibold mb-2">
              Connect with us on our social media pages
            </p>
          </div>
          <div className="px-4 flex items-center justify-center w-full pt-2">
            <p className="text-[var(--clr-silver-v1)] text-lg">
              Copyright © {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Footer;
