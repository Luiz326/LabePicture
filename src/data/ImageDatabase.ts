import { json } from "express";
import { BaseDatabase } from "./baseDatabase";

export class ImageDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "image_labepicture";

  public async createImage(
    id: string,
    subtitle: string,
    author: string,
    date: Date,
    tags: string[],
    collection: string
  ): Promise<void> {
    const stringfiedTags = JSON.stringify(tags);
    await this.getConnection()
      .insert({
        id,
        subtitle,
        author,
        date,
        tags: stringfiedTags,
        collection,
      })
      .into(ImageDatabase.TABLE_NAME);
  }

  public async getImage(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(ImageDatabase.TABLE_NAME)
      .where({ id })
      .first();
    return result;
  }
  public async getAllImages(): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(ImageDatabase.TABLE_NAME);
    return result;
  }
}
