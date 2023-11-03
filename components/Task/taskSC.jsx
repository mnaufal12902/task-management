"use client";
import React, { useEffect, useState } from "react";
import { LiaCalendarAltSolid } from "react-icons/lia";
import { BiTimeFive, BiUser } from "react-icons/bi";
import { getCountTaskSC } from "../../data/Task";
import moment from "moment";

export default function TaskSC(props) {
  const { UID, Judul, Mata_Kuliah, Deadline, Jam } = props;
  const [count, setCount] = useState(0);

  const slicingTime = Jam.substring(0, 5);
  const sortDate = moment(Deadline, "YYYY-MM-DD").format("DD-MM-YYYY");

  
  const getCount = async () => {
    const response = await getCountTaskSC(UID);
    setCount(response);
  };

  useEffect(() => {
    getCount();
  }, [UID]);

  const taskStyle = {
    backgroundColor: "#78e4b9",
  };

  return (
    <div className="flex w-full pr-2 justify-between relative border bg-[#f3f7ff] rounded-md shadow">
      <div className="flex flex-col gap-4 justify-center relative px-4 py-1">
        <div>
          <p className="text-[13px] font-medium">{Judul}</p>
          <p className="text-[9px]">{Mata_Kuliah}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-[2px]">
            <LiaCalendarAltSolid className="text-[15px]" />
            <p className="text-[9px]">{sortDate}</p>
          </div>
          <div className="flex items-center gap-[2px]">
            <BiTimeFive className="text-[15px]" />
            <p className="text-[9px]">{slicingTime}</p>
          </div>
          <div className="flex items-center gap-[2px]">
            <BiUser className="text-[15px]" />
            <p className="text-[9px]">{count}</p>
          </div>
        </div>
      </div>
      <div id="labelColor" className={`w-[5px]`} style={taskStyle}></div>
    </div>
  );
}
