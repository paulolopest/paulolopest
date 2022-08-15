import * as jwt from "jsonwebtoken"
import { AuthenticationData } from "../models/AuthenticationData"

const secreKey = process.env.SECRET_KEY as string

export class Authenticator {
    generateToken = (id: AuthenticationData): string => {
        return jwt.sign (
            id,
            secreKey,
            {expiresIn: "5h"}
    )}

    getTokenData = (token: string): AuthenticationData => {
        return jwt.verify(token, "r2d2c3po") as AuthenticationData
    }
}