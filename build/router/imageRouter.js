"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = require("express");
const ImageController_1 = require("../controller/ImageController");
exports.imageRouter = express_1.Router();
exports.imageRouter.post("/", new ImageController_1.ImageController().createImage);
exports.imageRouter.get("/", new ImageController_1.ImageController().getAllImages);
exports.imageRouter.get("/:id", new ImageController_1.ImageController().getImage);
