"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const IdGenerator_1 = require("../services/IdGenerator");
const UserDatabase_1 = require("../data/UserDatabase");
const HashManager_1 = require("../services/HashManager");
const Authenticator_1 = require("../services/Authenticator");
const BaseBusiness_1 = require("./BaseBusiness");
class UserBusiness extends BaseBusiness_1.BaseBusiness {
    async signup(name, email, nickname, password) {
        this.validateInput({ name, email, nickname, password });
        const idGenerator = new IdGenerator_1.IdGenerator();
        const id = idGenerator.generateId();
        const hashManager = new HashManager_1.HashManager();
        const hashPassword = await hashManager.hash(password);
        const userDatabase = new UserDatabase_1.UserDatabase();
        await userDatabase.createUser(id, name, email, nickname, hashPassword);
        const authenticator = new Authenticator_1.Authenticator();
        const token = authenticator.generateToken({ id });
        return token;
    }
    async login(email, password) {
        this.validateInput({ email, password });
        const userDatabase = new UserDatabase_1.UserDatabase();
        const user = await userDatabase.getUserByEmail(email);
        const hashManager = new HashManager_1.HashManager();
        const comparePassword = await hashManager.compare(password, user.password);
        if (!comparePassword) {
            throw new Error("Invalid password!");
        }
        const authenticator = new Authenticator_1.Authenticator();
        const token = authenticator.generateToken({ id: user.id });
        return token;
    }
}
exports.UserBusiness = UserBusiness;
