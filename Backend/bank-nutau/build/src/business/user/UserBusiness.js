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
    constructor(userData, idGenerator) {
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.signup = (name, lastName, nickname, email, password, cpf) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name) {
                    throw new CustomError_1.CustomError(400, 'Enter a name');
                }
                if (!lastName) {
                    throw new CustomError_1.CustomError(400, 'Enter a last name');
                }
                if (!nickname) {
                    throw new CustomError_1.CustomError(400, 'Enter a nickname');
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
                const verifyNickname = yield this.userData.getUser(nickname);
                if (verifyNickname) {
                    throw new CustomError_1.CustomError(401, 'Nickname already in use');
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
                const accountId = this.idGenerator.generate();
                yield this.userData.signup(id, name, lastName, nickname, email, password, cpf, accountId);
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