import chai from "chai";
import chaiHttp from "chai-http";
import chaiMatch from "chai-match";
const expect = chai.expect;
import app from "../app.js";
import { jwtSign, verifyJwt } from "../helper/jwt.js";
import {
  clearDBPerson,
  clearDBTask
} from "../helper/clearDBPersonAfterTest.js";
import { Person, Task } from "../model/index.js";

chai.use(chaiHttp);

let idOne = [];
let idTwo = "";
let token = "";

describe("TASK SERVICE", () => {
  before(done => {
    Person.create({
      email: "muhammad1@email.com",
      password: "12345678",
      name: "Muhammad one"
    })
      .then(createdUser => {
        idOne.push(createdUser._id);
        token = jwtSign({ _id: createdUser._id });
      })
      .catch(err => {
        console.log(err);
      });
    clearDBTask(done);
  });
  after(done => {
    clearDBTask(done);
  });

  describe("THE TASK", () => {
    const theTask = {
      title: "first task",
      list: {
        listName: "working"
      },
      taskFor: idOne
    };
    it("SUCESSFULLY ADD TASK", async () => {
      const task = await chai
        .request(app)
        .post("/api/task/addtask")
        .send(theTask)
        .set("token", token);

      expect(task.statusType).to.equal(2);
      expect(task.body.result).to.equal("successfully created");
    });

    it("SUCESSFULLY GET TASK AND POPULATE", async () => {
      const taskgetALl = await chai.request(app).get("/api/task/tasks");

      expect(taskgetALl.statusType).to.equal(2);
      expect(taskgetALl.body.result).to.equal("succesfully get all");
    });

    it("SUCESSFULLY DELETE THE TASK", async () => {
      const createTask = await Task.create({
        title: "first task",
        list: {
          listName: "working"
        },
        taskFor: idOne
      });

      const deleteTask = await chai
        .request(app)
        .delete(`/api/task/${createTask._id}`)
        .set("token", token);

      expect(deleteTask.statusType).to.equal(2);
      expect(deleteTask.body.result).to.equal("successfully deleted");
    });

    it("SUCESSFULLY DELETE THE LIST ON THE TASK", async () => {
      const createTask2 = await Task.create({
        title: "first task",
        list: {
          listName: "working"
        },
        taskFor: idOne
      });

      const deleteTaskList = await chai
        .request(app)
        .delete(`/api/task/list/${createTask2._id}`)
        .send({ listId: createTask2.list[0]._id.toString() })
        .set("token", token);

      expect(deleteTaskList.statusType).to.equal(2);
      expect(deleteTaskList.body.result).to.equal("successfully deleted list");
    });
  });
});
