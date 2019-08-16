import React, { useReducer, createContext, useEffect } from "react";
import taskReducer from "../reducers/taskReducer.js";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  register: "",
  button: false,
  userTasks: {},
  isLogin: localStorage.getItem("token") || false
};

const TaskContextProvider = props => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const value = { state, dispatch };

  return (
    <TaskContext.Provider value={value}>
      {" "}
      {props.children}{" "}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
