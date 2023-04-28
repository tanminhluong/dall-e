import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "120m",
  });
};

export default generateToken;
