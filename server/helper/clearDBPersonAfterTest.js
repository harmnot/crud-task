import { Person, Task } from "../model/index.js";

const clearDBPerson = done => {
  if (process.env.NODE_ENV === "test") {
    Person.deleteMany({})
      .then(() => {
        done();
      })
      .catch(err => console.log(err));
  }
};

const clearDBTask = done => {
  if (process.env.NODE_ENV === "test") {
    Task.deleteMany({})
      .then(() => {
        done();
      })
      .catch(err => console.log(err));
  }
};

export { clearDBPerson, clearDBTask };
