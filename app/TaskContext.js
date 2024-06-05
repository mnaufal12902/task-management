"use client";
import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext(null);
const TaskDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

export function useTaskDispatch() {
  return useContext(TaskDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "CREATE SESSION": {
      return {...tasks, user:action.user}
    }
    case "CREATE_TOKEN": {
      return {...tasks, token:action.token}
    }
    case "CREATE_DATA": {
      return { ...tasks, newData: true };
    }
    case "NEW_GROUP": {
      return { ...tasks, newGroup: true};
    }
    case "RESET_NEW_GROUP": {
      return { ...tasks, newGroup: false};
    }
    case "RESET_NEW_DATA": {
      return { ...tasks, newData: false };
    }
    case "ADD_TASK_TO_GROUP_TASK": {
      const { dataObject } = action.payload;
      return { ...tasks, dataGroupTask: dataObject };
    }
    default: {
      return tasks;
    }
  }
}

const initialTasks = {
  user: {
    nama: "",
    username: "",
    role: ""
  },
  token: null,
  dataGroupTask: {},
  newData: false,
  newGroup: false,
  index: 1
};
