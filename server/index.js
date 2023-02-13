import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/posts", postRoutes);
app.use("/api/dalles", dalleRoutes);
app.get("/", async (req, res) => {
  res.send("hello");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(8080, () => {
      console.log("Server has started on port http://localhost:8080");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
