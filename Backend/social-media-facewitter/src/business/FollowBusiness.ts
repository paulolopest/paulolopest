import { FollowData } from "../data/FollowData";
import { CustomError } from "../models/CustomError";
import { Follow } from "../models/Follow";
import { TokenManager } from "../services/TokenManager";

export class FollowBusiness {
    constructor(
        private followData: FollowData,
        private tokenManager: TokenManager
        ) {}

    follow = async (token: string, followedId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!followedId) {
                throw new CustomError(406, "Enter a id to follow")
            }

            const user = this.tokenManager.getTokenData(token)

            const followInfo = await this.followData.getFollowById(user.id)

            if(followInfo.user_id === user.id && followInfo.followed_id === followedId) {
                throw new CustomError(406, "User already followed")
            }
            

            await this.followData.follow(
                new Follow(
                    user.id,
                    followedId
                )
            )

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
}