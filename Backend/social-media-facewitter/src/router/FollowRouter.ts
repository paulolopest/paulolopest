import { FollowBusiness } from "../business/FollowBusiness";
import { FollowController } from "../controller/FollowController";
import { FollowData } from "../data/FollowData";
import { TokenManager } from "../services/TokenManager";
import express, { Router } from "express"

const followBusiness: FollowBusiness = new FollowBusiness (
    new FollowData(),
    new TokenManager()
)

const followController: FollowController = new FollowController (followBusiness)

export const followRouter: Router = express.Router()

followRouter.post("/:userId/follow", followController.follow)
followRouter.delete("/:userId/unfollow", followController.unfollow)
followRouter.get("/profile/followers", followController.getFollowers)
followRouter.get("/profile/following", followController.getFollowing)