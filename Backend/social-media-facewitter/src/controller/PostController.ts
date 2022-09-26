import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
    constructor(private postBusiness: PostBusiness) {}

    create = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {image, description} = req.body
            const response = await this.postBusiness.create(token, image, description)

            res.send("Post created")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    editPost = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {postId} = req.params
            const {description} = req.body    
        
            const response = await this.postBusiness.editPost(token, postId, description)

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
}