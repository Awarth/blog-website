import express from "express";
import cors from "cors";
import { Router } from "express";

const router = Router();

const app = express();

app.use(cors({ origin: "*" }));

app.use(
  express.json({
    limit: "30kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "30kb" }));
app.use(express.static("public"));

import blogRouter from "./routes/blog.routes.js";

app.route("/").get((req, res) => {
  return res.json("hello");
});
app.use("/api/v1/blog", blogRouter);

export default app;
