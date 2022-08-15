import { Request, Response } from "express"
import { userBusiness } from "../models/Classes"

export class UserController {
    signup = async(req: Request, res: Response) => {
        try {
            const {name, email, cpf, password} = req.body
            const response = await userBusiness.signup(name, email, cpf, password)

            res.status(201).send(response)
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlMessage)
        }
    }

    login = async(req: Request, res: Response) => {
        try {
            const {email, password} = req.body
            const response = await userBusiness.login(email, password)


            res.status(200).send(response)
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlMessage)
        }
    }

    getProfile = async(req:Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await userBusiness.getProfile(token)

            res.send(response)
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlMessage)
        }
    }

    editProfileName = async(req:Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {name} = req.body

            const response  = await userBusiness.editProfileName(token, name)

            res.send(`Name successfully update for ${name}`)
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlMessage)
        }
    }

    deleteUser = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await userBusiness.deleteUser(token)

            res.send("User deleted")
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlMessage)
        }
    }
}