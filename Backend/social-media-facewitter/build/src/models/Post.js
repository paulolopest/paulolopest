"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = exports.Post = void 0;
class Post {
    constructor(id, user_id, created_at, image, content) {
        this.id = id;
        this.user_id = user_id;
        this.created_at = created_at;
        this.image = image;
        this.content = content;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.user_id;
    }
    getDate() {
        return this.created_at;
    }
    getImage() {
        return this.image;
    }
    getContent() {
        return this.content;
    }
}
exports.Post = Post;
class Like {
    constructor(userId, postId) {
        this.userId = userId;
        this.postId = postId;
    }
    getUserId() {
        return this.userId;
    }
    getPostId() {
        return this.postId;
    }
}
exports.Like = Like;
//# sourceMappingURL=Post.js.map