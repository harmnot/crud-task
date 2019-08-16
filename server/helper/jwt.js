import jwt from "jsonwebtoken";

const jwtSign = obj => jwt.sign(obj, process.env.PRIVATE_KEY_JWT, { expiresIn: 36000 });

const verifyJwt = token => jwt.verify(token, process.env.PRIVATE_KEY_JWT);

export { jwtSign, verifyJwt };
