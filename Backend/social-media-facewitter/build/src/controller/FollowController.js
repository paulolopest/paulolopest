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
exports.FollowController = void 0;
class FollowController {
    constructor(followBusiness) {
        this.followBusiness = followBusiness;
        this.follow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { userId } = req.params;
                yield this.followBusiness.follow(token, userId);
                res.status(200).send("User followed");
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.unfollow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { userId } = req.params;
                yield this.followBusiness.unfollow(token, userId);
                res.status(200).send("Unfollowed user");
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.getFollowing = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield this.followBusiness.getFollowing(token);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.getFollowers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield this.followBusiness.getFollowers(token);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
    }
}
exports.FollowController = FollowController;
//# sourceMappingURL=FollowController.js.map