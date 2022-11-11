import { User } from "../../../src/models/User";
import { userMock } from "./UserMock";

export class UserDatabaseMock {
    signup = async (user: User): Promise<void> => {};

    getProfile = async (id: string) => {
        if (id = "mocked_token") {
            return userMock
        } else {
            return undefined
        }
    }

    editUser = async (token: string , name?: string, nickname?: string, email?: string, password?: string, birthDate?: Date) => {
        if (token === "mocked_token") {
            return "User edited"
        } else {
            undefined
        }
    }

    editPassword = async (currentPassword: string, newPassword: string, id: string) => {
        if (id === "mocked_id") {
            return `Password edited to ${newPassword}`
        } else {
            undefined
        }
    }

    getUserById = async (id: string) => {
        if (id === "1") {
            return userMock
        } else undefined
    }

    getUserByEmail = async(email: string) => {
        if (email === "paulo@gmail.com") {
            return userMock
        } else {
            undefined
        }
    }

    getUserByNick = async(nickname: string) => {
        if (nickname === "Meta Tarso") {
            return userMock
        } else {
            undefined
        }
    }

    deleteUser = async (id: string) => {
        if(id === "1") {
            return "User deleted"
        } else {
            undefined
        }
    }

    logout = async (userId:string, token: string) => {}
}