import React, { useState, useContext, useRef, useEffect } from "react";
import { TaskContext } from "../contexts/taskContext.js";
import runAPI from "../API.js/runAPI.js";
import Swal from "sweetalert2";

const AddTask = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [list, setList] = useState([]);
  const [employees, Setemployees] = useState([]);
  const [chooseEmployee, setAssign] = useState(new Map());
  const lists = useRef(null);
  const title = useRef(null);
  const unCheck = useRef(null);

  const onKeyPress = e => {
    if (e.which === 13 && lists.current.value !== "") {
      setList([...list, lists.current.value]);
      lists.current.value = "";
    }
  };

  const deleteList = (val, i) => {
    setList(list.filter((e, j) => j !== i));
  };

  useEffect(() => {
    let didCancel = false;
    runAPI
      .get("api/user/employees")
      .then(({ data }) => {
        if (!didCancel) {
          dispatch({ type: "FETCH_EMPLOYEES", payload: data.data });
        }
      })
      .catch(err => {
        Setemployees([...employees, "failed"]);
      });

    return () => (didCancel = true);
  }, []);

  const handleCheckbox = e => {
    setAssign(
      chooseEmployee.set(`${e.target.name}-${e.target.value}`, e.target.checked)
    );
  };

  const addThisTask = async e => {
    e.preventDefault();

    if (title.current.value === "" || list.length === 0) {
      Swal.fire({
        title: "Warning",
        text: "please input valid task",
        type: "warning",
        timer: 1800,
        showCancelButton: false,
        showConfirmButton: false
      });
    } else {
      const theLists = [];
      const theEmployees = [];
      const ctx = [];
      for (let i of list) {
        theLists.push({ listName: i });
      }
      for (let [key, val] of chooseEmployee) {
        if (val === true) {
          let [ids, names] = key.split("-");
          ctx.push({
            _id: ids,
            name: names
          });
          theEmployees.push(ids);
        }
      }
      const sendTask = {
        title: title.current.value,
        list: theLists,
        taskFor: theEmployees
      };

      const sendTaskToCtx = {
        title: title.current.value,
        list: theLists,
        taskFor: ctx
      };

      try {
        const { data } = await runAPI.post("api/task/addtask", sendTask, {
          headers: {
            token: localStorage.getItem("token")
          }
        });
        sendTaskToCtx._id = data.id;
        dispatch({ type: "ADD_TASK", payload: sendTaskToCtx });
        Swal.fire({
          title: "Success",
          timer: 2000,
          text: "successfully add task",
          type: "success",
          showConfirmButton: false,
          showCancelButton: false
        });
        title.current.value = "";
      } catch (error) {
        Swal.fire({
          title: "Error",
          timer: 2000,
          text: error.response.data.error,
          type: "error",
          showConfirmButton: false,
          showCancelButton: false
        });
      }

      document
        .querySelectorAll("input[type=checkbox]")
        .forEach(el => (el.checked = false));
      setList([]);
    }
  };

  const f_s = {
    fontSize: "100%"
  };

  const textDel = {
    color: "red",
    cursor: "pointer"
  };

  const style = {
    width: "3rem",
    height: "3rem"
  };

  const color = {
    backgroundColor: "#17a2b8"
  };

  return (
    <div className="container mt-4">
      <div className="mx-auto">
        <div className="mt-4"></div>
        <div className="my-2">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#userList"
            style={color}
          >
            assign task to co-worker
          </button>

          <div
            className="modal fade"
            id="userList"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Employees
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">x</span>
                  </button>
                </div>

                <div className="modal-body">
                  {state.employeees.length === 0 ? (
                    <div className="p-4 row">
                      <div className="mt-4"></div>
                      <div className="mt-4"></div>
                      <div className="mx-auto">
                        <div
                          className="spinner-border"
                          style={style}
                          role="status"
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-column">
                      {state.employeees.map((val, index) => (
                        <div ref={unCheck} className="form-check" key={val._id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={val.name}
                            name={val._id}
                            id={"employee-" + val._id}
                            onChange={handleCheckbox}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={"employee-" + val._id}
                          >
                            {val.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="mb-4">
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="title task"
                ref={title}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="list task"
                onKeyPress={onKeyPress}
                ref={lists}
              />
            </div>
          </div>
        </form>
        {list.length > 0 && (
          <div className="d-flex flex-wrap">
            {" "}
            {list.map((val, index) => (
              <div className="p-2 m-1" key={index}>
                <span
                  key={"datas" + index}
                  className="badge badge-pill badge-light"
                  style={f_s}
                >
                  {val}
                </span>
                <small
                  key={"data" + index}
                  className="ml-1"
                  style={textDel}
                  onClick={() => deleteList(val, index)}
                >
                  {" "}
                  x{" "}
                </small>
              </div>
            ))}
          </div>
        )}
        <div className="form-group col-sm-4 mt-4">
          <button onClick={addThisTask} className="btn btn-primary">
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
