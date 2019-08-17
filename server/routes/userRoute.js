import express from "express";
const route = express.Router();
import UserService from "../controller/userService.js";

route.get("/employees", UserService.findAll);
route.get("/:id", UserService.findOne);
route.post("/register", UserService.register);
route.post("/login", UserService.login);

route.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

export default route;
