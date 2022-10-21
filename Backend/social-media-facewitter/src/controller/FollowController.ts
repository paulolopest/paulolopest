import { FollowBusiness } from "../business/FollowBusiness";
import { Request, Response } from "express";

export class FollowController {
    constructor (private followBusiness: FollowBusiness) {}

    follow = async (req: Request, res: Response) => {
        try {
            const token: string = req.headers.authorization as string
            const {userId} = req.params
            await this.followBusiness.follow(token, userId)

            res.status(200).send("User followed")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    unfollow = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {userId} = req.params
            await this.followBusiness.unfollow(token, userId)

            res.status(200).send("Unfollowed user")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    getFollowing = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await this.followBusiness.getFollowing(token)
            
            res.status(200).send(response)
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    getFollowers = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await this.followBusiness.getFollowers(token)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }
}