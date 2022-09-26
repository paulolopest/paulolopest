import { Post } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostData extends BaseDatabase {
    private tableName = "facewitter_posts"

    create = async (post: Post) => {
        try {
            const response = await this.connection(this.tableName)
            .insert({
                id: post.getId(),
                user_id: post.getUserId(),
                image: post.getImage(),
                description: post.getDescription(),
                likes: post.getLikes(),
                created_at: post.getDate()
            })
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    } 

    editPost = async(postId: string, description: string) => {
        try {
            await this.connection(this.tableName)
            .update({description: description})
            .where({id: postId})

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getPostById = async (id: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({id: id})

            return response[0]
        } catch (error:any) {
            throw new Error(error.message) 
        }
    }

    deletePost = async (postId: string, userId: string) => {
        try {
            await this.connection(this.tableName)
            .delete()
            .where({id: postId})
            .andWhere({user_id: userId})

        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}