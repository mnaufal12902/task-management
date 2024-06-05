'use client'
import React, { useEffect, useState } from 'react';
import {getGroupTask} from '../../data/Group';
import {useTaskDispatch, useTasks} from '../../app/TaskContext';
import SKtask from '../Skeleton/SKtask';
import GroupTask from '../Task/groupTask';

export default function GroupTaskCard() {
  const [groupTask, setGroupTask] = useState([]);
  const [loading, setLoading] = useState(true);

  const {dataGroupTask} = useTasks();

  const fetchTask = async () => {
    try {
      const response = await getGroupTask();
      setLoading(false);
      setGroupTask(response)
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  useEffect(() => {
    if (Object.keys(dataGroupTask).length !== 0) {
      setGroupTask([...groupTask, dataGroupTask]);
    }
  }, [dataGroupTask])

  useEffect(() => {
    fetchTask();
  }, [])

  return (
    <div className="flex h-[500px] overflow-auto relative flex-col gap-4">
    <div>
      <h1 className="text-lg font-semibold">Tugas Kelompok</h1>
    </div>
    <div className="flex w-full relative h-[90%]">
      <div className="flex w-[290px] flex-col gap-4 overflow-auto">
      {loading ? (
            <div className="flex flex-col gap-4">
              <SKtask />
              <SKtask />
              <SKtask />
            </div>
          ) : groupTask.length === 0 ? (
            <div className="flex w-full justify-center">
              <p className="text-sm font-medium">{`Tidak Ada Tugas Kelompok`}</p>
            </div>
          ) : (
            groupTask.map((task) => {
              return (
                <GroupTask
                  key={task.UID}
                  UID={task.UID}
                  Judul={task.Judul}
                  Mata_Kuliah={task.Mata_Kuliah}
                  Deadline={task.Deadline}
                  Jam={task.Jam}
                />
              );
            })
          )}
      </div>
    </div>
  </div>
  )
}
