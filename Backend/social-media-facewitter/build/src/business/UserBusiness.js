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
        this.signup = (name, nickname, email, password, birthDate) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name) {
                    throw new CustomError_1.CustomError(400, "Enter a name");
                }
                if (!nickname) {
                    throw new CustomError_1.CustomError(400, "Enter a nickname");
                }
                if (!email) {
                    throw new CustomError_1.CustomError(400, "Enter an email");
                }
                else if (email.indexOf("@") === -1) {
                    throw new CustomError_1.CustomError(400, "Invalid email");
                }
                else if (email.indexOf(".com") === -1) {
                    throw new CustomError_1.CustomError(400, "Invalid email");
                }
                if (!password) {
                    throw new CustomError_1.CustomError(400, "Enter a password");
                }
                else if (password.length <= 6) {
                    throw new CustomError_1.CustomError(400, "Password must contain more than 6 characters");
                }
                if (!birthDate) {
                    throw new CustomError_1.CustomError(400, "Enter a birth date");
                }
                const verifyEmail = yield this.userData.getUserByEmail(email);
                if (verifyEmail) {
                    throw new CustomError_1.CustomError(409, "Email already registered");
                }
                const verifyNick = yield this.userData.getUserByNick(nickname);
                if (verifyNick) {
                    throw new CustomError_1.CustomError(409, "Nickname already registered");
                }
                const id = this.idGenerator.generate();
                const token = this.tokenManager.generate({ id });
                const hashPassword = yield this.hashManager.hash(password);
                yield this.userData.signup(new User_1.User(id, name, nickname, email, hashPassword, birthDate));
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email) {
                    throw new CustomError_1.CustomError(400, "Enter an email");
                }
                else if (email.indexOf("@") === -1) {
                    throw new CustomError_1.CustomError(400, "Invalid email");
                }
                else if (email.indexOf(".com") === -1) {
                    throw new CustomError_1.CustomError(400, "Invalid email");
                }
                if (!password) {
                    throw new CustomError_1.CustomError(400, "Invalid password");
                }
                else if (password.length <= 6) {
                    throw new CustomError_1.CustomError(400, "Invalid password");
                }
                const user = yield this.userData.getUserByEmail(email);
                if (!user) {
                    throw new CustomError_1.CustomError(406, "User not found");
                }
                const verifyPassword = yield this.hashManager.compare(password, user.password);
                if (!verifyPassword) {
                    throw new CustomError_1.CustomError(422, "Incorrect password");
                }
                const token = this.tokenManager.generate({ id: user.id });
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.logout = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                const user = this.tokenManager.getTokenData(token);
                yield this.userData.logout(user.id, token);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getProfile = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login First");
                }
                const user = this.tokenManager.getTokenData(token);
                const verify = yield this.userData.getUserById(user.id);
                if (!verify) {
                    throw new CustomError_1.CustomError(400, "User not found");
                }
                const response = yield this.userData.getProfile(user.id);
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.editUser = (token, name, nickname, email, password, birthDate) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                const user = this.tokenManager.getTokenData(token);
                yield this.userData.editUser(user.id, name, nickname, email, password, birthDate);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.editPassword = (currentPassword, newPassword, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                if (!currentPassword) {
                    throw new CustomError_1.CustomError(400, "Enter your current password");
                }
                if (!currentPassword) {
                    throw new CustomError_1.CustomError(400, "Enter your new password");
                }
                else if (currentPassword.length <= 6) {
                    throw new CustomError_1.CustomError(400, "Password must contain more than 6 characters");
                }
                if (newPassword === currentPassword) {
                    throw new CustomError_1.CustomError(406, "The password cannot be the same");
                }
                const userId = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUserById(userId.id);
                const verifyPassword = yield this.hashManager.compare(currentPassword, user.password);
                if (!verifyPassword) {
                    throw new CustomError_1.CustomError(422, "Incorrect password");
                }
                const hashPassword = yield this.hashManager.hash(newPassword);
                yield this.userData.editPassword(hashPassword, userId.id);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.deleteUser = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, "Login first");
                }
                const user = this.tokenManager.getTokenData(token);
                const verify = yield this.userData.getUserById(user.id);
                if (!verify) {
                    throw new CustomError_1.CustomError(400, "User not exist");
                }
                yield this.userData.deleteUser(user.id);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map