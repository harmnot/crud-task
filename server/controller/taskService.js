import { Person, Task } from "../model/index.js";

export default class TaskService {
  static async getAll(req, res, next) {
    try {
      const allTask = await Task.find({})
        .populate("taskFor")
        .populate("task");
      if (!allTask) {
        next("router");
      } else {
        res.status(200).json({ result: "succesfully get all", data: allTask });
      }
    } catch (err) {
      next(err);
    }
  }

  static async addTask(req, res, next) {
    try {
      const { title, list, taskFor } = req.body;
      const createTask = await Task.create({
        title,
        list
      });
      const pushThePeople = await Task.update(
        { _id: createTask._id },
        { $addToSet: { taskFor } }
      );
      res
        .status(200)
        .json({ result: `successfully created`, data: pushThePeople });
    } catch (err) {
      next(err);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const { title, list, taskFor } = req.body;
      const createTask = await Task.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title,
          list: list
        },
        { new: true }
      );
      const updating = await Task.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { taskFor } },
        { new: true }
      );
      res.status(200).json({ result: `successfully created`, data: updating });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const taskDeleted = await Task.findOneAndDelete(req.params.id);
      res.status(200).json({ result: "successfully deleted" });
    } catch (err) {
      console.log(err, "ini errpor");
      next(err);
    }
  }

  static async deleteListTask(req, res, next) {
    const { listId } = req.body;
    try {
      const taskDeleted = await Task.update(
        { _id: req.params.id },
        { $pull: { list: { _id: listId } } },
        { safe: true, multi: true }
      );

      res
        .status(200)
        .json({ result: "successfully deleted list", data: taskDeleted });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const getOne = await Task.findOne({ _id: req.params.id }).populate(
        "taskFor"
      );
      if (!getOne) {
        res.status(400).json({ error: `can't found any` });
      } else {
        res.status(200).json({ result: `got the detail`, data: getOne });
      }
    } catch (err) {
      next(err);
    }
  }
}
