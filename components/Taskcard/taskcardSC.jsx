"use client";
import React from "react";
import TaskSC from "../Task/taskSC";
import SKtask from "../Skeleton/SKtask";

export default function TaskCardSC(props) {
  const { dataTaskSC, loading, filterMatkul } = props;

  const filteredDataTaskSC = dataTaskSC.filter((taskItem) => {
    return taskItem.Mata_Kuliah.toLowerCase().includes(filterMatkul.toLowerCase());
  });
  

  return (
    <div className="flex w-full h-full overflow-auto relative flex-col gap-4">
      <div>
        <h1 className="text-lg font-semibold">Tugas Selesai</h1>
      </div>
      <div className="flex w-full relative h-[90%]">
        <div className="flex w-full flex-col gap-4 overflow-auto">
        {loading ? (
              <div className="flex flex-col gap-4">
                <SKtask />
                <SKtask />
                <SKtask />
              </div>
            ) : filteredDataTaskSC.length === 0 ? (
              <div className="flex w-full justify-center">
                <p className="text-sm font-medium">{`Tidak Ada Tugas Yang Selesai`}</p>
              </div>
            ) : (
              filteredDataTaskSC.map((task) => {
                return (
                  <TaskSC
                    key={task.UID}
                    UID={task.UID}
                    Judul={task.Judul}
                    Mata_Kuliah={task.Mata_Kuliah}
                    Deadline={task.Deadline}
                    Jam={task.Jam}
                    Done={task.People}
                  />
                );
              })
            )}
        </div>
      </div>
    </div>
  );
}
