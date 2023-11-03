"use client";
import { signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import { RiSparkling2Line } from "react-icons/ri";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });
      
      if (res.error) {
        setLoading(false);
        return toast.error(res.error);
      }

      router.replace("/taskboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex items-center gap-2">
        <p className="font-semibold text-lg">
          Welcome <span className="text-[#6e9fff]">Back</span>
        </p>
        <RiSparkling2Line className="text-2xl" />
      </div>
      <div className="flex w-full">
        <div className="flex w-full justify-center">
          <form className="flex flex-col gap-6 w-full justify-center">
            <div className="flex flex-col gap-2 w-full justify-center">
              <label className="text-xs pl-1 font-medium">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
                autoComplete="off"
                className="w-full text-xs outline-none px-4 py-2 rounded-md border"
              />
            </div>
            <div className="flex flex-col gap-2 w-full justify-center">
              <label className="text-xs pl-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                className="w-full text-xs outline-none px-4 py-2 rounded-md border"
              />
            </div>
            <button
              className="border mt-6 py-2 rounded-lg bg-[#3e80ff] text-white font-semibold text-sm hover:bg-[#3e70ff]"
              onClick={handleSubmit}
            >
              Login
            </button>
            {loading ? (
              <div className="flex w-full mt-4 justify-center max-md:mt-0">
              <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                <circle
                  className="pl__ring pl__ring--a"
                  cx="120"
                  cy="120"
                  r="105"
                  fill="none"
                  stroke="#000"
                  strokeWidth="20"
                  strokeDasharray="0 660"
                  strokeDashoffset="-330"
                  strokeLinecap="round"
                ></circle>
                <circle
                  className="pl__ring pl__ring--b"
                  cx="120"
                  cy="120"
                  r="35"
                  fill="none"
                  stroke="#000"
                  strokeWidth="20"
                  strokeDasharray="0 220"
                  strokeDashoffset="-110"
                  strokeLinecap="round"
                ></circle>
                <circle
                  className="pl__ring pl__ring--c"
                  cx="85"
                  cy="120"
                  r="70"
                  fill="none"
                  stroke="#000"
                  strokeWidth="20"
                  strokeDasharray="0 440"
                  strokeLinecap="round"
                ></circle>
                <circle
                  className="pl__ring pl__ring--d"
                  cx="155"
                  cy="120"
                  r="70"
                  fill="none"
                  stroke="#000"
                  strokeWidth="20"
                  strokeDasharray="0 440"
                  strokeLinecap="round"
                ></circle>
              </svg>
            </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
