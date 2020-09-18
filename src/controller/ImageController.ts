import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageBusiness } from "../business/ImageBusiness";

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
}
