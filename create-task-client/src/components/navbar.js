import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../contexts/taskContext.js";

const Navbar = () => {
  const { state, dispatch } = useContext(TaskContext);
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    dispatch({ type: "LOGOUT" });
  };

  const color = {
    border: " 1px solid black",
    color: "blue"
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          {" "}
          YourTask{" "}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                {" "}
                Home{" "}
              </Link>
            </li>
            {!state.isLogin ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  {" "}
                  Login{" "}
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/task">
                  {" "}
                  Tasks{" "}
                </Link>
              </li>
            )}
            {!state.isLogin ? (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  {" "}
                  REGISTER{" "}
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item" onClick={logout}>
                  <Link className="nav-link" to="/">
                    {" "}
                    Logout{" "}
                  </Link>
                </li>
                <li className="nav-item ml-4">
                  <span className="nav-link" style={color}>
                    {localStorage.getItem("role")}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
