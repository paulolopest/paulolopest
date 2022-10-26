import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";

export class UserController {
    constructor (private userBusiness: UserBusiness) {}

    signup = async (req: Request, res: Response) => {
        try {
            const {name, nickname, email, password, birthDate} = req.body
            const response = await this.userBusiness.signup(name, nickname, email, password, birthDate)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body
            const response: string = await this.userBusiness.login(email, password)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    getProfile = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await this.userBusiness.getProfile(token)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    logout = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await this.userBusiness.logout(token)

            res.send("Logout")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            await this.userBusiness.deleteUser(token)

            res.status(200).send("User deleted")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    editUser = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {name, nickname, email, password, birthDate} = req.body
            await this.userBusiness.editUser(token, name, nickname, email, password, birthDate)

            res.status(200).send("User updated")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

    editPassword = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {currentPassword, newPassword} = req.body
            await this.userBusiness.editPassword(currentPassword, newPassword, token)

            res.status(200).send("Password updated successfully")
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }
}