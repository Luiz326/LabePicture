import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { LoginInputDTO, User, FriendshipInputDTO } from "../model/User";
import { HashManager } from "../services/HashManager";

export class UserBusiness {
  public async signup(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const userDatabase = new UserDatabase();

    await userDatabase.signup(id, name, email, password);

    return id;
  }

  public async getUserByEmail(input: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const user: User = await userDatabase.getUserByEmail(input.email);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      input.password,
      user.getPassword()
    );

    if (!hashCompare) {
      throw new Error("Invalid password!");
    }

    return user;
  }

  public async befriend(input: FriendshipInputDTO) {
    const userDatabase = new UserDatabase();
    const isFriend = await userDatabase.checkFriendship(
      input.userId,
      input.targetId
    );
    if (!isFriend) {
      await userDatabase.befriend(input.userId, input.targetId);
    } else {
      throw new Error("Friendship already exists");
    }
  }

  public async unfriend(input: FriendshipInputDTO) {
    const userDatabase = new UserDatabase();
    const isFriend = await userDatabase.checkFriendship(
      input.userId,
      input.targetId
    );
    if (isFriend) {
      await userDatabase.unfriend(input.userId, input.targetId);
    } else {
      throw new Error("Friendship doesn't exist");
    }
  }
}
