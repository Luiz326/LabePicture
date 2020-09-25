import { Request, Response } from "express";
import { BaseDatabase } from "../data/baseDatabase";
import { ImageBusiness } from "../business/ImageBusiness";

import { hash } from "bcryptjs";

export class ImageController {
  public async createImage(req: Request, res: Response): Promise<void> {
    try {
      // const {id} = req.header
      const { subtitle, file, tags, collection } = req.body;

      await new ImageBusiness().createImage(
        req.headers.authorization as string,
        subtitle,
        file,
        tags,
        collection
      );

      res.status(200).send({ message: "successfully created image" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
  public async getImage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const token = req.headers.authorization as string;
      const result = await new ImageBusiness().getImage(token, id);

      res.status(200).send({ result });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
  public async getAllImages(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;
      const result = await new ImageBusiness().getAllImages(token);

      res.status(200).send({ result });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
}
