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
}
