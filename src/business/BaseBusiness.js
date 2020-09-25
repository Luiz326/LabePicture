"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBusiness = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
const InputValidator_1 = require("../services/InputValidator");
class BaseBusiness {
    validateInput(input) {
        const { errors, isValid } = new InputValidator_1.InputValidator().validate(input);
        if (!isValid) {
            throw new Error(`Invalid body:${errors.map((err) => err.key)}`);
        }
    }
    async validateToken(token) {
        if (!token || typeof token !== "string") {
            throw new Error("Invalid token1");
        }
        const authenticator = new Authenticator_1.Authenticator();
        const { id } = authenticator.verify(token);
        if (!id) {
            throw new Error("Invalid token2");
        }
        const userDatabase = new UserDatabase_1.UserDatabase();
        const user = await userDatabase.getUserById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
exports.BaseBusiness = BaseBusiness;
