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
                    throw new CustomError_1.CustomError(406, "Enter a id to follow");
                }
                const user = this.tokenManager.getTokenData(token);
                const followInfo = yield this.followData.getFollowById(user.id);
                if (followInfo.user_id === user.id && followInfo.followed_id === followedId) {
                    throw new CustomError_1.CustomError(406, "User already followed");
                }
                console.log(followInfo);
                yield this.followData.follow(new Follow_1.Follow(user.id, followedId));
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
    }
}
exports.FollowBusiness = FollowBusiness;
//# sourceMappingURL=FollowBusiness.js.map