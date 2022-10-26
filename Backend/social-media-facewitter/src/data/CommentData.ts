import { CustomError } from "../models/CustomError";
import { BaseDatabase } from "./BaseDatabase";
import { Comment, LikePost } from "../models/Comments";

export class CommentData extends BaseDatabase {
    private tableName = "facewitter_comments"

    comment = async (comment: Comment) => {
        try {
            await this.connection(this.tableName)
            .insert({
                id: comment.getId(),
                post_id: comment.getPostId(),
                user_id: comment.getUserId(),
                content: comment.getContent(),
                created_at: comment.getDate()
            })
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getComments = async (userId: string, postId: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({user_id: userId})
            .andWhere({post_id: postId})

            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    edit = async (userId: string, commentId: string, content: string) => {
        try {
            await this.connection(this.tableName)
            .update({content: content})
            .where({id: commentId})
            .andWhere({user_id: userId})

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
    
    delete = async (userId: string, commentId: string) => {
        try {
            await this.connection("facewitter_comments_likes")
            .delete()
            .where({comment_id: commentId})

            await this.connection(this.tableName)
            .delete()
            .where({id: commentId})
            .andWhere({user_id: userId})

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    likePost = async (like: LikePost) => {
        try {
            await this.connection("facewitter_comments_likes")
            .insert ({
                user_id: like.getUserId(),
                comment_id: like.getCommentId()
            })

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    dislikePost = async (userId: string, commentId: string) => {
        try {
            await this.connection("facewitter_comments_likes")
            .delete()
            .where({user_id: userId})
            .andWhere({comment_id: commentId})

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getCommentLike = async (id: string) => {
        try {
            const response = await this.connection("facewitter_comments_likes")
            .where({comment_id: id})

            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getCommentById = async (id: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({id: id})

            return response[0]
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    validateAction = async (userId: string, commentId: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({user_id: userId})
            .andWhere({id: commentId})

            return response[0]
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    searchLike = async (userId: string, commentId: string) => {
        try {
            const response = await this.connection("facewitter_comments_likes")
            .where({user_id: userId})
            .andWhere({comment_id: commentId})

            return response[0]
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

}