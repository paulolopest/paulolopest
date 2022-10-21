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
exports.FollowData = void 0;
const CustomError_1 = require("../models/CustomError");
const BaseDatabase_1 = require("./BaseDatabase");
class FollowData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.tableName = "facewitter_follows";
        this.follow = (follow) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName)
                    .insert({
                    user_id: follow.getUserId(),
                    followed_id: follow.getFollowedId()
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.verifyFollow = (userId, followedId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ user_id: userId })
                    .andWhere({ followed_id: followedId });
                return response[0];
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("facewitter_users")
                    .where({ id: id });
                return response[0];
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.unfollow = (userId, followedId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName)
                    .delete()
                    .where({ user_id: userId })
                    .andWhere({ followed_id: followedId });
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getFollowing = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .select("followed_id")
                    .where({ user_id: id });
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getFollowers = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .select("user_id")
                    .where({ followed_id: id });
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
    }
}
exports.FollowData = FollowData;
//# sourceMappingURL=FollowData.js.map