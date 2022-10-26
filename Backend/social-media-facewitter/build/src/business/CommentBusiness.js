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
exports.CommentBusiness = void 0;
const CustomError_1 = require("../models/CustomError");
const Comments_1 = require("../models/Comments");
const Date_1 = require("../services/Date");
class CommentBusiness {
    constructor(tokenManager, idGenerator, commentData, postData) {
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.commentData = commentData;
        this.postData = postData;
        this.comment = (token, postId, content) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login First");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                if (!content) {
                    throw new CustomError_1.CustomError(400, "Enter a content");
                }
                const post = yield this.postData.getPostById(postId);
                if (!post) {
                    throw new CustomError_1.CustomError(400, "Post not found");
                }
                const user = this.tokenManager.getTokenData(token);
                const id = this.idGenerator.generate();
                if (!user) {
                    throw new CustomError_1.CustomError(400, "User not found");
                }
                yield this.commentData.comment(new Comments_1.Comment(id, user.id, postId, content, Date_1.currentTime));
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getComments = (token, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login First");
                }
                if (!postId) {
                    throw new CustomError_1.CustomError(400, "Enter a post id");
                }
                const post = yield this.postData.getPostById(postId);
                if (!post) {
                    throw new CustomError_1.CustomError(400, "Post not found");
                }
                const user = this.tokenManager.getTokenData(token);
                const response = yield this.commentData.getComments(user.id, postId);
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.edit = (token, commentId, content) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login First");
                }
                if (!commentId) {
                    throw new CustomError_1.CustomError(400, "Comment not found");
                }
                if (!content) {
                    throw new CustomError_1.CustomError(400, "Enter a content");
                }
                const comment = yield this.commentData.getCommentById(commentId);
                if (!comment) {
                    throw new CustomError_1.CustomError(400, "Comment not found");
                }
                const user = this.tokenManager.getTokenData(token);
                const verify = yield this.commentData.validateAction(user.id, commentId);
                if (!verify) {
                    throw new CustomError_1.CustomError(401, "Invalid credentials");
                }
                yield this.commentData.edit(user.id, commentId, content);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.delete = (token, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!commentId) {
                    throw new CustomError_1.CustomError(400, "Comment not found");
                }
                const user = this.tokenManager.getTokenData(token);
                const comment = this.commentData.getCommentById(commentId);
                if (!comment) {
                    throw new CustomError_1.CustomError(400, "Comment not found");
                }
                const verify = yield this.commentData.validateAction(user.id, commentId);
                if (!verify) {
                    throw new CustomError_1.CustomError(401, "Invalid credentials");
                }
                yield this.commentData.delete(user.id, commentId);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.likePost = (token, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!commentId) {
                    throw new CustomError_1.CustomError(400, "Enter a comment id");
                }
                const user = this.tokenManager.getTokenData(token);
                if (!user) {
                    throw new CustomError_1.CustomError(404, "User fatal error");
                }
                const comment = yield this.commentData.getCommentById(commentId);
                if (!comment) {
                    throw new CustomError_1.CustomError(400, "Comment not found");
                }
                const verify = yield this.commentData.searchLike(user.id, commentId);
                if (verify) {
                    throw new CustomError_1.CustomError(400, "Comment already liked");
                }
                yield this.commentData.likePost(new Comments_1.LikePost(user.id, commentId));
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.dislikePost = (token, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!commentId) {
                    throw new CustomError_1.CustomError(400, "Enter a comment id");
                }
                const user = this.tokenManager.getTokenData(token);
                if (!user) {
                    throw new CustomError_1.CustomError(404, "User fatal error");
                }
                const comment = yield this.commentData.getCommentById(commentId);
                if (!comment) {
                    throw new CustomError_1.CustomError(400, "Comment not found");
                }
                const verify = yield this.commentData.searchLike(user.id, commentId);
                if (!verify) {
                    throw new CustomError_1.CustomError(400, "Comment not liked");
                }
                yield this.commentData.dislikePost(user.id, commentId);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getCommentLike = (token, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!commentId) {
                    throw new CustomError_1.CustomError(400, "Enter a comment id");
                }
                const comment = yield this.commentData.getCommentById(commentId);
                if (!comment) {
                    throw new CustomError_1.CustomError(400, "Comment not found");
                }
                const response = yield this.commentData.getCommentLike(commentId);
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
    }
}
exports.CommentBusiness = CommentBusiness;
//# sourceMappingURL=CommentBusiness.js.map