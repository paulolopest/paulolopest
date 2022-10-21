import { AuthenticationData } from "../models/AuthenticationData"
import { BaseDatabase } from "../data/BaseDatabase"
import * as jwt from "jsonwebtoken"

export class TokenManager extends BaseDatabase{
    generate =  (id: AuthenticationData): string => {
        return jwt.sign(
            id,
            process.env.SECRET_KEY as jwt.Secret,
            {expiresIn: process.env.EXPIRE_VALUE}
    )}

    getTokenData = (token: string): AuthenticationData => {
        return jwt.verify(token, process.env.SECRET_KEY as jwt.Secret) as AuthenticationData
    }
    
    verifyToken = async (token:string) => {
        try {
            if(!token) {
                throw new Error("Enter a token")
            }

            const response = await this.connection("facewitter_blockList")
            .where({token: token})

            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}
