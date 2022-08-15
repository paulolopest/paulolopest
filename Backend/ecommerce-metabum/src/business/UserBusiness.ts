import { authenticator, hashManager, idGenerator, userData } from "../models/Classes"

export class UserBusiness {
    signup = async(name: string, email: string, cpf: string, password: string) => {
        if(!name) {
            throw new Error("Enter a name")
        }
        if(!email) {
            throw new Error("Enter an email")
        } else if (email.indexOf("@") === -1) {
            throw new Error("The email must contain an @")
        }

        const user = await userData.getUserByEmail(email)
        if(user) {
            throw new Error("User already exist")
        }

        if(!cpf) {
            throw new Error("Enter a CPF")
        }
        const cpfVerify = await userData.getUserByCpf(cpf)
        if(cpfVerify) {
            throw new Error("The cpf is already registered")
        }

        if(cpf.length != 11) {
            throw new Error("The CPF must be longer than 11 characters")
        }
        if(!password) {
            throw new Error("Enter a password")
        } else if (password.length < 6) {
            throw new Error("The password must be longer than 6 characteres")
        }

        const id: string = idGenerator.generateId()
        const cypherPassword = await hashManager.generateHash(password)

        await userData.signup({
            id: id,
            name: name,
            email: email,
            cpf: cpf,
            password: cypherPassword
        })

        const token = authenticator.generateToken({id: id})

        return token
    }

    login = async(email: string, password: string) => {
        if(!email) {
            throw new Error("Enter a email")
        }
        if(!password) {
            throw new Error("Invalid password")
        } else if (password.length < 6) {
            throw new Error("Invalid password")
        }

        const user = await userData.getUserByEmail(email)
        if(!user) {
            throw new Error("Account does not exist")
        }

        const validatePassword = await hashManager.compareHash(password, user.password)
        if(!validatePassword) {
            throw new Error("Incorrect password")
        }

        const token = authenticator.generateToken({id: user.id})

        return token
    }

    getProfile = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        const userId = authenticator.getTokenData(token)

        const response = await userData.getProfile(userId.id)

        return response
    }

    editProfileName = async(token: string, name: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!name) {
            throw new Error("Enter a name")
        }

        const userId = authenticator.getTokenData(token)

        await userData.editProfileName(userId.id, name)
    }

    deleteUser = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }

        const userId = authenticator.getTokenData(token)

        const response = await userData.deleteUser(userId.id)
    }
}