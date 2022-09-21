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
            throw new Error(error.message)
        }
    }

    getFollowById = async (id: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({user_id: id})

            return response[0]
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}