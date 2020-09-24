import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { BaseBusiness } from "./BaseBusiness";

export class ImageBusiness extends BaseBusiness {
  public async createImage(
    token: string | undefined,
    subtitle: string,
    file: string,
    tags: string[],
    collection: string
  ): Promise<void> {
    const user = await this.validateToken(token);
    this.validateInput({ subtitle, file, tags, collection });
    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();
    const date = new Date();

    const imageDatabase = new ImageDatabase();
    await imageDatabase.createImage(
      id,
      subtitle,
      user.id,
      date,
      tags,
      collection
    );
  }
  public async getImage(
    token: string | undefined,
    imageId: string | undefined
  ): Promise<void> {
    const user = await this.validateToken(token);

    this.validateInput({ imageId });
    if (!imageId) {
      throw new Error("Invalide param: ID!!!!");
    }
    const imageDatabase = new ImageDatabase();
    // const result = await imageDatabase.getImage(imageId);
    // return result;
    return imageDatabase.getImage(imageId);
  }
  public async getAllImages(token: string | undefined): Promise<void> {
    const user = await this.validateToken(token);

    const imageDatabase = new ImageDatabase();
    // const result = await imageDatabase.getImage(imageId);
    // return result;
    return imageDatabase.getAllImages();
  }
}
