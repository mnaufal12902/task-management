'use client'
import React, { useRef, useState, useEffect } from "react";
import { PiUserCircle } from "react-icons/pi";
import { BsPlusCircleDotted } from "react-icons/bs";
import { useTaskDispatch, useTasks } from "../../app/TaskContext";

export default function NewMatkul(props) {
  const { sendNewData } = props;
  const [newData, setNewData] = useState("");
  const inputRef = useRef(null);

  const newMatkul = useTasks().newData;
  const dispatch = useTaskDispatch();

  useEffect(() => {
    if (newMatkul) {
      inputRef.current.focus();
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newMatkul]);

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      dispatch({
        type: "RESET_NEW_DATA"
      });
    }
  };

  const handleClick = (e) => {
    if (e.key === "Enter") {
      sendNewData(newData);
      dispatch({
        type: "RESET_NEW_DATA"
      })
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNewData(value);
  };

  return (
    <div className="flex gap-2">
        {newMatkul ? (
            <input
              type="text"
              name="matkul"
              className="w-[80%] border-b-2 outline-none text-[10.5px] font-semibold text-center"
              ref={inputRef}
              onChange={handleChange}
              onKeyDown={handleClick}
              maxLength={24}
              autoFocus
            />
        ) : ''}
    </div>
  );
}
