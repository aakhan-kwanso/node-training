import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import userRouter from "./user/user.router";
import postRouter from "./post/post.router";
import commentRouter from "./comment/comment.router";

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
