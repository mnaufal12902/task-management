"use client";
import React, { useState, useEffect } from "react";
import { PiUserCircle } from "react-icons/pi";
import { FiTrash } from "react-icons/fi";
import { deleteMembers } from "../../data/Group";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function PeopleCard(props) {
  const { name, id, deleteData } = props;
  const [admin, setAdmin] = useState(false);

  const {data:session} = useSession();

  useEffect(() => {
    if (session?.user?.role === "Ketua Kelas" || "Staff Kelas") {
      setAdmin(true);
    }
  }, [session]);

  const handleDelete = async () => {
    try {
      const response = await deleteMembers(id);
      if (response.status !== 200) {
        console.log(response);
        return toast.error("Error : Gagal menghapus data");
      }
      deleteData(id);
    } catch (error) {
      console.log(error);
      toast.error("Error : Gagal menghapus data");
      return error;
    }
  };

  return (
    <div className="flex w-full bg-white border justify-between relative rounded-md hover">
      <div className="flex w-full justify-between items-center gap-4 relative px-4 py-1">
        <div className="flex w-[80%] gap-2 items-center">
          <PiUserCircle className="text-xl" />
          <p className="text-[10.5px] font-medium">{name}</p>
        </div>
        {admin ? (
          <div className="flex w-[20%] items-center justify-end">
            <button className="hover:text-[#6e9fff]" onClick={handleDelete}>
              <FiTrash className="text-xs" />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
