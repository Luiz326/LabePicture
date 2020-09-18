import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { InputValidator } from "../services/InputValidator";
import { user } from "../model/user";
export abstract class BaseBusiness {
  public validateInput(input: any): void {
    const { errors, isValid } = new InputValidator().validate(input);
    if (!isValid) {
      throw new Error(`Invalid body:${errors.map((err) => err.key)}`);
    }
  }
  public async validateToken(token: any): Promise<user> {
    console.log(token);
    if (!token || typeof token !== "string") {
      throw new Error("Invalid token1");
    }
    const authenticator = new Authenticator();

    const { id } = authenticator.verify(token);
    if (!id) {
      throw new Error("Invalid token2");
    }
    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserById(id);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
