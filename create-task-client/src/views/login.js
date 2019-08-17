import React, { useState, useContext } from "react";
import { TaskContext } from "../contexts/taskContext.js";
import runAPI from "../API.js/runAPI.js";
import Swal from "sweetalert2";

const Login = props => {
  const styleHere = {
    background: "#f4f4f4",
    borderRadius: "10px"
  };
  const colorSmall = {
    color: "blue"
  };

  const { state, dispatch } = useContext(TaskContext);
  const [login, setLogin] = useState({});

  const handleLogin = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const tryinglogin = async e => {
    e.preventDefault();
    if (!login.email || !login.password) {
      Swal.fire({
        title: "Error",
        text: `fill your valid form`,
        timer: 1800,
        type: "error",
        showCancelButton: false,
        showConfirmButton: false
      });
    } else if (login.password.length <= 7) {
      dispatch({ type: "BUTTON", payload: { button: false } });
      Swal.fire({
        title: "Error",
        text: `password minimal 8 characters`,
        timer: 1800,
        type: "error",
        showCancelButton: false,
        showConfirmButton: false
      });
    } else {
      dispatch({ type: "BUTTON", payload: { button: true } });
      e.preventDefault();
      try {
        const { data } = await runAPI.post("api/user/login", login);
        console.log(data);
        localStorage.setItem("token", data.createToken);
        localStorage.setItem("name", data.data.name);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("id", data.data._id);
        dispatch({ type: "LOGINED" });
        dispatch({ type: "BUTTON", payload: { button: false } });
        dispatch({ type: "TASK_ROUTE", payload: true });
      } catch (e) {
        dispatch({ type: "BUTTON", payload: { button: false } });
        Swal.fire({
          title: "Error",
          text: e.response.data.error,
          timer: 1800,
          type: "error",
          showCancelButton: false,
          showConfirmButton: false
        });
      }
    }
  };

  return (
    <div className="container p-2 mt-4 mb-5">
      <div className="mt-4" />
      <div className="mt-4" />
      <div className="">
        <form style={styleHere} className="p-4" onSubmit={tryinglogin}>
          <div className="ml-3">
            <h2> LOGIN </h2> <br />
          </div>
          {state.register !== null && (
            <div className="ml-3">
              <small style={colorSmall}> {state.register}</small> <br />
            </div>
          )}
          <div className="form-group col-md-8">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={login.email || ""}
              onChange={handleLogin}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={login.password || ""}
              onChange={handleLogin}
              placeholder="Password"
            />
          </div>
          <div className="form-group col-sm-4">
            {!state.button ? (
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            ) : (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
