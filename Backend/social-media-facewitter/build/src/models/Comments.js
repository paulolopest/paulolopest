"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePost = exports.Comment = void 0;
class Comment {
    constructor(id, userId, postId, content, createdAt) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.userId;
    }
    getPostId() {
        return this.postId;
    }
    getContent() {
        return this.content;
    }
    getDate() {
        return this.createdAt;
    }
}
exports.Comment = Comment;
class LikePost {
    constructor(userId, commentId) {
        this.userId = userId;
        this.commentId = commentId;
    }
    getUserId() {
        return this.userId;
    }
    getCommentId() {
        return this.commentId;
    }
}
exports.LikePost = LikePost;
//# sourceMappingURL=Comments.js.map