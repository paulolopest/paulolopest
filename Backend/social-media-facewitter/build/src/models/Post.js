"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, user_id, likes, created_at, image, content) {
        this.id = id;
        this.user_id = user_id;
        this.likes = likes;
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
    getLikes() {
        return this.likes;
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
//# sourceMappingURL=Post.js.map