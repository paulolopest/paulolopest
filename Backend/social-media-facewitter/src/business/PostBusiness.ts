import { PostData } from "../data/PostData";
import { CustomError } from "../models/CustomError";
import { createdDate } from "../models/Date";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postData: PostData,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
        ) {}

    create = async (token: string, image: Blob,content?: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!content && !image) {
                throw new CustomError(400, "The post must contain some content")
            }
    
            const user = this.tokenManager.getTokenData(token)
            const id = this.idGenerator.generate()
            let likes = 0
    
            await this.postData.create(
                new Post(
                    id,
                    user.id,
                    likes,
                    createdDate,
                    image,
                    content
                )
            )
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getMyPosts = async(token: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            
            const user = await this.tokenManager.getTokenData(token)

            const response = await this.postData.getMyPosts(user.id)

            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    editPost = async(token: string, postId: string, content: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!postId) {
                throw new CustomError(400, "Enter a post id")
            }
            if(!content) {
                throw new CustomError(400, "Enter a content")
            }

            const user = this.tokenManager.getTokenData(token)
            const post = await this.postData.getPostById(postId)

            if(user.id != post.user_id) {
                throw new CustomError(406, "The post is not yours")
            }
            if(!post) {
                throw new CustomError(406, "Post not exist")
            }

            await this.postData.editPost(postId, content)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    deletePost = async(token: string, postId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!postId) {
                throw new CustomError(400, "Enter a post id")
            }

            const post = await this.postData.getPostById(postId)
            const user = this.tokenManager.getTokenData(token)

            if(!post) {
                throw new CustomError(400, "Post not exist")
            }
            if(post.user_id != user.id) {
                throw new CustomError(406, "The post is not yours")
            }

            await this.postData.deletePost(postId, user.id)
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    likePost = async (token: string, postId: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!postId) {
                throw new CustomError(400, "Enter a post id")
            }

            const post = await this.postData.getPostById(postId)
            const user = this.tokenManager.getTokenData(token)

            if(!post) {
                throw new CustomError(400, "Post not exist")
            }

            console.log(postId)

            await this.postData.likePost(postId)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
}