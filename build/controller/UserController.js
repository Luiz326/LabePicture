"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const baseDatabase_1 = require("../data/baseDatabase");
const UserBusiness_1 = require("../business/UserBusiness");
class UserController {
    async signup(req, res) {
        try {
            const { name, email, nickname, password } = req.body;
            const token = await new UserBusiness_1.UserBusiness().signup(name, email, nickname, password);
            res.status(200).send({ message: "successful registration", token });
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
        finally {
            baseDatabase_1.BaseDatabase.destroyConnection();
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await new UserBusiness_1.UserBusiness().login(email, password);
            res.status(200).send({ message: "login successfully", token });
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
        finally {
            baseDatabase_1.BaseDatabase.destroyConnection();
        }
    }
}
exports.UserController = UserController;
