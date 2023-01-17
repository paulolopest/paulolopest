import { CardController } from '../../controller/card/CardController';
import { CardBusiness } from '../../business/card/CardBusiness';
import { TokenManager } from '../../services/TokenManager';
import { IdGenerator } from '../../services/IdGenerator';
import { CardData } from '../../data/card/CardData';
import { UserData } from '../../data/user/UserData';
import express, { Router } from 'express';

const cardBusiness: CardBusiness = new CardBusiness(
	new TokenManager(),
	new IdGenerator(),
	new CardData(),
	new UserData()
);

const cardController: CardController = new CardController(cardBusiness);

export const cardRouter: Router = express.Router();

cardRouter.post('/profile/create-card', cardController.create);
cardRouter.put('/profile/card/debit', cardController.withdrawMoney);
cardRouter.put('/profile/card/deposit', cardController.depositMoney);

cardRouter.get('/profile/my-card', cardController.getMyCard);

cardRouter.delete('/profile/card/delete', cardController.deleteCard);
