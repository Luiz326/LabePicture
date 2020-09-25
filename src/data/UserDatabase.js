"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    async createUser(id, name, email, nickname, password) {
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
    async getUserByEmail(email) {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email })
            .first();
        return result;
    }
    async getUserById(id) {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ id })
            .first();
        return result;
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = "user_labepicture";
