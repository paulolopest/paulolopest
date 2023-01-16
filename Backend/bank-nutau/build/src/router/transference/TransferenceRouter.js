"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferenceRouter = void 0;
const TransferenceController_1 = require("../../controller/transference/TransferenceController");
const TransferenceBusiness_1 = require("../../business/transference/TransferenceBusiness");
const TransferenceData_1 = require("../../data/transference/TransferenceData");
const TokenManager_1 = require("../../services/TokenManager");
const IdGenerator_1 = require("../../services/IdGenerator");
const CardData_1 = require("../../data/card/CardData");
const UserData_1 = require("../../data/user/UserData");
const express_1 = __importDefault(require("express"));
const transferenceBusiness = new TransferenceBusiness_1.TransferenceBusiness(new TransferenceData_1.TransferenceData(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new CardData_1.CardData(), new UserData_1.UserData());
const transferenceController = new TransferenceController_1.TransferenceController(transferenceBusiness);
exports.transferenceRouter = express_1.default.Router();
exports.transferenceRouter.post('/transference/credit', transferenceController.creditTransference);
//# sourceMappingURL=TransferenceRouter.js.map