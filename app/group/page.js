"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import GroupCard from "../../components/GroupCard/groupCard";
import NewGroupCard from "../../components/GroupCard/newGroupCard";
import NavbarGroup from "../../components/Group/navbarGroup";
import GroupTaskCard from "../../components/Taskcard/groupTaskCard";

import { useTaskDispatch, useTasks } from "../TaskContext";
import { createGroup } from "../../data/Group";
import { uuid } from "uuidv4";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function Page() {
  const [group, setGroup] = useState([]);
  const [idMatkul, setIdMatkul] = useState(null);
  const [admin, setAdmin] = useState(false);

  const dispatch = useTaskDispatch();
  const { data: session } = useSession();
  const sesi = useSession();

  useEffect(() => {
    if (session?.user?.role === "Ketua Kelas" || session?.user?.role === "Staff Kelas") {
      setAdmin(true);
    } 
}, [session]);

  const getGroup = (data) => {
    setGroup(data);
  };

  const getInputFilter = (data) => {
    setFilter(data);
  };

  const getIdMatkul = (data) => {
    setIdMatkul(data);
  };

  const addGroup = async () => {
    const fullUID = uuid();
    const shortUID = fullUID.slice(0, 8);
    const newData = {
      UID_Grup: shortUID,
      UID_Matkul: idMatkul,
      Name: `Kelompok ${group.length + 1}`,
    };

    try {
      const response = await createGroup(newData);
      if (response.status !== 201) {
        return toast.error("Error : Gagal membuat group");
      }
      setGroup([...group, newData]);
    } catch (error) {
      return error;
    }
    dispatch({
      type: "RESET_NEW_GROUP",
    });
  };

  return (
    <main className="flex w-full justify-center bg-white">
      <div className="flex w-[96%] h-[77vh] rounded-b-2xl bg-[#f3f6ff]">
        <div className="flex w-full flex-col relative">
          <div className="flex w-[97%] h-[75vh] rounded-lg gap-4 flex-col mx-6 pt-8 max-md:mx-2 max-md:h-full">
            <NavbarGroup
              sendData={getGroup}
              sendIdMatkul={getIdMatkul}
              sendGroup={getGroup}
            />
            <div className="flex h-[70vh] flex-wrap gap-6 overflow-auto">
              {group.length === 0 && !admin ? (
                <div className="flex w-full justify-center items-center">
                  <p className="font-medium">Tidak ada grup</p>
                </div>
              ) : (
                group.map((data) => (
                  <GroupCard
                    key={data.UID_Grup}
                    name={data.Name}
                    id={data.UID_Grup}
                  />
                ))
              )}
              {admin ? <NewGroupCard addGroup={addGroup} /> : ""}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[20%] p-6 bg-white mx-2 my-6 shadow-md rounded-lg">
          <GroupTaskCard />
        </div>
      </div>
    </main>
  );
}
