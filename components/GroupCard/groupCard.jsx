"use client";
import React, { useState, useEffect } from "react";
import { getMembers, createMembers } from "../../data/Group";
import { PiCirclesThreePlusLight } from "react-icons/pi";
import PeopleCard from "../GroupCard/peopleCard";
import NewPeopleCard from "./newPeopleCard";
import { toast } from "sonner";
import { uuid } from "uuidv4";
import { useSession } from "next-auth/react";

export default function GroupCard(props) {
  const { index, name, id } = props;
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.role === "Ketua Kelas" || "Staff Kelas") {
      setAdmin(true);
    }
  }, [session]);

  const fetchMembers = async () => {
    try {
      const result = await getMembers(id);
      setUser(result);
    } catch (error) {
      toast.error("Gagal mengambil data");
      return error;
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [id]);

  const deleteUser = (id) => {
    const newData = user.filter((item) => item.ID_Member !== id);
    setUser(newData);
  };

  const addUser = async (data) => {
    const fullUID = uuid();
    const shortUID = fullUID.slice(0, 8);
    const newData = {
      ID_Member: shortUID,
      UID_Grup: id,
      Nama: data,
    };

    try {
      const response = await createMembers(newData);
      if (response.status !== 201) {
        return toast.error("Gagal membuat data");
      }
      setUser([...user, newData]);
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="flex border relative w-[250px] h-[270px] bg-white rounded-lg shadow-md">
      <div className="flex w-full relative flex-col gap-4">
        <div className="flex w-full justify-between items-center pr-4 border-b-2 rounded-tl-lg rounded-tr-lg">
          <h1 className="text-sm font-medium p-3">{name}</h1>
        </div>
        <div className="flex w-full relative h-[67%] px-2">
          <div className="flex w-full flex-col gap-4 pb-4 overflow-auto">
            {user.map((data) => (
              <PeopleCard
                key={data.ID_Member}
                name={data.Nama}
                id={data.ID_Member}
                deleteData={deleteUser}
              />
            ))}
            {admin ? <NewPeopleCard sendNewData={addUser} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
