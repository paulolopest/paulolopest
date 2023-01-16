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
exports.CardBusiness = void 0;
const CustomError_1 = require("../../models/CustomError");
class CardBusiness {
    constructor(tokenManager, idGenerator, cardData, userData) {
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.cardData = cardData;
        this.userData = userData;
        this.create = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUser(tokenData.id);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'User fatal error');
                }
                const id = this.idGenerator.generate();
                function generateRan(number) {
                    var max = number;
                    let random = [];
                    for (var i = 0; i < max; i++) {
                        var temp = Math.floor(Math.random() * max);
                        if (random.indexOf(temp) == -1) {
                            random.push(temp);
                        }
                        else
                            i--;
                    }
                    return random.join('');
                }
                const cardNumber = [generateRan(9), generateRan(7)]
                    .join('')
                    .replace('0', '5');
                const cvv = Number(generateRan(3).replace('0', '7'));
                const cardOwner = `${user.name} ${user.last_name}`;
                const date = new Date();
                const validateDate = `${date.getUTCMonth() + 1}/${date.getFullYear() + 10}`;
                yield this.cardData.create(id, tokenData.id, cardNumber.toString(), cvv, cardOwner, validateDate);
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
        this.getMyCard = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                const tokenData = this.tokenManager.getTokenData(token);
                const result = yield this.cardData.getMyCard(tokenData.id);
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
        this.deleteCard = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                const user = this.tokenManager.getTokenData(token);
                yield this.cardData.deleteCard(user.id);
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
        this.withdrawMoney = (token, amount) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!amount) {
                    throw new CustomError_1.CustomError(400, 'Enter a value');
                }
                const user = this.tokenManager.getTokenData(token);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'User fatal error, login again');
                }
                const balance = yield this.userData.getAccount(user.id);
                if (!balance) {
                    throw new CustomError_1.CustomError(404, 'User fatal error, login again');
                }
                if (amount > balance.debit) {
                    throw new CustomError_1.CustomError(401, 'Amount greater than your balance');
                }
                const historyId = this.idGenerator.generate();
                yield this.cardData.withdrawMoney(user.id, amount, historyId);
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
        this.depositMoney = (token, amount) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Login first');
                }
                if (!amount) {
                    throw new CustomError_1.CustomError(400, 'Enter a value');
                }
                const user = this.tokenManager.getTokenData(token);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'User fatal error, login again');
                }
                const historyId = this.idGenerator.generate();
                yield this.cardData.depositMoney(user.id, amount, historyId);
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
exports.CardBusiness = CardBusiness;
//# sourceMappingURL=CardBusiness.js.map