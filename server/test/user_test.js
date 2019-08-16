import chai from "chai";
import chaiHttp from "chai-http";
import chaiMatch from "chai-match";
const expect = chai.expect;
import app from "../app.js";
import { clearDBPerson } from "../helper/clearDBPersonAfterTest.js";
import { Person } from "../model/index.js";

chai.use(chaiHttp);

describe("PERSON SERVICE", () => {
  before(done => {
    Person.create({
      email: "muhammad@email.com",
      password: "12345678",
      name: "Muhammad"
    })
      .then(createdUser => {
        console.log("BEFORE HOOK");
      })
      .catch(err => {
        console.log(err);
      });
    clearDBPerson(done);
  });

  after(done => {
    clearDBPerson(done);
  });

  describe("REGISTER PERSON", () => {
    const newUser = {
      email: "second@email.com",
      password: "12345678",
      name: "Virtual Name",
      role: "manager"
    };

    it("SUCESS REGISTER", async () => {
      const isExist = await chai
        .request(app)
        .post("/api/user/register")
        .send(newUser);

      expect(isExist.statusType).to.equal(2);
      expect(isExist.body.data).to.have.property("email");
      expect(isExist.body.data).to.have.property("password");
      expect(isExist.body.data).to.have.property("name");
      expect(isExist.body.data).to.have.property("role");
      expect(isExist.body.data.email).not.to.be.null;
      expect(isExist.body.data.password).not.to.be.null;
      expect(isExist.body.data.role).not.to.be.null;
      expect(isExist.body.data.name).not.to.be.null;
      expect(isExist.body.data.email).to.match(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
    });

    const checkEmail = {
      email: "third@email",
      password: "12345678",
      name: "Virtual third"
    };

    it("FAILED REGISTER because [ email ]", async () => {
      const user = await chai
        .request(app)
        .post("/api/user/register")
        .send(checkEmail);

      expect(user.statusType).to.equal(5);
      expect(user.body).to.have.property("error");
      expect(user.body.error).to.equal(
        "Person validation failed: email: please use valid email"
      );
    });

    const checkPasword = {
      email: "fourth@email.com",
      password: "12345",
      name: "Virtual fourth"
    };

    it("FAILED REGISTER because [ password ]", async () => {
      const user = await chai
        .request(app)
        .post("/api/user/register")
        .send(checkPasword);

      expect(user.statusType).to.equal(5);
      expect(user.body).to.have.property("error");
      expect(user.body.error).to.equal(
        "Person validation failed: password: please fill password more than 6 characters"
      );
    });

    const checkRole = {
      email: "fith@email.com",
      password: "12345678",
      name: "Virtual fith",
      role: "admin"
    };

    it("FAILED REGISTER because [ role ]", async () => {
      const user = await chai
        .request(app)
        .post("/api/user/register")
        .send(checkRole);

      expect(user.statusType).to.equal(5);
      expect(user.body).to.have.property("error");
      expect(user.body.error).to.equal(
        "Person validation failed: role: `admin` is not a valid enum value for path `role`."
      );
    });

    const checkName = {
      email: "sixth@email.com",
      password: "12345678",
      name: "Virtual 1th"
    };

    it("FAILED REGISTER because [ name ]", async () => {
      const user = await chai
        .request(app)
        .post("/api/user/register")
        .send(checkName);

      expect(user.statusType).to.equal(5);
      expect(user.body).to.have.property("error");
      expect(user.body.error).to.equal(
        "Person validation failed: name: please fill your name more than 3 characters and not include any symbols"
      );
    });
  });

  describe("PERSON LOGIN", () => {
    const loginUser = {
      email: "muhammad@email.com",
      password: "12345678"
    };

    it("SUCESSFULLY LOGIN", async () => {
      const user = await chai
        .request(app)
        .post("/api/user/login")
        .send(loginUser);

      expect(user.statusType).to.equal(2);
      expect(user.body.result).to.equal("succesfully login");
    });

    it("FAILED LOGIN because [incorrect password ]", async () => {
      const loginFailed = {
        email: "muhammad@email.com",
        password: "12345671"
      };

      const user = await chai
        .request(app)
        .post("/api/user/login")
        .send(loginFailed);

      expect(user.statusType).to.equal(4);
      expect(user.body.error).to.equal("incorrect password");
    });

    it("FAILED LOGIN because [ email not exist ]", async () => {
      const loginFailed2 = {
        email: "mhd@email.com",
        password: "12345671"
      };

      const user = await chai
        .request(app)
        .post("/api/user/login")
        .send(loginFailed2);

      expect(user.statusType).to.equal(4);
      expect(user.body.error).to.equal(`${loginFailed2.email} doesn't exist`);
    });
  });
});
