"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
class Follow {
    constructor(userId, followedId) {
        this.userId = userId;
        this.followedId = followedId;
    }
    getUserId() {
        return this.userId;
    }
    getFollowedId() {
        return this.followedId;
    }
}
exports.Follow = Follow;
//# sourceMappingURL=Follow.js.map