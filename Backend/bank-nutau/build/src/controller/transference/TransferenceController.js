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
exports.TransferenceController = void 0;
const CustomError_1 = require("../../models/CustomError");
class TransferenceController {
    constructor(transferenceBusiness) {
        this.transferenceBusiness = transferenceBusiness;
        this.creditTransference = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { amount, username } = req.body;
                yield this.transferenceBusiness.creditTransference(token, amount, username);
                res.status(201).send(`$${amount} transferred to ${username}`);
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
        this.debitTransference = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { amount, username } = req.body;
                yield this.transferenceBusiness.debitTransference(token, amount, username);
                res.status(201).send(`$${amount} transferred to ${username}`);
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
        this.getTransferenceHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield this.transferenceBusiness.getTransferenceHistory(token);
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
    }
}
exports.TransferenceController = TransferenceController;
//# sourceMappingURL=TransferenceController.js.map