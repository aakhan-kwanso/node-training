//@ts-check
import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.get("/", userController.get);

export default router;
