import jwt from "jsonwebtoken";
import { User } from "../interfaces";
import { JWT_SECRET_KEY } from "../utils";

const generateToken = (user: User) => {
  return jwt.sign({ ...user }, JWT_SECRET_KEY, {
    expiresIn: 1 * 60,
  });
};

export default generateToken;
