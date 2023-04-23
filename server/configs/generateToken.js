import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
