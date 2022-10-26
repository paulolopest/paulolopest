import { AuthenticationData } from "../models/AuthenticationData";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { CustomError } from "../models/CustomError";
import { Like, Post } from "../models/Post";
import { PostData } from "../data/PostData";
import { currentTime } from "../services/Date";

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
                    currentTime,
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

    getFeed = async (token: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }

            const user = this.tokenManager.getTokenData(token)
            if(!user) {
                throw new CustomError(404, "User fatal error")
            }

            const response = await this.postData.getFeed(user.id)

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
            
            const user = this.tokenManager.getTokenData(token)

            const verify: boolean = await this.postData.searchLike(user.id, postId)
            if(verify) {
                throw new CustomError(400, "Post already liked")
            }

            await this.postData.likePost(
                new Like (
                    user.id,
                    postId
                )
            )

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    dislikePost = async (token: string, postId: string) => {
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

            const user = this.tokenManager.getTokenData(token)

            const verify: boolean = await this.postData.searchLike(user.id, postId)
            if(!verify) {
                throw new CustomError(400, "Post not liked")
            }
            
            await this.postData.dislikePost(postId, user.id)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getPostLikes = async (token: string, postId: string) => {
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

            const response = await this.postData.getPostLikes(postId)
            
            return response
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    sharePost = async (token: string, postId: string) => {
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

            const user = this.tokenManager.getTokenData(token)
            if(!user) {
                throw new CustomError(404, "User fatal error")
            }

            await this.postData.sharePost(user.id, postId)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
    
    deleteShare = async (token: string, postId: string) => {
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

            const user = this.tokenManager.getTokenData(token)
            if(!user) {
                throw new CustomError(404, "User fatal error")
            }

            const verify: boolean = await this.postData.getSharePost(user.id, postId)
            if(!verify) {
                throw new CustomError(400, "Post is not yours")
            }

            await this.postData.deleteShare(user.id, postId)
            
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }
}