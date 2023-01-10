"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const CustomError_1 = require("../models/CustomError");
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { title, text, author, source, tags } = req.body;
                yield this.postBusiness.createPost(token, title, text, author, source, tags);
                res.status(201).send('Post created');
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.editPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId, title, text, author, source, tags } = req.body;
                yield this.postBusiness.editPost(token, postId, title, text, author, source, tags);
                res.status(200).send('Post edited');
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.getAllPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.postBusiness.getAllPosts();
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.getPostByAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { author } = req.params;
                const result = yield this.postBusiness.getPostByAuthor(author);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.getPostByTag = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { tags } = req.params;
                const result = yield this.postBusiness.getPostByTag(tags);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.searchPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.params;
                const result = yield this.postBusiness.searchPost(title);
                console.log(result);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { id } = req.params;
                yield this.postBusiness.deletePost(token, id);
                res.status(200).send('Post deleted');
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map