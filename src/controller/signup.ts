import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/userDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/baseDatabase";

export const signup = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
      throw new Error("Insert all required information");
    }

    if (email.indexOf("@") === -1) {
      throw new Error("Invalid email");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, name, email, hashPassword);

    const token = Authenticator.generateToken({ id });
    const tokenData = Authenticator.getTokenData(token);

    res.status(200).send({
      message: "Parabéns! Usuário cadastrado!",
      tokenData,
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
