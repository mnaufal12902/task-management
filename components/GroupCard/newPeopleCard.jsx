import React, { useRef, useState, useEffect } from "react";
import { PiUserCircle } from "react-icons/pi";
import { BsPlusCircleDotted } from "react-icons/bs";
import { uuid } from "uuidv4";

export default function NewPeopleCard(props) {
  const {sendNewData} = props;
  const [newPeople, setNewPeople] = useState(false);
  const [newData, setNewData] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (newPeople) {
      inputRef.current.focus();
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newPeople]);

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setNewPeople(false);
    }
  };

  const handleClick = (e) => {
    if (e.key === "Enter") {
      sendNewData(newData);
      setNewPeople(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value
    setNewData(value)
  }

  return (
    <div
      className={`flex w-[40%] bg-white border justify-between relative rounded-md ${
        newPeople ? "expandBorder" : ""
      }`}
    >
      <div className="flex w-full flex-col gap-4 justify-center relative px-4 py-1">
        <div className="flex w-[80%] gap-2 items-center">
          <PiUserCircle className="text-2xl" />
          {newPeople ? (
            <div className="flex gap-2">
              <input
                type="text"
                name="nama"
                className="w-full border-b-2 outline-none text-[10.5px] font-medium"
                ref={inputRef}
                onChange={handleChange}
                onKeyDown={handleClick}
                autoFocus
                autoComplete="off"
              />
            </div>
          ) : (
            <button
              onClick={() => {
                setNewPeople(true);
              }}
            >
              <BsPlusCircleDotted />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
