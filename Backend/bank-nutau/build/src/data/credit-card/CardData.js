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
exports.CardData = void 0;
const BaseDatabase_1 = require("../BaseDatabase");
class CardData {
    constructor() {
        this.create = (id, userId, cardNumber, cvv, cardOwner, validateDate) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.credit_Card.create({
                    data: {
                        id,
                        user_id: userId,
                        card_number: cardNumber,
                        cvv,
                        card_owner: cardOwner,
                        validate_date: validateDate,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getMyCard = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = BaseDatabase_1.prismaClient.credit_Card.findFirst({
                    where: {
                        user_id: userId,
                    },
                    select: {
                        name: true,
                        card_owner: true,
                        card_number: true,
                        cvv: true,
                        validate_date: true,
                    },
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.deleteCard = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.credit_Card.delete({
                    where: {
                        user_id: userId,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.withdrawMoney = (id, amount, historyId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.account.update({
                    where: {
                        userId: id,
                    },
                    data: {
                        debit: { decrement: amount },
                    },
                });
                yield BaseDatabase_1.prismaClient.account_history.create({
                    data: {
                        id: historyId,
                        user_id: id,
                        amount,
                        status: 'EXIT',
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.depositMoney = (id, amount, historyId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.account.update({
                    where: {
                        userId: id,
                    },
                    data: {
                        debit: { increment: amount },
                    },
                });
                yield BaseDatabase_1.prismaClient.account_history.create({
                    data: {
                        id: historyId,
                        user_id: id,
                        amount,
                        status: 'ENTRANCE',
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.CardData = CardData;
//# sourceMappingURL=CardData.js.map