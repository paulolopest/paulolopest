import { PostBusiness } from "../business/PostBusiness";
import { Request, Response } from "express";

export class PostController {
    constructor(private postBusiness: PostBusiness) {}

    create = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {image, content} = req.body
            const response = await this.postBusiness.create(token, image, content)

            res.send("Post created")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    getMyPosts = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await this.postBusiness.getMyPosts(token)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    getFeed = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await this.postBusiness.getFeed(token)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    editPost = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {postId} = req.params
            const {content} = req.body    
        
            const response = await this.postBusiness.editPost(token, postId, content)

            res.send("Post edited")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    deletePost = async (req: Request, res: Response) => {
        try {
           const token = req.headers.authorization as string
           const {postId} = req.params
           const response = await this.postBusiness.deletePost(token, postId) 

           res.send("Post deleted")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    likePost = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {postId} = req.params
            
            await this.postBusiness.likePost(token, postId)

            res.send("Post liked")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    dislikePost = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {postId} = req.params
            await this.postBusiness.dislikePost(token, postId)

            res.send("Post disliked")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    getPostLikes = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {postId} = req.params
            const response = await this.postBusiness.getPostLikes(token, postId)

            res.send(response)
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    sharePost = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {postId} = req.params

            await this.postBusiness.sharePost(token, postId)

            res.status(200).send("Shared post")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    deleteShare = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {postId} = req.params
            
            await this.postBusiness.deleteShare(token, postId)

            res.status(200).send("Share deleted")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }
}