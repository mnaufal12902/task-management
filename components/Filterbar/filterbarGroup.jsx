"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import AddGroup from "../Dialog/addGroupTask";
import {useSession} from "next-auth/react"

export default function FilterbarGroup(props) {
  const { sendFilter } = props;
  const [admin, setAdmin] = useState(false);
  const [inputFilter, setInputfilter] = useState("");


  const handleChange = (e) => {
    setInputfilter(e.target.value);
  };

  useEffect(() => {
    sendFilter(inputFilter);
  }, [inputFilter]);

  return (
    <div className="flex items-center px-8 border w-full h-[50px] justify-between rounded-md bg-white shadow-md">
      <div className="flex items-center gap-4">
        <CiSearch className="text-lg" />
        <input
          type="text"
          placeholder="Search by Nama"
          className="text-xs px-3 py-1 border-b-2 w-[400px] outline-none"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">{admin ? <AddGroup /> : ""}</div>
    </div>
  );
}
