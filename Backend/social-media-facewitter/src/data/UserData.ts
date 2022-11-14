import { User } from "../models/User";
import { currentTime } from "../services/Date";
import { BaseDatabase } from "./BaseDatabase";

export class UserData extends BaseDatabase {
    tableName: string = "facewitter_users"

    signup = async (user: User) => {
        try {
            await this.connection(this.tableName)
            .insert({
                id: user.getId(),
                name: user.getName(),
                nickname: user.getNickname(),
                email: user.getEmail(),
                password: user.getPassword(),
                birth_date: user.getBirthDate(),
            })

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    
    getProfile = async (id: string): Promise<User | undefined> => {
        try {
            const response = await this.connection(this.tableName)
            .select("id", "name", "nickname", "email", "birth_date")
            .where({id: id})

            return response[0]
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
    
    editUser = async (userId: string, name?: string, nickname?: string, email?: string, password?: string, birthDate?: Date) => {
        try {
            const response = await this.connection(this.tableName)
            .update({
                name,
                nickname,
                email,
                password,
                birthDate
            })
            .where({id: userId})
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
    
    editPassword = async (password: string, id: string) => {
        try {
            await this.connection(this.tableName)
            .update({password: password})
            .where({id: id})
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
    
    getUserById = async (id: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({id: id})
            
            return response[0]
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
    
    getUserByNick = async(nickname: string) => {
        try {
            const response = await this.connection(this.tableName)
            .where({nickname: nickname})
            
            return response[0]
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
    
    deleteUser = async (id: string) => {
        try {       
            await this.connection(this.tableName)
            .delete()
            .where({id: id})
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    logout = async (userId:string, token: string) => {
        try {
            await this.connection("facewitter_blockList")
            .insert({
                user_id: userId,
                expires_in: currentTime,
                token
            })
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

}