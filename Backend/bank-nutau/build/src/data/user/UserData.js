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
exports.UserData = void 0;
const BaseDatabase_1 = require("../BaseDatabase");
class UserData {
    constructor() {
        this.signup = (id, name, lastName, nickname, email, password, cpf, accountId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.user.create({
                    data: {
                        id,
                        name,
                        last_name: lastName,
                        nickname,
                        email,
                        password,
                        cpf,
                        account_id: accountId,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getUser = (nickname, email, cpf) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.user.findFirst({
                    where: {
                        OR: [
                            {
                                nickname: nickname,
                            },
                            {
                                email: email,
                            },
                            {
                                cpf: cpf,
                            },
                        ],
                    },
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserData = UserData;
//# sourceMappingURL=UserData.js.map