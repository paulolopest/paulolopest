import { Request, Response } from "express";
import { FollowBusiness } from "../business/FollowBusiness";

export class FollowController {
    constructor (private followBusiness: FollowBusiness) {}

    follow = async (req: Request, res: Response) => {
        try {
            const token =  req.headers.authorization as string
            const followedId = req.body
            const response = await this.followBusiness.follow(token, followedId)

            res.send("User followed")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }
}