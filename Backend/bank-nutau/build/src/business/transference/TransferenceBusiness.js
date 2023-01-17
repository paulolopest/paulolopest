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
exports.TransferenceBusiness = void 0;
const CustomError_1 = require("../../models/CustomError");
class TransferenceBusiness {
    constructor(transferenceData, tokenManager, idGenerator, userData) {
        this.transferenceData = transferenceData;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.userData = userData;
        this.creditTransference = (token, amount, username) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!amount) {
                    throw new CustomError_1.CustomError(400, 'Enter a value');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const verify = yield this.userData.getAccount(tokenData.id);
                if (!verify) {
                    throw new CustomError_1.CustomError(404, 'User fatal error, login again');
                }
                if (amount > verify.credit) {
                    throw new CustomError_1.CustomError(401, 'You have not this value');
                }
                const sender = yield this.userData.getUser(tokenData.id);
                if (!sender) {
                    throw new CustomError_1.CustomError(401, 'User fatal error, login again');
                }
                if (sender.username === username) {
                    throw new CustomError_1.CustomError(409, 'You can not transfer to yourself');
                }
                const receiver = yield this.userData.getUser(username);
                if (!receiver) {
                    throw new CustomError_1.CustomError(401, 'User not found');
                }
                const transferenceId = this.idGenerator.generate();
                yield this.transferenceData.creditTransference(transferenceId, sender.id, receiver.id, amount);
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
        this.debitTransference = (token, amount, username) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!amount) {
                    throw new CustomError_1.CustomError(400, 'Enter a value');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const verify = yield this.userData.getAccount(tokenData.id);
                if (!verify) {
                    throw new CustomError_1.CustomError(404, 'User fatal error, login again');
                }
                if (amount > verify.debit) {
                    throw new CustomError_1.CustomError(401, 'You have not this value');
                }
                const sender = yield this.userData.getUser(tokenData.id);
                if (!sender) {
                    throw new CustomError_1.CustomError(401, 'User fatal error, login again');
                }
                if (sender.username === username) {
                    throw new CustomError_1.CustomError(409, 'You can not transfer to yourself');
                }
                const receiver = yield this.userData.getUser(username);
                if (!receiver) {
                    throw new CustomError_1.CustomError(401, 'User not found');
                }
                const transferenceId = this.idGenerator.generate();
                yield this.transferenceData.debitTransference(transferenceId, sender.id, receiver.id, amount);
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
        this.getTransferenceHistory = (token, filter) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                const user = this.tokenManager.getTokenData(token);
                const result = yield this.transferenceData.getTransferenceHistory(user.id);
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
    }
}
exports.TransferenceBusiness = TransferenceBusiness;
//# sourceMappingURL=TransferenceBusiness.js.map