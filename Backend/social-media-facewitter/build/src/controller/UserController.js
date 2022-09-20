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
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, nickname, email, password, birthDate } = req.body;
                const response = yield this.userBusiness.signup(name, nickname, email, password, birthDate);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield this.userBusiness.login(email, password);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                yield this.userBusiness.deleteUser(token);
                res.send("User deleted");
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
        this.editUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, birthDate } = req.body;
            }
            catch (error) {
                res.status(404).send(error.sqlMessage || error.message);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map