import React from "react";
import { LiaCalendarAltSolid } from "react-icons/lia";
import { BiTimeFive, BiUser, BiCheck } from "react-icons/bi";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function SKtask() {
  return (
    <div className="flex pr-2 pt-3 justify-between relative border bg-[#f3f7ff] w-[300px] rounded-md">
      <div className="flex w-full flex-col gap-4 justify-center relative px-4 py-1">
        <div>
          <p className="text-[13px] font-medium skeleton skeleton-header"></p>
          <p className="text-[9px] skeleton skeleton-matkul"></p>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-3">
            <div className="flex items-center gap-[2px]">
              <LiaCalendarAltSolid className="text-[15px]" />
              <p className="text-[9px] skeleton skeleton-footer"></p>
            </div>
            <div className="flex items-center gap-[2px]">
              <BiTimeFive className="text-[15px]" />
              <p className="text-[9px] skeleton skeleton-footer"></p>
            </div>
            <div className="flex items-center gap-[2px]">
              <BiUser className="text-[15px]" />
              <p className="text-[9px] skeleton skeleton-footer"></p>
            </div>
          </div>
          <div>
            <button
              className="flex items-center text-[9px] px-2 py-0.5 rounded-md bg-white
           "
            >
              <MdOutlineNavigateNext className="text-[15px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
