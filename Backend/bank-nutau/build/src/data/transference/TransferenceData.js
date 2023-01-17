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
exports.TransferenceData = void 0;
const BaseDatabase_1 = require("../BaseDatabase");
class TransferenceData {
    constructor() {
        this.creditTransference = (id, senderId, receiverId, amount) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.transference.create({
                    data: {
                        id,
                        sender_id: senderId,
                        receiver_id: receiverId,
                        amount,
                    },
                });
                yield BaseDatabase_1.prismaClient.account.update({
                    where: {
                        user_id: senderId,
                    },
                    data: {
                        credit: {
                            decrement: amount,
                        },
                    },
                });
                yield BaseDatabase_1.prismaClient.account.update({
                    where: {
                        user_id: receiverId,
                    },
                    data: {
                        debit: {
                            increment: amount,
                        },
                    },
                });
                yield BaseDatabase_1.prismaClient.account_history.create({
                    data: {
                        id,
                        user_id: senderId,
                        amount,
                        type: 'CREDIT',
                        status: 'TRANSFERENCE',
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.debitTransference = (id, senderId, receiverId, amount) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.transference.create({
                    data: {
                        id,
                        sender_id: senderId,
                        receiver_id: receiverId,
                        amount,
                    },
                });
                yield BaseDatabase_1.prismaClient.account.update({
                    where: {
                        user_id: senderId,
                    },
                    data: {
                        debit: {
                            decrement: amount,
                        },
                    },
                });
                yield BaseDatabase_1.prismaClient.account.update({
                    where: {
                        user_id: receiverId,
                    },
                    data: {
                        debit: {
                            increment: amount,
                        },
                    },
                });
                yield BaseDatabase_1.prismaClient.account_history.create({
                    data: {
                        id,
                        user_id: senderId,
                        amount,
                        type: 'DEBIT',
                        status: 'TRANSFERENCE',
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getTransferenceHistory = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.transference.findMany({
                    where: {
                        OR: [
                            {
                                sender_id: id,
                            },
                            {
                                receiver_id: id,
                            },
                        ],
                    },
                    orderBy: {
                        created_at: 'desc',
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
exports.TransferenceData = TransferenceData;
//# sourceMappingURL=TransferenceData.js.map