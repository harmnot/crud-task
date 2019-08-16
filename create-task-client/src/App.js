import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home.js";
import Login from "./views/login.js";
import Register from "./views/register.js";
import Footer from "./components/footer.js";
import Task from "./views/task.js";
import PrivateRoute from "./reusable/privateRoute.js";
import PrivateTask from "./reusable/privateTask.js";

import { TaskContextProvider } from "./contexts/taskContext.js";

function App() {
  return (
    <TaskContextProvider>
      <Router>
        <div className="App">
          <Navbar> </Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/register" component={Register} />
            <PrivateTask exact path="/task" component={Task} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </TaskContextProvider>
  );
}

export default App;
