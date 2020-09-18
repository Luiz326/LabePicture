import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "user_labepicture";

  public async createUser(
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        nickname,
        password,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async createImage(
    id: string,
    subtitle: string,
    author: string,
    date: Date,
    tags: string[],
    collection: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        subtitle,
        author,
        date,
        tags,
        collection,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });
    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }
  public async getImage(image: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ image });
    return result[0];
  }
}
