import React, { useState, useContext } from "react";
import { TaskContext } from "../contexts/taskContext.js";
import { withRouter } from "react-router";
import runAPI from "../API.js/runAPI.js";
import Swal from "sweetalert2";

const Register = props => {
  const styleHere = {
    background: "#f4f4f4",
    borderRadius: "10px"
  };

  const { state, dispatch } = useContext(TaskContext);
  const [register, setRegister] = useState({
    email: null,
    password: null,
    name: null
  });

  const handleLogin = e => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const tryingRegister = async e => {
    e.preventDefault();
    const rgx = /^[a-zA-Z ]*$/;
    if (!register.password || !register.email || !register.name) {
      Swal.fire({
        title: "Error",
        text: `please fill valid form`,
        timer: 1800,
        type: "error",
        showCancelButton: false,
        showConfirmButton: false
      });
    } else if (rgx.test(register.name) === false) {
      Swal.fire({
        title: "Error",
        text: `please fill valid name`,
        timer: 1800,
        type: "error",
        showCancelButton: false,
        showConfirmButton: false
      });
    } else if (register.password <= 7) {
      Swal.fire({
        title: "Error",
        text: `please fill more than 7 characters password`,
        timer: 1800,
        type: "error",
        showCancelButton: false,
        showConfirmButton: false
      });
    } else {
      dispatch({ type: "BUTTON", payload: { button: true } });
      try {
        const { data } = await runAPI.post("api/user/register", register);
        dispatch({ type: "BUTTON", payload: { button: false } });
        dispatch({
          type: "REGISTERED",
          payload: "successfully register, please login"
        });
        props.history.push("/login");
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
        <form style={styleHere} className="p-4" onSubmit={tryingRegister}>
          <div className="ml-3">
            <h2> Register </h2> <br />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={register.email || ""}
              onChange={handleLogin}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={register.name || ""}
              onChange={handleLogin}
              aria-describedby="nameHelp"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={register.password || ""}
              onChange={handleLogin}
              placeholder="Password"
            />
          </div>

          <div className="form-group col-sm-4">
            {!state.button ? (
              <button type="submit" className="btn btn-primary">
                Register
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

export default withRouter(Register);
