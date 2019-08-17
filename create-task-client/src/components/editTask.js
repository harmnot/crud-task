import React, { useContext, useRef, useEffect } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { TaskContext } from "../contexts/taskContext.js";
import runAPI from "../API.js/runAPI.js";
import Swal from "sweetalert2";

const AddTask = props => {
  const { state, dispatch } = useContext(TaskContext);
  let title = useRef(null);
  let listTask = useRef(null);

  useEffect(() => {
    let didCancel = false;
    const id = props.match.params.id;
    runAPI
      .get(`api/task/${id}`)
      .then(({ data }) => {
        if (!didCancel) {
          dispatch({ type: "FETCH_DATA_LIST", payload: data.data.list });
          dispatch({ type: "FETCH_DATA_TASKFOR", payload: data.data.taskFor });
          dispatch({ type: "FETCH_DATA", payload: data.data });
        }
      })
      .catch(error => {
        Swal.fire({
          title: "Error",
          text: error.response.data.error,
          type: "error",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        });
      });

    return () => {
      dispatch({ type: "FETCH_DATA", payload: null });
      didCancel = true;
    };
  }, []);

  const delList = i => {
    dispatch({ type: "DELETE_TASK_LIST_UPDATE", payload: { index: i } });
  };

  const onKeyPress = e => {
    if (e.which === 13 && listTask.current.value !== "") {
      dispatch({ type: "ADD_LIST_TASK", payload: listTask.current.value });
      listTask.current.value = "";
    }
  };

  const updateThisTask = async () => {
    if (title.current.value === "" || state.list.length === 0) {
      Swal.fire({
        title: "Warning",
        text: "please input valid task",
        type: "warning",
        timer: 1800,
        showCancelButton: false,
        showConfirmButton: false
      });
    } else {
      const updateTask = {
        title: title.current.value,
        list: state.list,
        taskFor: state.taskFor
      };

      try {
        const { data } = await runAPI.put(
          `api/task/${state.task._id}`,
          updateTask,
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        setTimeout(() => {
          props.history.push("/task");
        }, 2000);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response.data.error,
          type: "error",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        });
      }
    }
  };

  const style = {
    width: "3rem",
    height: "3rem"
  };

  const colorText = {
    color: "red",
    textDecoration: "bold",
    cursor: "pointer"
  };

  return (
    <div className="container mt-4">
      <div className="mx-auto">
        {!state.task ? (
          <div className="p-4 row">
            <div className="mt-4"></div>
            <div className="mt-4"></div>
            <div className="mx-auto">
              <div className="spinner-border" style={style} role="status"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex">
              <div className="col-sm-8">
                <label htmlFor="title">Tittle Task</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  ref={title}
                  aria-describedby="title"
                  placeholder="enter title"
                  defaultValue={state.task.title}
                />
              </div>
            </div>

            <div className="d-flex my-4">
              <div className="col-sm-8">
                <label htmlFor="list">List Task</label>
                <input
                  type="text"
                  className="form-control"
                  ref={listTask}
                  onKeyPress={onKeyPress}
                  placeholder="enter list"
                />
              </div>
            </div>

            <div className="d-flex ">
              <div className="p-2">
                {state.list.map((val, idx) => (
                  <div key={idx} className="d-flex flex-row">
                    <div className="p-2">
                      <span className="badge badge-pill badge-warning">
                        {val.listName}
                      </span>
                    </div>
                    <div
                      className="p-2 mx-1"
                      style={colorText}
                      onClick={() => delList(idx)}
                    >
                      x
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group col-sm-4 mt-4">
              <button onClick={updateThisTask} className="btn btn-primary mr-2">
                Update task
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => props.history.push("/task")}
              >
                cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddTask;
