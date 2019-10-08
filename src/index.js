//@ts-check
import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import userRouter from "./api/v1/user/user.router";
import postRouter from "./api/v1/post/post.router";
import commentRouter from "./api/v1/comment/comment.router";

const port = process.env.PORT || 4000;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

//Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
