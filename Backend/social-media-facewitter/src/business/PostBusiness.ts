import { AuthenticationData } from "../models/AuthenticationData";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { CustomError } from "../models/CustomError";
import { createdDate } from "../models/Date";
import { PostData } from "../data/PostData";
import { Post } from "../models/Post";

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
    
            const user: AuthenticationData = this.tokenManager.getTokenData(token)
            const id: string = this.idGenerator.generate()
            let likes: number = 0
    
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

    getMyPosts = async(token: string): Promise<any[]> => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            
            const user: AuthenticationData = this.tokenManager.getTokenData(token)

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

            const user: AuthenticationData = this.tokenManager.getTokenData(token)
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
            const user: AuthenticationData = this.tokenManager.getTokenData(token)

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
            if(!post) {
                throw new CustomError(400, "Post not exist")
            }

            await this.postData.likePost(postId)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    
}