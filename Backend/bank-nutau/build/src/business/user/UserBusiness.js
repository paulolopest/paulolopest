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
const CustomError_1 = require("../../models/CustomError");
class UserBusiness {
    constructor(userData, idGenerator, hashManager, tokenManager) {
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.signup = (name, lastName, username, email, password, cpf) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name) {
                    throw new CustomError_1.CustomError(400, 'Enter a name');
                }
                if (!lastName) {
                    throw new CustomError_1.CustomError(400, 'Enter a last name');
                }
                if (!username) {
                    throw new CustomError_1.CustomError(400, 'Enter a username');
                }
                if (!email) {
                    throw new CustomError_1.CustomError(400, 'Enter an email');
                }
                if (!password) {
                    throw new CustomError_1.CustomError(400, 'Enter a password');
                }
                if (!cpf) {
                    throw new CustomError_1.CustomError(400, 'Enter a cpf');
                }
                if (password.length < 8) {
                    throw new CustomError_1.CustomError(401, 'The password must contain at least 8 characters');
                }
                if (cpf.length != 11) {
                    throw new CustomError_1.CustomError(401, 'The CPF must contain 11 characters');
                }
                const verifyUsername = yield this.userData.getUser(username);
                if (verifyUsername) {
                    throw new CustomError_1.CustomError(401, 'username already in use');
                }
                const verifyEmail = yield this.userData.getUser(email);
                if (verifyEmail) {
                    throw new CustomError_1.CustomError(401, 'Email already registered');
                }
                const verifyCpf = yield this.userData.getUser(cpf);
                if (verifyCpf) {
                    throw new CustomError_1.CustomError(401, 'CPF already registered');
                }
                const id = this.idGenerator.generate();
                const hashPassword = yield this.hashManager.hash(password);
                yield this.userData.signup(id, name, lastName, username, email, hashPassword, cpf);
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
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email) {
                    throw new CustomError_1.CustomError(400, 'Enter an email');
                }
                if (!password) {
                    throw new CustomError_1.CustomError(400, 'Enter a password');
                }
                const user = yield this.userData.getUser(email);
                if (!user) {
                    throw new CustomError_1.CustomError(401, 'Account not found');
                }
                const verifyPassword = yield this.hashManager.verify(password, user.password);
                if (!verifyPassword) {
                    throw new CustomError_1.CustomError(401, 'Incorrect password');
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
                const result = yield this.userData.getProfile(tokenData.id);
                return result;
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
                    throw new CustomError_1.CustomError(400, 'Enter a new password');
                }
                if (newPassword.length < 8) {
                    throw new CustomError_1.CustomError(400, 'The password must contain at least 8 characters');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUser(tokenData.id);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'User fatal error');
                }
                const verifyPassword = yield this.hashManager.verify(currentPassword, user.password);
                if (!verifyPassword) {
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
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map