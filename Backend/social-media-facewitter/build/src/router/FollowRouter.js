"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRouter = void 0;
const FollowController_1 = require("../controller/FollowController");
const FollowBusiness_1 = require("../business/FollowBusiness");
const TokenManager_1 = require("../services/TokenManager");
const FollowData_1 = require("../data/FollowData");
const express_1 = __importDefault(require("express"));
const followBusiness = new FollowBusiness_1.FollowBusiness(new FollowData_1.FollowData(), new TokenManager_1.TokenManager());
const followController = new FollowController_1.FollowController(followBusiness);
exports.followRouter = express_1.default.Router();
exports.followRouter.post("/:userId/follow", followController.follow);
exports.followRouter.delete("/:userId/unfollow", followController.unfollow);
exports.followRouter.get("/profile/followers", followController.getFollowers);
exports.followRouter.get("/profile/following", followController.getFollowing);
//# sourceMappingURL=FollowRouter.js.map