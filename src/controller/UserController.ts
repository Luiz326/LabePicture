import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  public async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, nickname, password } = req.body;

      const token = await new UserBusiness().signup(
        name,
        email,
        nickname,
        password
      );

      res.status(200).send({ message: "successful registration", token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const token = await new UserBusiness().login(email, password);

      res.status(200).send({ message: "login successfully", token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
}
