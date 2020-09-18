import { Router } from "express";
import { UserController } from "../controller/UserController";

export const userRouter = Router();

userRouter.post("/signup", new UserController().signup);
userRouter.post("/login", new UserController().login);
