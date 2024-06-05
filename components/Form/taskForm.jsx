"use client";
import React, { useState, useContext } from "react";
import { createGroupTask } from "../../data/Group";
import { createTask } from "../../data/Task";
import { usePathname } from "next/navigation";
import { useTaskDispatch, useTasks } from "../../app/TaskContext";
import { toast } from "sonner";

export default function TaskForm(props) {
  const { sendOpen } = props;
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    Judul: "",
    Mata_Kuliah: "",
    Deadline: "",
    Jam: "",
  });

  const dispatch = useTaskDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButton = async (e) => {
    e.preventDefault();

    if (
      !formData.Judul ||
      !formData.Mata_Kuliah ||
      !formData.Deadline ||
      !formData.Jam
    ) {
      return toast.error("Error : Data tidak boleh kosong");
    }

    if (pathname === "/taskboard") {
      const response = await createTask(formData);
      if (response.status !== 201) {
        return toast.error("Error : Gagal membuat data");
      }
      console.log("Halaman TaskBoard");
    } else if (pathname === "/group") {
      const response = await createGroupTask(formData);
      if (response.status !== 201) {
        return toast.error("Error : Gagal membuat data");
      }
    }

    dispatch({
      type: "ADD_TASK_TO_GROUP_TASK",
      payload: {
        dataObject: formData,
      },
    });

    dispatch({
      type: "CREATE_DATA",
    });
    toast.success("Tugas Berhasil Dibuat");
    sendOpen(false);
  };

  return (
    <div className="flex text-sm text-gray-500">
      <form className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Judul Tugas</label>
          <input
            type="text"
            name="Judul"
            className="border-b-2 outline-none px-1 py-1.5 rounded-sm w-[90%] text-black text-sm font-medium"
            onChange={handleChange}
            value={formData.Judul}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Mata Kuliah</label>
          <input
            type="text"
            name="Mata_Kuliah"
            className="border-b-2 outline-none px-1 py-1.5 rounded-sm w-[90%] text-sm text-black"
            onChange={handleChange}
            value={formData.Mata_Kuliah}
          />
        </div>
        <div className="flex w-full gap-8">
          <div className="flex w-[40%] flex-col gap-2">
            <label className="text-sm font-semibold">Deadline</label>
            <input
              type="date"
              name="Deadline"
              className="border-b-2 outline-none px-1 py-1.5 rounded-sm w-full text-sm text-black"
              onChange={handleChange}
              value={formData.Deadline}
            />
          </div>
          <div className="flex w-[40%] flex-col gap-2">
            <label className="text-sm font-semibold">Time</label>
            <input
              type="time"
              step="60"
              name="Jam"
              className="border-b-2 outline-none px-1 py-1.5 rounded-sm text-sm text-black"
              onChange={handleChange}
              value={formData.Jam}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleButton}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
