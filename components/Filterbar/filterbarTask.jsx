"use client";
import React, { useEffect, useState, useId } from "react";
import { CiSearch } from "react-icons/ci";
import AddTask from "../Dialog/addTask";
import Select from "react-select";
import { useSession } from "next-auth/react";

export default function Filterbar(props) {
  const { sendDay, sendFilter } = props;
  const [admin, setAdmin] = useState();
  const [day, setDay] = useState("Semua");
  const [inputFilter, setInputfilter] = useState("");

  const {data:session} = useSession();

  useEffect(() => {
    if (session?.user?.role === "Ketua Kelas" || session?.user?.role === "Staff Kelas") {
      setAdmin(true);
    } 
}, [session]);


  const handleChange = (e) => {
    setInputfilter(e.target.value);
  };

  const options = [
    { value: "Semua", label: "Semua" },
    { value: "Hari ini", label: "Hari ini" },
    { value: "Besok", label: "Besok" },
    { value: "Mendatang", label: "Mendatang" },
  ];

  useEffect(() => {
    sendDay(day);
  }, [day]);

  useEffect(() => {
    sendFilter(inputFilter);
  }, [inputFilter]);

  return (
    <div className="flex items-center px-8 border w-full h-[50px] justify-between rounded-md bg-white shadow-md max-md:w-[95%] max-sm:px-4">
      <div className="flex w-[70%] h-full items-center gap-4">
        <CiSearch className="text-lg max-md:text-md" />
        <input
          type="text"
          placeholder="Search by Mata Kuliah"
          className="text-xs px-3 py-1 border-b-2 w-[400px] outline-none max-md:w-[70%] max-md:text-[11px] max-lg:w-[70%]"
          onChange={handleChange}
        />
      </div>
      <div className="flex w-[30%] gap-4 items-center justify-end">
        <Select
          instanceId={useId()}
          options={options}
          className="text-xs outline-none font-semibold max-md:h-full max-md:hidden"
          defaultValue={options[0]}
          onChange={(selectedOption) => {
            setDay(selectedOption.value);
          }}
        />
        {admin ? <AddTask /> : ""}
      </div>
    </div>
  );
}
