"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserBusiness_1 = require("../../business/user/UserBusiness");
const UserController_1 = require("../../controller/user/UserController");
const UserData_1 = require("../../data/user/UserData");
const IdGenerator_1 = require("../../services/IdGenerator");
const userBusiness = new UserBusiness_1.UserBusiness(new UserData_1.UserData(), new IdGenerator_1.IdGenerator());
const userController = new UserController_1.UserController(userBusiness);
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/signup', userController.signup);
//# sourceMappingURL=UserRouter.js.map