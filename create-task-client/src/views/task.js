import React, { useState, useEffect } from "react";
import ListTask from "../components/listTask.js";
import runAPI from "../API.js/runAPI.js";
import Swal from "sweetalert2";

const Task = () => {
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    const fetfchTasks = async () => {
      try {
        const {
          data: { data }
        } = await runAPI.get("api/task/tasks");
        setTasks(data);
      } catch ({
        response: {
          data: { error }
        }
      }) {
        Swal.fire({
          title: "Error!",
          text: error,
          timer: 2000,
          type: "error",
          showCancelButton: false,
          showConfirmButton: false
        });
      }
    };
    fetfchTasks();
  }, []);

  return (
    <div>
      <h1> Hello </h1>
    </div>
  );
};

export default Task;
