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
class UserBusiness {
    constructor(userData, idGenerator, hashManager, tokenManager) {
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.signup = (name, username, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name) {
                    throw new CustomError_1.CustomError(400, 'Enter a name');
                }
                if (!username) {
                    throw new CustomError_1.CustomError(400, 'Enter a username');
                }
                if (!password) {
                    throw new CustomError_1.CustomError(400, 'Enter a password');
                }
                if (password.length < 8) {
                    throw new CustomError_1.CustomError(400, 'The password must contain 8 characters');
                }
                const verifyUsername = yield this.userData.getByUsername(username);
                if (verifyUsername) {
                    throw new CustomError_1.CustomError(401, 'Username already exists');
                }
                const hashPassword = yield this.hashManager.hash(password);
                const id = this.idGenerator.generate();
                yield this.userData.signup(id, name, username, hashPassword);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
        this.login = (username, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!username) {
                    throw new CustomError_1.CustomError(400, 'Enter a username');
                }
                if (!password) {
                    throw new CustomError_1.CustomError(400, 'Enter a password');
                }
                const user = yield this.userData.getByUsername(username);
                if (!user) {
                    throw new CustomError_1.CustomError(401, 'Invalid credentials');
                }
                const verifyPassword = yield this.hashManager.verify(password, user.password);
                if (!verifyPassword) {
                    throw new CustomError_1.CustomError(401, 'Invalid credentials');
                }
                const token = this.tokenManager.generate({ id: user.id });
                return token;
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
        this.getProfile = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getProfile(tokenData.id);
                return user;
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
        this.editPassword = (token, currentPassword, newPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!currentPassword) {
                    throw new CustomError_1.CustomError(400, 'Enter the current password');
                }
                if (!newPassword) {
                    throw new CustomError_1.CustomError(400, 'Enter the new password');
                }
                if (newPassword.length < 8) {
                    throw new CustomError_1.CustomError(400, 'The password must contain 8 characters');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUserById(tokenData.id);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'Fatal error');
                }
                const verifyCurrentPassword = yield this.hashManager.verify(currentPassword, user.password);
                if (!verifyCurrentPassword) {
                    throw new CustomError_1.CustomError(401, 'Incorrect password');
                }
                const hashPassword = yield this.hashManager.hash(newPassword);
                yield this.userData.editPassword(tokenData.id, hashPassword);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
        this.editUsername = (token, newUsername) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!newUsername) {
                    throw new CustomError_1.CustomError(400, 'Enter a username');
                }
                const verifyUsername = yield this.userData.getByUsername(newUsername);
                if (verifyUsername) {
                    throw new CustomError_1.CustomError(401, 'Username already in use');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                yield this.userData.editUsername(tokenData.id, newUsername);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
        this.deleteUser = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                yield this.userData.deleteUser(tokenData.id);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    throw new CustomError_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map