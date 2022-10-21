"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
class Follow {
    constructor(user_id, followed_id) {
        this.user_id = user_id;
        this.followed_id = followed_id;
    }
    getUserId() {
        return this.user_id;
    }
    getFollowedId() {
        return this.followed_id;
    }
}
exports.Follow = Follow;
//# sourceMappingURL=Follow.js.map