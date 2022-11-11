import { BaseDatabase } from "./BaseDatabase";
import { Like, Post } from "../models/Post";
import { currentTime } from "../services/Date";

export class PostData extends BaseDatabase {
    private tableName = "facewitter_posts"

    create = async (post: Post) => {
        try {
            await this.connection(this.tableName)
            .insert({
                id: post.getId(),
                user_id: post.getUserId(),
                image: post.getImage(),
                content: post.getContent(),
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

    getFeed = async (id: string) => {
        try {
            const response = await this.connection.raw (
                `SELECT * FROM facewitter_posts as post
                JOIN facewitter_follows as follow
                WHERE post.user_id = follow.followed_id
                and follow.user_id = "${id}"
                ORDER BY created_at DESC`
            )

            return response[0]
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

    likePost = async(like: Like) => {
        try {
            await this.connection("facewitter_posts_likes")
            .insert({
                user_id: like.getUserId(),
                post_id: like.getPostId()
            })

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    dislikePost = async (postId: string, userId: string) => {
        try {
            await this.connection("facewitter_posts_likes")
            .delete()
            .where({post_id: postId})
            .andWhere({user_id: userId})

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    sharePost = async(userId: string, postId: string) => {
        try {
            await this.connection("facewitter_shares")
            .insert({
                user_id: userId,
                post_id: postId,
                created_at: currentTime
            })
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getSharePost = async (userId: string, postId: string) => {
        try {
            const response = await this.connection("facewitter_shares")
            .where({user_id: userId})
            .andWhere({post_id: postId})
            .orderBy("created_at", "desc")

            return response[0]
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    deleteShare = async (userId: string, postId: string) => {
        try {
            await this.connection("facewitter_shares")
            .delete()
            .where({user_id: userId})
            .andWhere({post_id: postId})

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getPostLikes = async (postId: string) => {
        try {
            const response = await this.connection("facewitter_posts_likes")
            .where({post_id: postId})

            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    searchLike = async (userId: string, postId: string) => {
        try {
            const response = await this.connection("facewitter_posts_likes")
            .where({user_id: userId})
            .andWhere({post_id: postId})

            return response[0]
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}