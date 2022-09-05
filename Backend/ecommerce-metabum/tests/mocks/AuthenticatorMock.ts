import { AuthenticationData } from "../../src/models/AuthenticationData"
import { userMock } from "./UserMock"

export class AuthenticatorMock {
    generateToken = (id: AuthenticationData): string => {
        return "mocked_token"
    }

    getTokenData = (token: string) => {
        return {id: "mocked_id"}
    }
}