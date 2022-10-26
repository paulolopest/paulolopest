import { AuthenticationData } from "../models/AuthenticationData";
import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { CustomError } from "../models/CustomError";
import { UserData } from "../data/UserData";
import { User } from "../models/User";

export class UserBusiness {
    constructor (
        private userData: UserData,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager,
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

            const verifyEmail: Boolean = await this.userData.getUserByEmail(email)
            if(verifyEmail) {
                throw new CustomError(409, "Email already registered")
            }

            const verifyNick: Boolean = await this.userData.getUserByNick(nickname)
            if(verifyNick) {
                throw new CustomError(409, "Nickname already registered")
            }

            const id: string = this.idGenerator.generate()
            const token: string = this.tokenManager.generate({id})
            const hashPassword: string = await this.hashManager.hash(password)

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

    logout = async (token: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }

            const user: AuthenticationData = this.tokenManager.getTokenData(token)

            await this.userData.logout(user.id, token)

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    getProfile = async (token: string) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login First")
            }
            
            const user: AuthenticationData = this.tokenManager.getTokenData(token)
            const verify: Boolean = await this.userData.getUserById(user.id)
            if(!verify) {
                throw new CustomError(400, "User not found")
            }

            const response = await this.userData.getProfile(user.id)

            return response

        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

    editUser = async (token: string, name?: string, nickname?: string, email?: string, password?: string, birthDate?: Date) => {
        try {
            if(!token) {
                throw new CustomError(401, "Login first")
            }
            const user: AuthenticationData = this.tokenManager.getTokenData(token)

            await this.userData.editUser(user.id, name, nickname, email, password, birthDate)
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

            const userId: AuthenticationData = this.tokenManager.getTokenData(token)
            const user = await this.userData.getUserById(userId.id)

            const verifyPassword: Boolean = await this.hashManager.compare(currentPassword, user.password)
            if(!verifyPassword) {
                throw new CustomError(422, "Incorrect password")
            }

            const hashPassword: string = await this.hashManager.hash(newPassword)

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
            
            // const verifyToken: boolean = await this.tokenManager.verifyToken(token)
            // if(verifyToken === true) {
            //     throw new CustomError(401, "Invalid Token")
            // }
            const user: AuthenticationData = this.tokenManager.getTokenData(token)

            await this.userData.deleteUser(user.id)
            
        } catch (error:any) {
            throw new CustomError(404, error.message)
        }
    }

}