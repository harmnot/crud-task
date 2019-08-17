import React, { useReducer, createContext, useEffect } from "react";
import taskReducer from "../reducers/taskReducer.js";
import Swal from "sweetalert2";
import runAPI from "../API.js/runAPI.js";

const TaskContext = createContext();

const initialState = {
  tasks: null,
  register: "",
  button: false,
  userTasks: {},
  employeees: [],
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
