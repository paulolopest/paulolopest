import express, { Router } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserData } from "../data/UserData"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

const userBusiness: UserBusiness =  new UserBusiness(
    new UserData(),
    new IdGenerator(),
    new HashManager(),
    new TokenManager()
)
const userController: UserController = new UserController(userBusiness)

export const userRouter: Router = express.Router()

// Routes

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.put("/:user-id/edit", userController.editUser)
userRouter.put("/user-id/edit-password", userController.editPassword)
userRouter.delete("/:user-id/delete", userController.deleteUser)