"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDatabase = void 0;
const baseDatabase_1 = require("./baseDatabase");
class ImageDatabase extends baseDatabase_1.BaseDatabase {
    async createImage(id, subtitle, author, date, tags, collection) {
        const stringfiedTags = JSON.stringify(tags);
        await this.getConnection()
            .insert({
            id,
            subtitle,
            author,
            date,
            tags: stringfiedTags,
            collection,
        })
            .into(ImageDatabase.TABLE_NAME);
    }
    async getImage(id) {
        const result = await this.getConnection()
            .select("*")
            .from(ImageDatabase.TABLE_NAME)
            .where({ id })
            .first();
        return result;
    }
    async getAllImages() {
        const result = await this.getConnection()
            .select("*")
            .from(ImageDatabase.TABLE_NAME);
        return result;
    }
}
exports.ImageDatabase = ImageDatabase;
ImageDatabase.TABLE_NAME = "image_labepicture";
