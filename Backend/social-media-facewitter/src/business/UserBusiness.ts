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

    signup = async(name: string, email: string, password: string, birthDate: Date): Promise<string> => {
        try {
            if(!name) {
                throw new CustomError(422, "Enter a name")
            }
            if(!email) {
                throw new CustomError(422, "Enter a email")
            } else if(email.indexOf("@") === -1) {
                throw new CustomError(422, "Invalid email")
            } else if(email.indexOf(".com") === -1) {
                throw new CustomError(422, "Invalid email")
            }
            if(!password) {
                throw new CustomError(422, "Enter a password")
            } else if(password.length <= 6) {
                throw new CustomError(422, "Password must contain more than 6 characters")
            }
            if(!birthDate) {
                throw new CustomError(422, "Enter a birth date")
            }

            const user = await this.userData.getUserByEmail(email)

            if(user) {
                throw new CustomError(409, "Email already exist")
            }

            const id = this.idGenerator.generate()
            const token: string = this.tokenManager.generate({id})
            const hashPassword = await this.hashManager.hash(password)

            await this.userData.signup(
                new User(
                    id,
                    name,
                    email,
                    hashPassword,
                    birthDate
                )
            )

            return token
        } catch (error:any) {
            throw new Error(error.message)
        }  
    }
}