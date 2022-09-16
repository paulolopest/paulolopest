import { User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserData extends BaseDatabase {
    private tableName: string = "facewitter_users"

    signup = async (user: User) => {
        try {
            await this.connection(this.tableName)
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                birth_date: user.getBirthDate(),
            })

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getUserByEmail = async(email: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({email})

            return response[0]
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}