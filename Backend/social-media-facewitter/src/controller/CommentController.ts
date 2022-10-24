import { CommentBusiness } from "../business/CommentBusiness";
import { Request, Response } from "express";

export class CommentController {
    constructor (private commentBusiness: CommentBusiness) {}

    comment = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {content} = req.body
            const {postId} = req.params

            await this.commentBusiness.comment(token, postId, content)

            res.status(202).send("Commented")
        } catch (error:any) {
            res.status(404).send(error.message)
        }
    }

    getComments = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {postId} = req.params
            const response = await this.commentBusiness.getComments(token, postId)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(404).send(error.message)
        }
    }

    edit = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {commentId} = req.params
            const {content} = req.body

            await this.commentBusiness.edit(token, commentId, content)

            res.status(200).send("Edited comment")
        } catch (error:any) {
            res.status(404).send(error.message)
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {commentId} = req.params
            
            await this.commentBusiness.delete(token, commentId)

            res.status(200).send("Comment deleted")
        } catch (error: any) {
            res.status(404).send(error.message)
        }
    }

    like = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {commentId} = req.params

            await this.commentBusiness.like(token, commentId)

            res.status(200).send("Comment liked")
        } catch (error:any) {
            res.status(404).send(error.message)
        }
    }

    dislike = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {commentId} = req.params

            await this.commentBusiness.dislike(token, commentId)

            res.status(200).send("Disliked comment")
        } catch (error:any) {
            res.status(404).send(error.message)
        }
    }
}