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
const Post_1 = require("../models/Post");
const Date_1 = require("../services/Date");
class PostBusiness {
    constructor(postData, idGenerator, tokenManager) {
        this.postData = postData;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.create = (token, image, content) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!content && !image) {
                    throw new CustomError_1.CustomError(400, "The post must contain some content");
                }
                const user = this.tokenManager.getTokenData(token);
                const id = this.idGenerator.generate();
                let likes = 0;
                yield this.postData.create(new Post_1.Post(id, user.id, Date_1.currentTime, image, content));
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getMyPosts = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                const user = this.tokenManager.getTokenData(token);
                const response = yield this.postData.getMyPosts(user.id);
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getFeed = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                const user = this.tokenManager.getTokenData(token);
                if (!user) {
                    throw new CustomError_1.CustomError(404, "User fatal error");
                }
                const response = yield this.postData.getFeed(user.id);
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.editPost = (token, postId, content) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                if (!content) {
                    throw new CustomError_1.CustomError(400, "Enter a content");
                }
                const user = this.tokenManager.getTokenData(token);
                const post = yield this.postData.getPostById(postId);
                if (user.id != post.user_id) {
                    throw new CustomError_1.CustomError(406, "The post is not yours");
                }
                if (!post) {
                    throw new CustomError_1.CustomError(406, "Post not exist");
                }
                yield this.postData.editPost(postId, content);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.deletePost = (token, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                const post = yield this.postData.getPostById(postId);
                const user = this.tokenManager.getTokenData(token);
                if (!post) {
                    throw new CustomError_1.CustomError(400, "Post not exist");
                }
                if (post.user_id != user.id) {
                    throw new CustomError_1.CustomError(406, "The post is not yours");
                }
                yield this.postData.deletePost(postId, user.id);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.likePost = (token, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                const post = yield this.postData.getPostById(postId);
                if (!post) {
                    throw new CustomError_1.CustomError(400, "Post not exist");
                }
                const user = this.tokenManager.getTokenData(token);
                const verify = yield this.postData.searchLike(user.id, postId);
                if (verify) {
                    throw new CustomError_1.CustomError(400, "Post already liked");
                }
                yield this.postData.likePost(new Post_1.Like(user.id, postId));
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.dislikePost = (token, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                const post = yield this.postData.getPostById(postId);
                if (!post) {
                    throw new CustomError_1.CustomError(400, "Post not exist");
                }
                const user = this.tokenManager.getTokenData(token);
                const verify = yield this.postData.searchLike(user.id, postId);
                if (!verify) {
                    throw new CustomError_1.CustomError(400, "Post not liked");
                }
                yield this.postData.dislikePost(postId, user.id);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getPostLikes = (token, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                const post = yield this.postData.getPostById(postId);
                if (!post) {
                    throw new CustomError_1.CustomError(400, "Post not exist");
                }
                const response = yield this.postData.getPostLikes(postId);
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.sharePost = (token, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                const post = yield this.postData.getPostById(postId);
                if (!post) {
                    throw new CustomError_1.CustomError(400, "Post not exist");
                }
                const user = this.tokenManager.getTokenData(token);
                if (!user) {
                    throw new CustomError_1.CustomError(404, "User fatal error");
                }
                yield this.postData.sharePost(user.id, postId);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.deleteShare = (token, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                const post = yield this.postData.getPostById(postId);
                if (!post) {
                    throw new CustomError_1.CustomError(400, "Post not exist");
                }
                const user = this.tokenManager.getTokenData(token);
                if (!user) {
                    throw new CustomError_1.CustomError(404, "User fatal error");
                }
                const verify = yield this.postData.getSharePost(user.id, postId);
                if (!verify) {
                    throw new CustomError_1.CustomError(400, "Post is not yours");
                }
                yield this.postData.deleteShare(user.id, postId);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map