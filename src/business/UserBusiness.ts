import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseBusiness } from "./BaseBusiness";

export class UserBusiness extends BaseBusiness {
  public async signup(
    name: string,
    email: string,
    nickname: string,
    password: string
  ): Promise<string> {
    this.validateInput({ name, email, nickname, password });

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, name, email, nickname, hashPassword);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });

    return token;
  }
  public async login(email: string, password: string): Promise<string> {
    this.validateInput({ email, password });

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(email);

    const hashManager = new HashManager();
    const comparePassword = await hashManager.compare(password, user.password);
    if (!comparePassword) {
      throw new Error("Invalid password!");
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id });

    return token;
  }

  //   public async getUserByEmail(input: LoginInputDTO) {
  //     const userDatabase = new UserDatabase();
  //     const user: User = await userDatabase.getUserByEmail(input.email);

  //     const hashManager = new HashManager();
  //     const hashCompare = await hashManager.compare(
  //       input.password,
  //       user.getPassword()
  //     );

  //     if (!hashCompare) {
  //       throw new Error("Invalid password!");
  //     }

  //     return user;
  //   }
}
