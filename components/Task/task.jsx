'use client'
import React, {useState, useEffect} from "react";
import { LiaCalendarAltSolid } from "react-icons/lia";
import { BiTimeFive, BiUser, BiCheck } from "react-icons/bi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { createTaskSC } from "../../data/Task";
import { useTaskDispatch } from "../../app/TaskContext";
import { getCountTaskSC } from "../../data/Task";
import { useSession } from "next-auth/react";
import moment from 'moment'

export default function Task(props) {
  const { UID, Judul, Mata_Kuliah, Deadline, Jam, Color } = props;
  const [count, setCount] = useState(0);

  const {data:session} = useSession();
  const username = session?.user?.username;

  const getCount = async () => {
    const response = await getCountTaskSC(UID);
    setCount(response);
  };

  useEffect(() => {
    getCount();
  }, [UID]);

  const taskStyle = {
    backgroundColor: Color,
  };

  const slicingTime = Jam.substring(0, 5);
  const sortDate = moment(Deadline, "YYYY-MM-DD").format("DD-MM-YYYY");
  const dispatch = useTaskDispatch();

  return (
    <div className="flex w-[300px] pr-2 justify-between relative border bg-[#f3f7ff] rounded-md max-md:w-full">
      <div className="flex w-full flex-col gap-4 justify-center relative px-4 py-1">
        <div>
          <p className="text-[13px] font-medium">{Judul}</p>
          <p className="text-[9px]">{Mata_Kuliah}</p>
        </div>
        <div className="flex w-full justify-between">
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
          <div>
            <button
              className="flex items-center text-[9px] px-2 py-0.5 rounded-md bg-white
             "
              onClick={async () => {
                const response = await createTaskSC(username, UID);

                if (response.status !== 201) {
                  return console.log(response.status);
                }

                dispatch({
                  type: "CREATE_DATA",
                });
              }}
            >
              <MdOutlineNavigateNext className="text-[15px]" />
            </button>
          </div>
        </div>
      </div>
      <div id="labelColor" className={`w-[5px]`} style={taskStyle}></div>
    </div>
  );
}
