"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const CustomError_1 = require("../models/CustomError");
const User_1 = require("../models/User");
class UserBusiness {
    constructor(userData, idGenerator, hashManager, tokenManager) {
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.signup = (name, email, password, birthDate) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name) {
                    throw new CustomError_1.CustomError(422, "Enter a name");
                }
                if (!email) {
                    throw new CustomError_1.CustomError(422, "Enter a email");
                }
                else if (email.indexOf("@") === -1) {
                    throw new CustomError_1.CustomError(422, "Invalid email");
                }
                if (!password) {
                    throw new CustomError_1.CustomError(422, "Enter a password");
                }
                else if (password.length <= 6) {
                    throw new CustomError_1.CustomError(422, "Password must contain more than 6 characters");
                }
                if (!birthDate) {
                    throw new CustomError_1.CustomError(422, "Enter a birth date");
                }
                const id = this.idGenerator.generate();
                const token = this.tokenManager.generate({ id });
                yield this.userData.signup(new User_1.User(id, name, email, password, birthDate));
                return token;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map