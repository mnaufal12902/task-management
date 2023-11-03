"use client";
import { LiaCalendarAltSolid } from "react-icons/lia";
import { BiTimeFive, BiUser } from "react-icons/bi";
import moment from "moment";

export default function TaskSC(props) {
  const { Judul, Mata_Kuliah, Deadline, Jam } = props;

  const slicingTime = Jam.substring(0, 5);
  const sortDate = moment(Deadline, "YYYY-MM-DD").format("DD-MM-YYYY");

  const taskStyle = {
    backgroundColor: "#0d1b3e",
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
        </div>
      </div>
      <div id="labelColor" className={`w-[5px]`} style={taskStyle}></div>
    </div>
  );
}
