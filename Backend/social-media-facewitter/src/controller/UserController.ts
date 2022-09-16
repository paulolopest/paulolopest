import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
    constructor (private userBusiness: UserBusiness) {}

    signup = async (req: Request, res: Response) => {
        try {
            const {name, email, password, birthDate} = req.body
            const response = await this.userBusiness.signup(name, email, password, birthDate)

            res.status(200).send(response)
        } catch (error:any) {
            res.send(error.message)
        }
    }
}