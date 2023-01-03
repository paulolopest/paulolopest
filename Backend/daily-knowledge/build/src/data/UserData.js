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
const BaseDatabase_1 = require("./BaseDatabase");
class UserData {
    constructor() {
        this.signup = (id, name, username, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.user.create({
                    data: {
                        id,
                        name,
                        username,
                        password,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getByUsername = (username) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.user.findUnique({
                    where: {
                        username,
                    },
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getProfile = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.user.findUnique({
                    where: { id: userId },
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.editPassword = (id, newPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.user.update({
                    where: {
                        id,
                    },
                    data: {
                        password: newPassword,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserData = UserData;
//# sourceMappingURL=UserData.js.map