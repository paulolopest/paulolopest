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
                content: post.getContent(),
                likes: post.getLikes(),
                created_at: post.getDate()
            })
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getMyPosts = async (id: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({user_id: id})
            .orderBy("created_at", "desc")

            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    editPost = async(postId: string, content: string) => {
        try {
            await this.connection(this.tableName)
            .update({content: content})
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

    likePost = async(postId: string) => {
        try {
            await this.connection(this.tableName)
            .update({likes: +1})
            .where({id: postId})

            console.log(postId)

        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}