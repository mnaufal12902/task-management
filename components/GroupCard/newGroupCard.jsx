import React from "react";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";
import { useTaskDispatch, useTasks } from "../../app/TaskContext";

export default function NewGroupCard(props) {
  const { addGroup } = props;
  const newGroup = useTasks().newGroup;
  const dispatch = useTaskDispatch();

  const handleButton = (e) => {
    e.preventDefault();
    dispatch({
      type: "NEW_GROUP"
    })
    addGroup();
  };

  return (
    <div className="flex justify-center items-center border-slate-400 border-2 border-dashed relative w-[250px] h-[270px] rounded-lg">
      <button className="rounded-lg" onClick={handleButton}>
        <div className="border-black border-dashed border rounded-lg p-8">
          <HiPlus className="text-xl" />
        </div>
      </button>
    </div>
  );
}
