import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4400;
const NODE_ENV = process.env.NODE_ENV || "development";

const dbName = NODE_ENV === "test" ? "test" : process.env.DB_NAME;
import { UserRoute, TaskRoute } from "./routes/index.js";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_KEY}@virtualcluster-oylot.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log(`---------MONGODB-RUN--------`))
  .catch(err => console.log(`MONGODB ERROR, ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(morgan("combined"));

app.use("/api/user", UserRoute);
app.use("/api/task", TaskRoute);

app.listen(PORT, () => console.log(`you are connected on port ${PORT}`));

export default app;
