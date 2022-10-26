"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(id, userId, postId, content, likes) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
        this.likes = likes;
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
    getLikes() {
        return this.likes;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comments.js.map