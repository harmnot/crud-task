import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import runAPI from "../API.js/runAPI.js";
import Swal from "sweetalert2";
import { TaskContext } from "../contexts/taskContext.js";
import AddTask from "../components/addtask.js";

const Task = props => {
  const { state, dispatch } = useContext(TaskContext);

  useEffect(() => {
    let didCancel = false;
    runAPI
      .get("api/task/tasks")
      .then(({ data: { data: data } }) => {
        if (!didCancel) {
          dispatch({ type: "FETCH_TASK", payload: data });
          console.log(data, "ini data");
        }
      })
      .catch(error => {
        dispatch({ type: "FETCH_TASK", payload: "failed" });
        Swal.fire({
          title: "Error!",
          text: error.response.error,
          timer: 2000,
          type: "error",
          showCancelButton: false,
          showConfirmButton: false
        });
      });

    return () => {
      didCancel = true;
    };
  }, []);

  const style = {
    width: "3rem",
    height: "3rem"
  };

  const check = async condition => {
    if (condition) {
      return { textDecoration: "line-through" };
    }
  };

  const del = async (index, id) => {
    try {
      const { data } = await runAPI.delete(`api/task/${id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      if (data.error) {
        Swal.fire({
          title: "Error!",
          text: data.error,
          timer: 2000,
          type: "error",
          showCancelButton: false,
          showConfirmButton: false
        });
      } else {
        dispatch({ type: "DELETE_TASK", payload: { index } });
      }
    } catch (error) {
      console.log(error.response, "inniii error");
      Swal.fire({
        title: "Error!",
        text: error.response.data.error,
        timer: 2000,
        type: "error",
        showCancelButton: false,
        showConfirmButton: false
      });
    }
  };

  const updateTask = id => {
    props.history.push(`/task/update/${id}`);
  };

  const button = {
    padding: "0.200rem -1.15rem",
    fontSize: "8px"
  };

  const width = {
    width: "300px"
  };

  return (
    <Router>
      <div className="container mt-4">
        <AddTask />{" "}
        {!state.tasks ? (
          <div className="p-4 row">
            <div className="mt-4"></div>
            <div className="mt-4"></div>
            <div className="mx-auto">
              <div className="spinner-border" style={style} role="status"></div>
            </div>
          </div>
        ) : (
          <div className="row">
            {state.tasks.map((val, index) => {
              return (
                <div
                  className="p-2 border border-dark m-2"
                  style={width}
                  key={index}
                >
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-primary m-1"
                      style={button}
                      onClick={() => updateTask(val._id)}
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger m-1"
                      style={button}
                      onClick={() => del(index, val._id)}
                    >
                      del
                    </button>
                  </div>
                  <div className="p-2">
                    <h3> {val.title} </h3>
                  </div>

                  <div className="p-2">
                    {val.list.map((list, j) => (
                      <div key={j} style={check(list.finish)}>
                        {list.listName}
                      </div>
                    ))}
                  </div>

                  <div className="p-2 d-flex flex-row ">
                    <div>
                      <b>for</b>

                      {val.taskFor.length > 0 ? (
                        <>
                          {val.taskFor.map((h, i) => {
                            let colors = [
                              "primary",
                              "secondary",
                              "success",
                              "warning",
                              "info",
                              "dark"
                            ];
                            let random =
                              colors[Math.floor(Math.random() * colors.length)];
                            let className = [
                              "badge",
                              `badge-${random}`,
                              "mx-2"
                            ];
                            return (
                              <span className={className.join(" ")} key={i}>
                                {h.name}
                              </span>
                            );
                          })}
                        </>
                      ) : (
                        <span className="badge badge-danger mx-2">all</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-4"></div>
    </Router>
  );
};

export default Task;
