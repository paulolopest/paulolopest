import { CustomError } from "../models/CustomError";
import { BaseDatabase } from "./BaseDatabase";
import { Comment } from "../models/Comments";

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
                likes: comment.getLikes() 
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
            await this.connection(this.tableName)
            .delete()
            .where({id: commentId})
            .andWhere({user_id: userId})

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    like = async (id: string) => {
        try {
            await this.connection(this.tableName)
            .update({likes: +1})
            .where({id: id})

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    dislike = async (id: string) => {
        try {
            await this.connection(this.tableName)
            .update({likes: -1})
            .where({id: id})

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

}