import { UserController } from "../controller/UserController"
import { TokenManager } from "../services/TokenManager"
import { UserBusiness } from "../business/UserBusiness"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { UserData } from "../data/UserData"
import express, { Router } from "express"

const userBusiness: UserBusiness =  new UserBusiness(
    new UserData(),
    new IdGenerator(),
    new HashManager(),
    new TokenManager()
)
const userController: UserController = new UserController(userBusiness)

export const userRouter: Router = express.Router()

// Routes

userRouter.get("/profile", userController.getProfile)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.post("/logout", userController.logout)
userRouter.put("/:user-id/edit", userController.editUser)
userRouter.put("/user-id/edit-password", userController.editPassword)
userRouter.delete("/user/delete", userController.deleteUser)