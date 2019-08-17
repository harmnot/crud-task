import { Person } from "../model/index.js";
import { comparePassword } from "../helper/handlePassword.js";
import { jwtSign } from "../helper/jwt.js";

export default class UserService {
  static async register(req, res, next) {
    const { email } = req.body;
    try {
      const isExist = await Person.findOne({ email });
      console.log(isExist);
      if (isExist) {
        res.status(403).json({ error: "email already exist" });
      } else {
        const createUser = await Person.create({ ...req.body });
        res.status(200).json({ result: `user created`, data: createUser });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const isFound = await Person.findOne({ email });
      if (!isFound) {
        res.status(404).json({ error: `${email} doesn't exist` });
      } else {
        const isMatch = await comparePassword(password, isFound.password);
        console.log;
        if (!isMatch) {
          res.status(400).json({ error: "incorrect password" });
        } else {
          const createToken = jwtSign({
            _id: isFound._id,
            email,
            name: isFound.name
          });
          res
            .status(200)
            .json({ result: `succesfully login`, data: isFound, createToken });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const getData = await Person.findOne({ _id: req.params.id });
      if (!getData) {
        res.status(400).json({ error: `can't found any` });
      } else {
        res.status(200).json({ result: `gothca`, data: getData });
      }
    } catch (e) {
      next(e);
    }
  }

  static async findAll(req, res, next) {
    try {
      const getAll = await Person.find({});
      res.status(200).json({ result: `gothca`, data: getAll });
    } catch (e) {
      console.log("errror disii");
      next(e);
    }
  }
}
