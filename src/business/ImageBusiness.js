"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageBusiness = void 0;
const ImageDatabase_1 = require("../data/ImageDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const BaseBusiness_1 = require("./BaseBusiness");
class ImageBusiness extends BaseBusiness_1.BaseBusiness {
    async createImage(token, subtitle, file, tags, collection) {
        const user = await this.validateToken(token);
        this.validateInput({ subtitle, file, tags, collection });
        const idGenerator = new IdGenerator_1.IdGenerator();
        const id = idGenerator.generateId();
        const date = new Date();
        const imageDatabase = new ImageDatabase_1.ImageDatabase();
        await imageDatabase.createImage(id, subtitle, user.id, date, tags, collection);
    }
    async getImage(token, imageId) {
        const user = await this.validateToken(token);
        this.validateInput({ imageId });
        if (!imageId) {
            throw new Error("Invalide param: ID!!!!");
        }
        const imageDatabase = new ImageDatabase_1.ImageDatabase();
        // const result = await imageDatabase.getImage(imageId);
        // return result;
        return imageDatabase.getImage(imageId);
    }
    async getAllImages(token) {
        const user = await this.validateToken(token);
        const imageDatabase = new ImageDatabase_1.ImageDatabase();
        // const result = await imageDatabase.getImage(imageId);
        // return result;
        return imageDatabase.getAllImages();
    }
}
exports.ImageBusiness = ImageBusiness;
