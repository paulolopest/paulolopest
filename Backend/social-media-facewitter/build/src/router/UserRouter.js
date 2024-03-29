"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const UserController_1 = require("../controller/UserController");
const TokenManager_1 = require("../services/TokenManager");
const UserBusiness_1 = require("../business/UserBusiness");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
const UserData_1 = require("../data/UserData");
const express_1 = __importDefault(require("express"));
const userBusiness = new UserBusiness_1.UserBusiness(new UserData_1.UserData(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new TokenManager_1.TokenManager());
const userController = new UserController_1.UserController(userBusiness);
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/profile", userController.getProfile);
exports.userRouter.post("/signup", userController.signup);
exports.userRouter.post("/login", userController.login);
exports.userRouter.post("/logout", userController.logout);
exports.userRouter.put("/user/edit", userController.editUser);
exports.userRouter.put("/profile/edit-password", userController.editPassword);
exports.userRouter.delete("/user/delete", userController.deleteUser);
//# sourceMappingURL=UserRouter.js.map