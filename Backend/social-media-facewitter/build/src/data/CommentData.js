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
exports.CommentData = void 0;
const CustomError_1 = require("../models/CustomError");
const BaseDatabase_1 = require("./BaseDatabase");
class CommentData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.tableName = "facewitter_comments";
        this.comment = (comment) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName)
                    .insert({
                    id: comment.getId(),
                    post_id: comment.getPostId(),
                    user_id: comment.getUserId(),
                    content: comment.getContent(),
                    created_at: comment.getDate()
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getComments = (userId, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ user_id: userId })
                    .andWhere({ post_id: postId });
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.edit = (userId, commentId, content) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName)
                    .update({ content: content })
                    .where({ id: commentId })
                    .andWhere({ user_id: userId });
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.delete = (userId, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("facewitter_comments_likes")
                    .delete()
                    .where({ comment_id: commentId });
                yield this.connection(this.tableName)
                    .delete()
                    .where({ id: commentId })
                    .andWhere({ user_id: userId });
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.likePost = (like) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("facewitter_comments_likes")
                    .insert({
                    user_id: like.getUserId(),
                    comment_id: like.getCommentId()
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.dislikePost = (userId, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("facewitter_comments_likes")
                    .delete()
                    .where({ user_id: userId })
                    .andWhere({ comment_id: commentId });
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getCommentLike = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("facewitter_comments_likes")
                    .where({ comment_id: id });
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getCommentById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ id: id });
                return response[0];
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.validateAction = (userId, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ user_id: userId })
                    .andWhere({ id: commentId });
                return response[0];
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.searchLike = (userId, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("facewitter_comments_likes")
                    .where({ user_id: userId })
                    .andWhere({ comment_id: commentId });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.CommentData = CommentData;
//# sourceMappingURL=CommentData.js.map