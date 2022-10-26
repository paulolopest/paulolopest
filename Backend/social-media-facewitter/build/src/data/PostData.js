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
exports.PostData = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class PostData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.tableName = "facewitter_posts";
        this.create = (post) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName)
                    .insert({
                    id: post.getId(),
                    user_id: post.getUserId(),
                    image: post.getImage(),
                    content: post.getContent(),
                    created_at: post.getDate()
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getMyPosts = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ user_id: id })
                    .orderBy("created_at", "desc");
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getFeed = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection.raw(`SELECT * FROM facewitter_posts as post
                JOIN facewitter_follows as follow
                WHERE post.user_id = follow.followed_id
                and follow.user_id = "${id}"`);
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.editPost = (postId, content) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName)
                    .update({ content: content })
                    .where({ id: postId });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ id: id });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.deletePost = (postId, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("facewitter_comments")
                    .delete()
                    .where({ post_id: postId });
                yield this.connection("facewitter_post_likes")
                    .delete()
                    .where({ post_id: postId });
                yield this.connection(this.tableName)
                    .delete()
                    .where({ id: postId })
                    .andWhere({ user_id: userId });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.likePost = (like) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("facewitter_posts_likes")
                    .insert({
                    user_id: like.getUserId(),
                    post_id: like.getPostId()
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.dislikePost = (postId, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("facewitter_posts_likes")
                    .delete()
                    .where({ post_id: postId })
                    .andWhere({ user_id: userId });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getPostLikes = (postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("facewitter_posts_likes")
                    .where({ post_id: postId });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.searchLike = (userId, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("facewitter_posts_likes")
                    .where({ user_id: userId })
                    .andWhere({ post_id: postId });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.PostData = PostData;
//# sourceMappingURL=PostData.js.map