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
exports.CardController = void 0;
const CustomError_1 = require("../../models/CustomError");
class CardController {
    constructor(cardBusiness) {
        this.cardBusiness = cardBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                yield this.cardBusiness.create(token);
                res.status(201).send('Card created');
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
        this.getMyCard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield this.cardBusiness.getMyCard(token);
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
        this.deleteCard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                yield this.cardBusiness.deleteCard(token);
                res.status(200).send('Credit card deleted');
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
        this.withdrawMoney = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { amount } = req.body;
                yield this.cardBusiness.withdrawMoney(token, amount);
                res.status(200).send(`$${amount} debited`);
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
        this.depositMoney = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { amount } = req.body;
                yield this.cardBusiness.depositMoney(token, amount);
                res.status(200).send(`$${amount} deposited`);
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
exports.CardController = CardController;
//# sourceMappingURL=CardController.js.map