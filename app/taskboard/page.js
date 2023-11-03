"use client";
import FilterbarTask from "../../components/Filterbar/filterbarTask.jsx";
import Navbar from "../../components/Navbar/navbar.jsx";
import { useEffect, useState, useContext } from "react";
import { useTaskDispatch, useTasks } from "../TaskContext.js";
import Taskcard from "../../components/taskcard/taskcard.jsx";
import TaskCardSC from "../../components/Taskcard/taskcardSC.jsx";
import { getTask, getTaskSC } from "../../data/Task.js";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function Home() {
  const [day, setDay] = useState("Semua");
  const [filter, setFilter] = useState("");
  const [dataTask, setDataTask] = useState([]);
  const [dataTaskSC, setDataTaskSC] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {data:session} = useSession()  
  const dispatch = useTaskDispatch();
  const newData = useTasks().newData;
  const username = session?.user?.username
  
  const receivedData = (data) => {
    setDay(data);
  };

  const inputFilter = (data) => {
    setFilter(data);
  };

  // Date Today
  const objDate = new Date();
  const year = objDate.getFullYear();
  const month = String(objDate.getMonth() + 1).padStart(2, "0");
  const dateOfMonth = String(objDate.getUTCDate()).padStart(2, "0");

  const dateToday = `${year}-${month}-${dateOfMonth}`;

  // Date Tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(objDate.getDate() + 1);
  const yearTomorrow = tomorrow.getFullYear();
  const monthTomorrow = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const dateOfMonthTomorrow = String(tomorrow.getDate()).padStart(2, "0");

  const dateTomorrow = `${yearTomorrow}-${monthTomorrow}-${dateOfMonthTomorrow}`;

  const NewDataTask = [
    {
      id: 1,
      day: "Hari ini",
      task: dataTask.filter((item) => item.Deadline === dateToday),
    },
    {
      id: 2,
      day: "Besok",
      task: dataTask.filter((item) => item.Deadline === dateTomorrow),
    },
    {
      id: 3,
      day: "Mendatang",
      task: dataTask.filter(
        (item) => new Date(item.Deadline) > new Date(dateTomorrow)
      ),
    },
  ];

  const FilterNewTask =
    day === "Semua"
      ? NewDataTask
      : NewDataTask.find((item) => item.day === day);

  const fetchData = async () => {
    try {
      console.log(username)
      const resultTask = await getTask();
      const resultTaskSC = await getTaskSC(username);
      setDataTaskSC(resultTaskSC);
      setDataTask(resultTask);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status !== 200) {
        return toast.error("Error: Gagal mengambil data");
      }
    }
  };

  useEffect(() => {
    if (username !== "") {
      fetchData();
    }
  }, [username]);


  useEffect(() => {
    dispatch({
      type: "RESET_NEW_DATA",
    });
  }, [dataTaskSC]);

  useEffect(() => {
    if (newData) {
      fetchData();
    }
  }, [newData]);

  return (
    <main className="flex w-full justify-center bg-white">
      <div className="flex w-[96%] gap-8 h-[77vh] rounded-b-2xl bg-[#f3f6ff] max-md:flex-col max-md:h-[235vh] max-md:gap-4">
        <div className="flex w-[75%] flex-col max-md:w-full">
          <div className="flex w-full pl-8 py-6 max-md:pl-2">
            <FilterbarTask sendDay={receivedData} sendFilter={inputFilter} />
          </div>
          <div className="px-8 max-md:px-2">
            <p className="font-bold text-2xl">My Taskboard</p>
          </div>
          <div className="flex w-full h-full flex-col pl-6 py-4 relative max-md:pl-2">
            <div className="flex w-full h-full gap-6 max-md:flex-col max-md:items-center">
              {FilterNewTask.length > 1 ? (
                FilterNewTask.map((data) => (
                  <Taskcard
                    key={data.id}
                    dataTask={FilterNewTask}
                    dataTaskSC={dataTaskSC}
                    day={data.day}
                    loading={isLoading}
                    filterMatkul={filter}
                  />
                ))
              ) : (
                <Taskcard
                  key={FilterNewTask.id}
                  dataTask={FilterNewTask}
                  dataTaskSC={dataTaskSC}
                  day={FilterNewTask.day}
                  loading={isLoading}
                  filterMatkul={filter}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex w-[25%] h-[90%] max-md:flex max-md:w-full max-md:justify-center max-md:items-center max-md:pb-10">
          <div className="flex flex-col w-[86%] h-full p-6 bg-white mr-6 my-6 shadow-md rounded-lg max-md:my-2 max-md:h-[50vh] max-md:items-center max-md:mr-0">
            <TaskCardSC
              dataTaskSC={dataTaskSC}
              loading={isLoading}
              filterMatkul={filter}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
