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
exports.FollowBusiness = void 0;
const CustomError_1 = require("../models/CustomError");
const Follow_1 = require("../models/Follow");
class FollowBusiness {
    constructor(followData, tokenManager) {
        this.followData = followData;
        this.tokenManager = tokenManager;
        this.follow = (token, followedId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!followedId) {
                    throw new CustomError_1.CustomError(404, "User not found");
                }
                const idValidation = yield this.followData.getUserById(followedId);
                if (!idValidation) {
                    throw new CustomError_1.CustomError(422, "User not found");
                }
                const user = this.tokenManager.getTokenData(token);
                const verifyFollow = yield this.followData.verifyFollow(user.id, followedId);
                if (verifyFollow) {
                    throw new CustomError_1.CustomError(406, "User already followed");
                }
                if (followedId === user.id) {
                    throw new CustomError_1.CustomError(406, "You cant follow yourself");
                }
                yield this.followData.follow(new Follow_1.Follow(user.id, followedId));
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.unfollow = (token, followedId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!followedId) {
                    throw new CustomError_1.CustomError(404, "User not found");
                }
                const idValidation = yield this.followData.getUserById(followedId);
                if (!idValidation) {
                    throw new CustomError_1.CustomError(422, "User not found");
                }
                const user = this.tokenManager.getTokenData(token);
                const verifyFollow = yield this.followData.verifyFollow(user.id, followedId);
                if (!verifyFollow) {
                    throw new CustomError_1.CustomError(406, "User not followed");
                }
                yield this.followData.unfollow(user.id, followedId);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getFollowing = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login First");
                }
                const user = this.tokenManager.getTokenData(token);
                const response = yield this.followData.getFollowing(user.id);
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getFollowers = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                const user = this.tokenManager.getTokenData(token);
                const response = yield this.followData.getFollowers(user.id);
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
    }
}
exports.FollowBusiness = FollowBusiness;
//# sourceMappingURL=FollowBusiness.js.map