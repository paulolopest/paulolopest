import { AuthenticationData } from "../models/AuthenticationData";
import { TokenManager } from "../services/TokenManager";
import { CustomError } from "../models/CustomError";
import { FollowData } from "../data/FollowData";
import { Follow } from "../models/Follow";

export class FollowBusiness {
    constructor(
        private followData: FollowData,
        private tokenManager: TokenManager,
        ) {}

    follow = async (token: string, followedId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!followedId) {
                throw new CustomError(404, "User not found")
            }

            const idValidation: boolean = await this.followData.getUserById(followedId)

            if (!idValidation) {
                throw new CustomError(422, "User not found")
            }
     
            const user: AuthenticationData = this.tokenManager.getTokenData(token)
            const verifyFollow: boolean = await this.followData.verifyFollow(user.id, followedId)

            if(verifyFollow) {
                throw new CustomError(406, "User already followed")
            }
            if(followedId === user.id) {
                throw new CustomError(406, "You cant follow yourself")
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

    unfollow = async(token: string, followedId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!followedId) {
                throw new CustomError(404, "User not found")
            }

            const idValidation: boolean = await this.followData.getUserById(followedId)

            if (!idValidation) {
                throw new CustomError(422, "User not found")
            }
     
            const user: AuthenticationData = this.tokenManager.getTokenData(token)
            const verifyFollow: boolean = await this.followData.verifyFollow(user.id, followedId)

            if(!verifyFollow) {
                throw new CustomError(406, "User not followed")
            }

            await this.followData.unfollow(user.id, followedId)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getFollowing = async (token: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login First")
            }
            const user: AuthenticationData = this.tokenManager.getTokenData(token)

            const response = await this.followData.getFollowing(user.id)

            return response
            
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getFollowers = async (token: string): Promise<any[]> => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
    
            const user: AuthenticationData = this.tokenManager.getTokenData(token)
    
            const response = await this.followData.getFollowers(user.id)

            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
}