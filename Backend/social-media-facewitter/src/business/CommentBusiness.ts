import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { CustomError } from "../models/CustomError";
import { CommentData } from "../data/CommentData";
import { Comment, LikePost } from "../models/Comments";
import { PostData } from "../data/PostData";
import { currentTime } from "../services/Date";

export class CommentBusiness {
    constructor (
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private commentData: CommentData,
        private postData: PostData
        ) {}

    comment = async (token: string, postId: string, content: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login First")
            }
            if(!postId) {
                throw new CustomError(400, "Enter a post id")
            }
            if(!content) {
                throw new CustomError(400, "Enter a content")
            }

            const post = await this.postData.getPostById(postId)
            if(!post) {
                throw new CustomError(400, "Post not found")
            }

            const user = this.tokenManager.getTokenData(token)
            const id = this.idGenerator.generate()

            if(!user) {
                throw new CustomError(400, "User not found")
            }

            await this.commentData.comment(
                new Comment(
                    id,
                    user.id,
                    postId,
                    content,
                    currentTime
                )
            )

        } catch (error: any) {
            throw new CustomError(404, error.message)
        }
    }

    getComments = async (token: string, postId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login First")
            }
            if(!postId) {
                throw new CustomError(400, "Enter a post id")
            }

            const post = await this.postData.getPostById(postId)
            if(!post) {
                throw new CustomError(400, "Post not found")
            }

            const user = this.tokenManager.getTokenData(token)

            const response = await this.commentData.getComments(user.id, postId)

            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    edit = async (token: string, commentId: string, content: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login First")
            }
            if(!commentId) {
                throw new CustomError(400, "Comment not found")
            }
            if(!content) {
                throw new CustomError(400, "Enter a content")
            }

            const comment = await this.commentData.getCommentById(commentId)
            if(!comment) {
                throw new CustomError(400, "Comment not found")
            }

            const user = this.tokenManager.getTokenData(token)

            const verify = await this.commentData.validateAction(user.id, commentId)
            if(!verify) {
                throw new CustomError(401, "Invalid credentials")
            }

            await this.commentData.edit(user.id, commentId, content)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    delete = async(token: string, commentId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!commentId) {
                throw new CustomError(400, "Comment not found")
            }

            const user = this.tokenManager.getTokenData(token)
            const comment = this.commentData.getCommentById(commentId)
            if(!comment) {
                throw new CustomError(400, "Comment not found")
            }

            const verify = await this.commentData.validateAction(user.id, commentId)
            if(!verify) {
                throw new CustomError(401, "Invalid credentials")
            }
            
            await this.commentData.delete(user.id, commentId)
            
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    likePost = async (token: string, commentId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!commentId) {
                throw new CustomError(400, "Enter a comment id")
            }

            const user = this.tokenManager.getTokenData(token)
            if(!user) {
                throw new CustomError(404, "User fatal error")
            }

            const comment = await this.commentData.getCommentById(commentId)
            if(!comment) {
                throw new CustomError(400, "Comment not found")
            }

            const verify: boolean = await this.commentData.searchLike(user.id, commentId)
            if(verify) {
                throw new CustomError(400, "Comment already liked")
            }

            await this.commentData.likePost(
                new LikePost (
                    user.id,
                    commentId
                )
            )

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    dislikePost = async (token: string, commentId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!commentId) {
                throw new CustomError(400, "Enter a comment id")
            }

            const user = this.tokenManager.getTokenData(token)
            if(!user) {
                throw new CustomError(404, "User fatal error")
            }

            const comment = await this.commentData.getCommentById(commentId)
            if(!comment) {
                throw new CustomError(400, "Comment not found")
            }

            const verify: boolean = await this.commentData.searchLike(user.id, commentId)
            if(!verify) {
                throw new CustomError(400, "Comment not liked")
            }

            await this.commentData.dislikePost(user.id, commentId)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getCommentLike = async (token:string, commentId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!commentId) {
                throw new CustomError(400, "Enter a comment id")
            }

            const comment = await this.commentData.getCommentById(commentId)
            if(!comment) {
                throw new CustomError(400, "Comment not found")
            }

            const response = await this.commentData.getCommentLike(commentId)

            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
}