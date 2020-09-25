"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.Router();
exports.userRouter.post("/signup", new UserController_1.UserController().signup);
exports.userRouter.post("/login", new UserController_1.UserController().login);
