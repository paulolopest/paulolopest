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
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { image, content } = req.body;
                const response = yield this.postBusiness.create(token, image, content);
                res.send("Post created");
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.getMyPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield this.postBusiness.getMyPosts(token);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.getFeed = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield this.postBusiness.getFeed(token);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.editPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId } = req.params;
                const { content } = req.body;
                const response = yield this.postBusiness.editPost(token, postId, content);
                res.send("Post edited");
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId } = req.params;
                const response = yield this.postBusiness.deletePost(token, postId);
                res.send("Post deleted");
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.likePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId } = req.params;
                yield this.postBusiness.likePost(token, postId);
                res.send("Post liked");
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.dislikePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId } = req.params;
                yield this.postBusiness.dislikePost(token, postId);
                res.send("Post disliked");
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.getPostLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId } = req.params;
                const response = yield this.postBusiness.getPostLikes(token, postId);
                res.send(response);
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map