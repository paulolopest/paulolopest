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
const Date_1 = require("../services/Date");
const BaseDatabase_1 = require("./BaseDatabase");
class UserData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.tableName = "facewitter_users";
        this.signup = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName)
                    .insert({
                    id: user.getId(),
                    name: user.getName(),
                    nickname: user.getNickname(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    birth_date: user.getBirthDate(),
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getProfile = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .select("id", "name", "nickname", "email", "birth_date")
                    .where({ id: id });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.editUser = (userId, name, nickname, email, password, birthDate) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .update({
                    name,
                    nickname,
                    email,
                    password,
                    birthDate
                })
                    .where({ id: userId });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.editPassword = (password, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.tableName)
                    .update({ password: password })
                    .where({ id: id });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ id: id });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ email });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getUserByNick = (nickname) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection(this.tableName)
                    .where({ nickname: nickname });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("facewitter_posts")
                    .delete()
                    .where({ user_id: id });
                yield this.connection("facewitter_comments")
                    .delete()
                    .where({ user_id: id });
                yield this.connection("facewitter_shares")
                    .delete()
                    .where({ user_id: id });
                yield this.connection("facewitter_follows")
                    .delete()
                    .where({ user_id: id });
                yield this.connection(this.tableName)
                    .delete()
                    .where({ id: id });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.logout = (userId, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("facewitter_blockList")
                    .insert({
                    user_id: userId,
                    expires_in: Date_1.currentTime,
                    token
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