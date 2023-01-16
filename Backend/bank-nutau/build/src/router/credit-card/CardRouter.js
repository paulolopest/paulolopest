"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRouter = void 0;
const CardController_1 = require("../../controller/credit-card/CardController");
const CardBusiness_1 = require("../../business/credit-card/CardBusiness");
const CardData_1 = require("../../data/credit-card/CardData");
const TokenManager_1 = require("../../services/TokenManager");
const IdGenerator_1 = require("../../services/IdGenerator");
const UserData_1 = require("../../data/user/UserData");
const express_1 = __importDefault(require("express"));
const cardBusiness = new CardBusiness_1.CardBusiness(new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new CardData_1.CardData(), new UserData_1.UserData());
const cardController = new CardController_1.CardController(cardBusiness);
exports.cardRouter = express_1.default.Router();
exports.cardRouter.post('/profile/create-card', cardController.create);
exports.cardRouter.post('/profile/card/debit', cardController.withdrawMoney);
exports.cardRouter.post('/profile/card/deposit', cardController.depositMoney);
exports.cardRouter.get('/profile/my-card', cardController.getMyCard);
exports.cardRouter.delete('/profile/card/delete', cardController.deleteCard);
//# sourceMappingURL=CardRouter.js.map