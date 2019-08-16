import express from "express";
const route = express.Router();
import { TaskService } from "../controller/index.js";
import {
  auth,
  checkRole,
  isAllowToCRUD
} from "../middleware/authentication.js";

route.get("/tasks", TaskService.getAll);
route.get("/:id", TaskService.findOne);
route.post("/addtask", auth, TaskService.addTask);
route.put("/:id", auth, checkRole, isAllowToCRUD, TaskService.updateTask);
route.delete("/:id", auth, checkRole, isAllowToCRUD, TaskService.deleteTask);
route.delete(
  "/list/:id",
  auth,
  checkRole,
  isAllowToCRUD,
  TaskService.deleteListTask
);

route.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

export default route;
