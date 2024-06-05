"use client";
import React, { useEffect, useRef, useState } from "react";
import {useRouter} from 'next/navigation'
import Select from "react-select";
import { toast } from "sonner";

import { MdOutlineEditNote } from "react-icons/md";

import { useTasks } from "../TaskContext";
import { getUsers, updateUsers, updatePassword } from "../../data/Users";

export default function Users() {
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingPage, setLoadingPage]  = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNamaEnabled, setIsNamaEnabled] = useState(false);
  const [isRoleEnabled, setIsRoleEnabled] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  const router = useRouter();

  const userActive = useTasks().user;
  const namaRef = useRef(null);
  const roleRef = useRef(null);

  const optionsRole = [
    { value: "Staff Kelas", label: "Staff Kelas"},
    { value: "Anggota Kelas", label: "Anggota Kelas"}
  ];

  const handleChange = (e) => {
    const findUser = dataUsers.find((user) => user.Username === e.value);
    setUser(findUser);
    setNama(findUser.Nama);
    setRole(findUser.Role);
    setIsNamaEnabled(false);
    setIsRoleEnabled(false);
  };

  const handleSubmitClick = async (field) => {
    if (field === "Nama") {
      setLoading(true);
      try {
        const response = await updateUsers(user.Username, { Nama: nama });
        if (response.status !== 201) {
          return toast.error(response.data.data.serverMessage);
        }
        setLoading(false);
        toast.success(response.data.message);
        setIsNamaEnabled(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
        return toast.error("Gagal update data");
      }
    } else if (field === "Role") {
      setLoading(true);
      try {
        const response = await updateUsers(user.Username, { Role: role });
        if (response.status !== 201) {
          return toast.error(response.data.data.serverMessage);
        }
        setLoading(false);
        toast.success(response.data.message);
        setIsRoleEnabled(false);
      } catch (error) {
        setLoading(false);
        return toast.error("Gagal update data");
      }
    }
  };

  const handleUbahClick = (field) => {
    if (field === "Nama") {
      if (user === null) {
        return toast.error("Silahkan pilih user");
      }
      setIsNamaEnabled(true);
    } else if (field === "Role") {
      if (user === null) {
        return toast.error("Silahkan pilih user");
      }
      setIsRoleEnabled(true);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        const filterData = data.filter(
          (user) => user.Username !== userActive.username && user.Role !== "Ketua Kelas"
        );
        setDataUsers(filterData);
        setOptions(
          filterData.map((user) => {
            return {
              value: user.Username,
              label: user.Nama,
            };
          })
        );
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchData();
  }, [userActive]);

  useEffect(() => {
    if (userActive.role !== "Ketua Kelas") {
      router.push('/taskboard')
    }
  }, [])
  
  if (userActive.role !== "Ketua Kelas") {
    return null
  }
  
  return (
    <main className="flex w-full justify-center bg-white">
      <div className="flex w-[96%] gap-8 h-[77vh] rounded-b-2xl max-md:flex-col max-md:gap-4">
        <div className="flex w-full p-8 max-md:p-4">
          <div className="flex gap-6 flex-col w-[45%] max-md:w-full max-md:gap-2">
            <div>
              <p className="text- xl font-semibold">User Management</p>
            </div>
            <div className="">
              <p className="text-xs">Silahkan pilih user dibawah ini </p>
            </div>
            <div className="w-[70%]">
              <Select
                options={options}
                onChange={handleChange}
                className="text-xs"
              />
            </div>
            <div className="flex w-full gap-8 max-md:flex-col max-md:gap-4">
              <div className="flex items-center w-[40%] max-md:w-[70%]">
                <div className="flex w-full flex-col gap-2">
                  <label className="text-[11px] font-medium">Nama </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      disabled={!isNamaEnabled}
                      value={nama}
                      onChange={(e) => {
                        setNama(e.target.value);
                      }}
                      className="border px-3 py-2 text-[11px] outline-none rounded-sm"
                      ref={namaRef}
                    />
                    <button
                      onClick={() =>
                        isNamaEnabled
                          ? handleSubmitClick("Nama")
                          : handleUbahClick("Nama")
                      }
                      className="text-[11px] font-medium"
                    >
                      {isNamaEnabled ? (
                        loading ? (
                          <div className="loader-small"></div>
                        ) : (
                          "Submit"
                        )
                      ) : (
                        "Ubah"
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-[40%] max-md:w-[70%]">
                <div className="flex w-full flex-col gap-2">
                  <label className="text-[11px] font-medium">Role </label>
                  <div className="flex items-center gap-2">
                    {/* <input
                      type="text"
                      value={role}
                      disabled={!isRoleEnabled}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                      className="border px-3 py-2 text-[11px] outline-none rounded-sm"
                      ref={roleRef}
                    /> */}
                    <Select 
                      options={optionsRole}
                      isDisabled={!isRoleEnabled}
                      className="w-[60%] text-xs"
                      onChange={(e) => {
                        setRole(e.value);
                      }}
                    />
                    <button
                      onClick={() =>
                        isRoleEnabled
                          ? handleSubmitClick("Role")
                          : handleUbahClick("Role")
                      }
                      className="text-[11px] font-medium"
                    >
                      {isRoleEnabled ? (
                        loading ? (
                          <div className="loader-small"></div>
                        ) : (
                          "Submit"
                        )
                      ) : (
                        "Ubah"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2 gap-4">
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium">Change password</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    user
                      ? setIsPasswordEnabled((prevValue) => !prevValue)
                      : toast.error("Silahkan pilih user");
                  }}
                >
                  <MdOutlineEditNote />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col w-[40%] gap-2 max-md:w-[50%]">
                  <label className="text-[11px] font-medium">
                    New password{" "}
                  </label>
                  <input
                    type="password"
                    disabled={!isPasswordEnabled}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    className="border px-3 py-2 text-[11px] outline-none rounded-sm"
                  />
                </div>
                <div className="flex flex-col w-[40%] gap-2 max-md:w-[50%]">
                  <label className="text-[11px] font-medium">
                    Confirm password{" "}
                  </label>
                  <input
                    type="password"
                    disabled={!isPasswordEnabled}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    className="border px-3 py-2 text-[11px] outline-none rounded-sm"
                  />
                </div>
                <div>
                  <button
                    className="border text-xs px-3 py-1 rounded-md bg-[#3b7eff] text-white items-center"
                    disabled={!isPasswordEnabled}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (newPassword !== confirmPassword) {
                        return toast.error("Password not matching");
                      } else {
                        setLoadingButton(true);
                        try {
                          const response = await updatePassword(user.Username, {
                            Pass: newPassword,
                          });
                          if (response.status !== 201) {
                            setLoadingButton(false)
                            return toast.error(`Gagal update data : ${response.data.message}`);
                          }
                          setLoadingButton(false);
                          toast.success(response.data.message);
                          setNewPassword("");
                          setConfirmPassword("");
                          setIsPasswordEnabled(false);
                        } catch (error) {
                          console.log(error)
                          setLoadingButton(false);
                          return toast.error("Gagal update data");
                        }
                      }
                    }}
                  >
                    {loadingButton ? (
                      <div className="loader-white-small"></div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
