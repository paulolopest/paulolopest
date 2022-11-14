import { BaseDatabase } from "../../../src/data/BaseDatabase";
import { User } from "../../../src/models/User";
import { userMock } from "./UserMock";

export class UserDatabaseMock extends BaseDatabase {
    tableName: string = "facewitter_users"

    signup = async (user: User): Promise<void> => {};

    public getProfile = async (id: string): Promise<User | undefined> => {
        if (id === "mocked_token") {
          return userMock;
        } else {
          return undefined;
        }
      };

    editUser = async (token: string , name?: string, nickname?: string, email?: string, password?: string, birthDate?: Date) => {}

    editPassword = async (password: string, id: string) => {}

    getUserById = async (id: string) => {
        if (id === userMock.getId()) {
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

    deleteUser = async (id: string) => {}

    logout = async (userId:string, token: string) => {}
}