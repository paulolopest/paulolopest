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
exports.PostBusiness = void 0;
const CustomError_1 = require("../models/CustomError");
class PostBusiness {
    constructor(postData, userData, idGenerator, tokenManager) {
        this.postData = postData;
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.createPost = (token, title, text, author, source, tags) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!title) {
                    throw new CustomError_1.CustomError(400, 'Enter a title');
                }
                if (!text) {
                    throw new CustomError_1.CustomError(400, 'Enter a text');
                }
                if (!author) {
                    throw new CustomError_1.CustomError(400, 'Enter a author');
                }
                if (!source) {
                    throw new CustomError_1.CustomError(400, 'Enter a source');
                }
                if (!tags) {
                    throw new CustomError_1.CustomError(400, 'Enter a tags');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUserById(tokenData.id);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'Fatal error, user not found');
                }
                const verifyPermission = user.admin;
                if (!verifyPermission) {
                    throw new CustomError_1.CustomError(401, 'Only admins can post');
                }
                const id = this.idGenerator.generate();
                yield this.postData.createPost(id, title, text, author, source, tags);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new CustomError_1.CustomError(404, error.message);
                }
            }
        });
        this.editPost = (token, postId, title, text, author, source, tags) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(401, 'Enter a post id');
                }
                const post = yield this.postData.getPostById(postId);
                if (!post) {
                    throw new CustomError_1.CustomError(409, 'Post not found');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUserById(tokenData.id);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'Fatal error, user not found');
                }
                if ((user.admin = false)) {
                    throw new CustomError_1.CustomError(401, 'Just admin can edit posts');
                }
                yield this.postData.editPost(postId, title, text, author, source, tags);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new CustomError_1.CustomError(404, error.message);
                }
            }
        });
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.postData.getAllPosts();
                return result;
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new CustomError_1.CustomError(404, error.message);
                }
            }
        });
        this.getPostByAuthor = (author) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!author) {
                    throw new CustomError_1.CustomError(400, 'Enter an author');
                }
                const result = yield this.postData.getPostByAuthor(author);
                return result;
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new CustomError_1.CustomError(404, error.message);
                }
            }
        });
        this.getPostByTag = (tags) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!tags) {
                    throw new CustomError_1.CustomError(400, 'Enter a tag');
                }
                const result = this.postData.getPostByTag(tags);
                return result;
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new CustomError_1.CustomError(404, error.message);
                }
            }
        });
        this.searchPost = (title) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!title) {
                    throw new CustomError_1.CustomError(400, 'Enter a title');
                }
                const result = yield this.postData.searchPost(title);
                return result;
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new CustomError_1.CustomError(404, error.message);
                }
            }
        });
        this.deletePost = (token, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!id) {
                    throw new CustomError_1.CustomError(400, 'Enter a post id');
                }
                const post = yield this.postData.getPostById(id);
                if (!post) {
                    throw new CustomError_1.CustomError(406, 'Post not found');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUserById(tokenData.id);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'Fatal error, user not found');
                }
                if (!user.admin) {
                    throw new CustomError_1.CustomError(401, 'Just admin can delete posts');
                }
                yield this.postData.deletePost(id);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new CustomError_1.CustomError(404, error.message);
                }
            }
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map