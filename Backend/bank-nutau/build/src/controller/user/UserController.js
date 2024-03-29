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
exports.UserController = void 0;
const CustomError_1 = require("../../models/CustomError");
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, lastName, username, email, password, cpf } = req.body;
                yield this.userBusiness.signup(name, lastName, username, email, password, cpf);
                res.status(201).send('Account created');
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { word, password } = req.body;
                const result = yield this.userBusiness.login(password, word);
                res.status(200).send({ token: result });
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield this.userBusiness.getProfile(token);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.editProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { email, username } = req.body;
                yield this.userBusiness.editProfile(token, email, username);
                res.status(200).send('Account update');
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.editPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { currentPassword, newPassword } = req.body;
                yield this.userBusiness.editPassword(token, currentPassword, newPassword);
                res.status(200).send('Password updated');
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                yield this.userBusiness.deleteUser(token);
                res.status(200).send('Account deleted');
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map