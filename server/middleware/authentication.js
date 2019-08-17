import { Person, Task } from "../model/index.js";
import { verifyJwt } from "../helper/jwt.js";

const auth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(200).json({ error: "no token" });
  } else {
    try {
      const decoded = verifyJwt(token);
      const isAuth = await Person.findOne({ _id: decoded._id });
      if (!isAuth) {
        res.status(400).json({ erro: `invalid credentials` });
      } else {
        req.user = decoded;
        next();
      }
    } catch (e) {
      next(e);
    }
  }
};

const checkRole = async (req, res, next) => {
  try {
    const isEmployee = await Person.findOne({ _id: req.user._id });
    if (isEmployee.role === "manager") {
      res.status(400).json({ error: "NOT AUTHORIZATION" });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

const isAllowToCRUD = async (req, res, next) => {
  try {
    const isAllow = await Task.findOne({ _id: req.params.id });
    if (
      !isAllow.taskFor.includes(req.user._id) &&
      isAllow.taskFor.length !== 0
    ) {
      res.status(400).json({
        error: "NOT AUTHORIZATION because you are not in the list task for"
      });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

export { auth, checkRole, isAllowToCRUD };
