import { Router } from "express";
import { ImageController } from "../controller/ImageController";

export const imageRouter = Router();

imageRouter.post("/", new ImageController().createImage);
