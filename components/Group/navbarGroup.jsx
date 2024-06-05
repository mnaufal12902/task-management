"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { getMatkul, createMatkul, getGroup } from "../../data/Group";
import NewMatkul from "./newMatkul";
import SKmatkul from "./../Skeleton/SKmatkul";
import AddGroup from "../Dialog/addGroupTask";
import { useTaskDispatch } from "../../app/TaskContext";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { uuid } from "uuidv4";

export default function NavbarGroup(props) {
  const { sendData, sendIdMatkul, sendGroup } = props;
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [matkul, setMatkul] = useState([]);
  const [activeButton, setActiveButton] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.role === "Ketua Kelas" || session?.user?.role === "Staff Kelas") {
      setAdmin(true);
    } 
}, [session]);

  const fetchData = async () => {
    try {
      const result = await getMatkul();
      setMatkul(result);

      const idMatkul = result[0].UID_Matkul;
      try {
        const resultGroup = await getGroup(idMatkul);
        sendGroup(resultGroup);
      } catch (error) {
        return error;
      }

      setLoading(false);
    } catch (error) {
      return console.log(error);
    }
  };

  const fetchGroup = async (data) => {
    try {
      const response = await getGroup(data);
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dispatch = useTaskDispatch();

  const handleButtonClick = async (e, index, UID_Matkul) => {
    e.preventDefault();
    sendIdMatkul(UID_Matkul);
    try {
      const response = await getGroup(UID_Matkul);
      sendData(response);
    } catch (error) {
      return console.log(error);
    }
    setActiveButton(index);
  };

  const addMatkul = async (data) => {
    const fullUID = uuid();
    const shortUID = fullUID.slice(0, 8);
    const newData = {
      UID_Matkul: shortUID,
      Mata_Kuliah: data,
    };

    try {
      const response = await createMatkul(newData);
      if (response.status !== 201) {
        return toast.error("Error: Gagal membuat data");
      }
      toast.success("Mata Kuliah berhasil dibuat");
    } catch (error) {
      toast.error("Error :Gagal Membuat data");
      return console.log(error);
    }
    setMatkul([...matkul, newData]);
  };

  return (
    <div className={`flex w-full justify-between border gap-4 text-xs items-center bg-white px-4 py-2 border-b-2 rounded-md ${admin ? "max-md:px-2" : "max-md:px-4"} max-md:gap-2`}>
      <div
        className={`flex items-center flex-nowrap pb-1 gap-2 overflow-auto ${
          admin ? "w-[75%] max-md:w-[60%] max-md:border-r-2" : "w-full max-md:w-full"
        }  `}
      >
        {loading ? (
          <SKmatkul />
        ) : (
          matkul.map((data, index) => (
            <button
              className={`px-4 h-[40px] text-[10px] text-left font-semibold max-md:text-[8px] max-md:px-2 max-md:w-[200px] ${
                activeButton === index
                  ? "border-b-2 border-b-[#6e9fff]"
                  : "hover:border-b-2 hover:border-b-[#6e9fff]"
              }`}
              key={data.UID_Matkul}
              onClick={(e) => handleButtonClick(e, index, data.UID_Matkul)}
            >
              {data.Mata_Kuliah}
            </button>
          ))
        )}
        <NewMatkul sendNewData={addMatkul} />
      </div>
      {admin ? (
        <div className="flex justify-end items-center gap-4 w-[25%] max-md:w-[40%] max-md:gap-1">
          <div>
            <AddGroup />
          </div>
          <div>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2.5 rounded-md border-2 mr-2 max-md:px-2.5 max-md:py-0.5"
              onClick={() => {
                dispatch({
                  type: "CREATE_DATA",
                });
              }}
            >
              <MdOutlineGroupAdd className="text-sm" />
              <p className="text-xs font-medium max-md:text-[8px]">Add Matkul</p>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
