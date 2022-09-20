import { UserData } from "../data/UserData";
import { CustomError } from "../models/CustomError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
    constructor (
        private userData: UserData,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ) {}

    signup = async(name: string, nickname: string, email: string, password: string, birthDate: Date): Promise<string> => {
        try {
            if(!name) {
                throw new CustomError(400, "Enter a name")
            }
            if(!nickname) {
                throw new CustomError(400, "Enter a nickname")
            }
            if(!email) {
                throw new CustomError(400, "Enter an email")
            } else if(email.indexOf("@") === -1) {
                throw new CustomError(400, "Invalid email")
            } else if(email.indexOf(".com") === -1) {
                throw new CustomError(400, "Invalid email")
            }
            if(!password) {
                throw new CustomError(400, "Enter a password")
            } else if(password.length <= 6) {
                throw new CustomError(400, "Password must contain more than 6 characters")
            }
            if(!birthDate) {
                throw new CustomError(400, "Enter a birth date")
            }

            const verifyEmail = await this.userData.getUserByEmail(email)
            if(verifyEmail) {
                throw new CustomError(409, "Email already registered")
            }

            const verifyNick = await this.userData.getUserByNick(nickname)
            if(verifyNick) {
                throw new CustomError(409, "Nickname already registered")
            }

            const id = this.idGenerator.generate()
            const token: string = this.tokenManager.generate({id})
            const hashPassword = await this.hashManager.hash(password)

            await this.userData.signup(
                new User(
                    id,
                    name,
                    nickname,
                    email,
                    hashPassword,
                    birthDate
                )
            )

            return token
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }  
    }

    login = async (email: string, password: string): Promise<string> => {
        try {
            if(!email) {
                throw new CustomError(400, "Enter an email")
            } else if(email.indexOf("@") === -1) {
                throw new CustomError(400, "Invalid email")
            } else if(email.indexOf(".com") === -1) {
                throw new CustomError(400, "Invalid email")
            }
            if(!password) {
                throw new CustomError(400, "Invalid password")
            } else if(password.length <= 6) {
                throw new CustomError(400, "Invalid password")
            }

            const user = await this.userData.getUserByEmail(email)

            if(!user) {
                throw new CustomError(406, "User not found")
            }

            const verifyPassword: boolean = await this.hashManager.compare(password, user.password)
            
            if(!verifyPassword) {
                throw new CustomError(422, "Incorrect password")
            }

            const token: string = this.tokenManager.generate({id: user.id})

            return token

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    editUser = async (token: string, name?: string, nickname?: string, email?: string, password?: string, birthDate?: Date) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            const userId = this.tokenManager.getTokenData(token)

            await this.userData.editUser(userId.id, name, nickname, email, password, birthDate)
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    editPassword = async (currentPassword: string, newPassword: string, token: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            if(!currentPassword) {
                throw new CustomError(400, "Enter your current password")
            }
            if(!currentPassword) {
                throw new CustomError(400, "Enter your new password")
            } else if(currentPassword.length <= 6) {
                throw new CustomError(400, "Password must contain more than 6 characters")
            }

            if(newPassword === currentPassword) {
                throw new CustomError(406, "The password cannot be the same")
            }

            const userId = this.tokenManager.getTokenData(token)
            const user = await this.userData.getUserById(userId.id)

            const verifyPassword = await this.hashManager.compare(currentPassword, user.password)
            if(!verifyPassword) {
                throw new CustomError(422, "Incorrect password")
            }

            const hashPassword = await this.hashManager.hash(newPassword)

            await this.userData.editPassword(hashPassword, userId.id)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    deleteUser = async (token: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            const user = this.tokenManager.getTokenData(token)

            await this.userData.deleteUser(user.id)
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

}