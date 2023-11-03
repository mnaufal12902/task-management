"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {GoSignOut} from 'react-icons/go'
import { usePathname } from "next/navigation";
import PhotoProfile from "../../public/profile.svg";
import { GoTasklist } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiSettings4Line } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const {data:session} = useSession();

  return (
    <div className="flex flex-col px-8 w-full bg-white max-md:px-2">
      <div className="flex w-full h-[80px] px-8 pt-12 pb-10 items-center justify-between border-b-2 max-md:px-4 max-md:pb-12">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg max-md:text-medium">
            <span className="text-[#3b7eff]">Task</span>Manager
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="pr-4 border-r-2 py-2">
            <button className="flex items-center" onClick={() => signOut()}>
              <GoSignOut className="text-xl hover:text-[#3b7eff]"/>
            </button>
          </div>
          <div className="max-md:hidden">
            <Image priority src={PhotoProfile} width={40} className="select-none max-md:flex-none" alt="photo"/>
          </div>
          <div className="flex flex-col gap-1">
            <p className="w-[200px] text-sm font-semibold max-md:w-[100px] max-md:text-xs">{session?.user?.nama}</p>
            <p className="text-[10px] text-[#9ca2b6]">{`Role : ${session?.user?.role}`}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-10 px-8 text-sm font-medium text-[#9ca2b6] h-[50px]">
        <Link
          href="/taskboard"
          className={`flex items-center gap-1 py-4 ${
            pathname === "/taskboard"
              ? "border-b-2 border-[#6e9fff] text-[#3b7eff]"
              : "hover:border-b-2 hover:border-[#6e9fff] hover:text-[#3b7eff]"
          }`}
        >
          <GoTasklist className="text-xl" />
          <span>Taskboard</span>
        </Link>
        <Link
          href="/group"
          className={`flex items-center gap-2 py-4 ${
            pathname === "/group"
              ? "border-b-2 border-[#6e9fff] text-[#3b7eff]"
              : "hover:border-b-2 hover:border-[#6e9fff] hover:text-[#3b7eff]"
          }`}
        >
          <HiOutlineUserGroup className="text-xl" />
          <span>Group</span>
        </Link>
      </div>
    </div>
  );
}
