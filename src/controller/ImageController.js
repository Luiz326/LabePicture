"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const baseDatabase_1 = require("../data/baseDatabase");
const ImageBusiness_1 = require("../business/ImageBusiness");
class ImageController {
    async createImage(req, res) {
        try {
            // const {id} = req.header
            const { subtitle, file, tags, collection } = req.body;
            await new ImageBusiness_1.ImageBusiness().createImage(req.headers.authorization, subtitle, file, tags, collection);
            res.status(200).send({ message: "successfully created image" });
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
        finally {
            baseDatabase_1.BaseDatabase.destroyConnection();
        }
    }
    async getImage(req, res) {
        try {
            const { id } = req.params;
            const token = req.headers.authorization;
            const result = await new ImageBusiness_1.ImageBusiness().getImage(token, id);
            res.status(200).send({ result });
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
        finally {
            baseDatabase_1.BaseDatabase.destroyConnection();
        }
    }
    async getAllImages(req, res) {
        try {
            const token = req.headers.authorization;
            const result = await new ImageBusiness_1.ImageBusiness().getAllImages(token);
            res.status(200).send({ result });
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
        finally {
            baseDatabase_1.BaseDatabase.destroyConnection();
        }
    }
}
exports.ImageController = ImageController;
