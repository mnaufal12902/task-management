import React from "react";
import Head from "next/head";
import LoginImage from "../../public/Designer.png";
import Image from "next/image";
import LoginForm from "../../components/Form/loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/taskboard");
  return (
    <div className="flex w-full relative h-screen justify-center items-center bg-[#f3f6ff]">
      <div className="flex border relative w-[60%] h-[70vh] rounded-2xl shadow-md bg-white max-md:w-[80%] max-md:h-[60vh]">
        <div className="flex w-[50%] relative border-r-2 justify-center items-center max-md:hidden">
          <div className="">
            <Image
              src={LoginImage}
              width={450}
              className="select-none"
              alt=""
              priority
            />
          </div>
        </div>
        <div className="flex w-[50%] relative px-12 py-24 max-md:w-full max-md:h-full max-md:px-4 max-md:py-8">
          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
