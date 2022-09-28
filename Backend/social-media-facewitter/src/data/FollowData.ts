import { CustomError } from "../models/CustomError"
import { Follow } from "../models/Follow"
import { BaseDatabase } from "./BaseDatabase"

export class FollowData extends BaseDatabase {
    private tableName: string = "facewitter_follows"

    follow = async (follow: Follow) => {
        try {
            await this.connection(this.tableName)
            .insert({
                user_id: follow.getUserId(),
                followed_id: follow.getFollowedId()
            })
            
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    verifyFollow = async (userId: string, followedId: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({user_id: userId})
            .andWhere({followed_id: followedId})

            return response [0]
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
    
    getUserById = async (id: string) => {
        try {
            const response = await this.connection("facewitter_users")
            .where({id: id})

            return response[0]
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    unfollow = async (userId: string, followedId: string) => {
        try {
            await this.connection(this.tableName)
            .delete()
            .where({user_id: userId})
            .andWhere({followed_id: followedId})

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getFollowing = async (id: string) => {
        try {
            const response = await this.connection(this.tableName)
            .select("followed_id")
            .where({user_id: id})

            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getFollowers = async (id: string) => {
        try {
            const response = await this.connection(this.tableName)
            .select("user_id")
            .where({followed_id: id})

            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
}