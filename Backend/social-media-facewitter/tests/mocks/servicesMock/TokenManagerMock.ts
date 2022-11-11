import { AuthenticationData } from "../../../src/models/AuthenticationData"

export class TokenManagerMock {
    generate = (id: AuthenticationData): string => {
        return "mocked_token"
    }

    getTokenData = (token: string) => {
        return {id: "mocked_id"}
    }
}