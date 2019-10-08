//@ts-check
import { Router } from "express";
import postController from "./post.controller";

const router = Router();

router.get("/", postController.get);
router.delete("/", postController.delete);
router.get("/with-comments", postController.getPostsWithComments);
router.get("/:id/comments", postController.getCommentsForPost);

export default router;
