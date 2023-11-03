"use client"
import React, { useEffect } from "react";
import Task from "../Task/task.jsx";
import SKtask from "../Skeleton/SKtask.jsx";
import { getCountTaskSC } from "../../data/Task.js";

export default function Taskcard(props) {
  const { dataTask, dataTaskSC, day, loading, filterMatkul } = props;

  const selectedTask =
    dataTask.length > 1 ? dataTask.find((item) => item.day === day) : dataTask;
  const task = selectedTask.task;

  const filteredTask = task.filter((taskItem) => {
    if (filterMatkul !== "") {
      return (
        taskItem.Mata_Kuliah.toLowerCase().includes(
          filterMatkul.toLowerCase()
        ) && !dataTaskSC.some((data) => taskItem.UID === data.UID)
      );
    } else {
      return !dataTaskSC.some((data) => taskItem.UID === data.UID);
    }
  });

  const randColor = ["#2d5abc", "#78d9e4", "#fa9e60", "#0d1b3e", "#ed2b43"];

  return (
    <div className="flex border relative w-[35%] h-full bg-white rounded-lg shadow-md max-md:w-[80%] max-md:h-[50vh]">
      <div className="flex w-full relative flex-col gap-4 p-4">
        <div>
          <h1 className="text-lg font-semibold">{day}</h1>
        </div>
        <div className="flex w-full relative h-[90%]">
          <div className="flex w-full flex-col gap-4 overflow-auto">
            {loading ? (
              <div className="flex flex-col gap-4">
                <SKtask />
                <SKtask />
                <SKtask />
              </div>
            ) : filteredTask.length === 0 ? (
              <div className="flex w-full justify-center">
                <p className="text-sm font-medium">{`Tidak Ada Tugas ${day}`}</p>
              </div>
            ) : (
              filteredTask.map((task) => {
                const randInt = Math.floor(Math.random() * randColor.length);
                return (
                  <Task
                    key={task.UID}
                    UID={task.UID}
                    Judul={task.Judul}
                    Mata_Kuliah={task.Mata_Kuliah}
                    Deadline={task.Deadline}
                    Jam={task.Jam}
                    Done={task.People}
                    Color={randColor[randInt]}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
