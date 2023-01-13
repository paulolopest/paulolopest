import { CardController } from '../../controller/credit-card/CardController';
import { CardBusiness } from '../../business/credit-card/CardBusiness';
import { CardData } from '../../data/credit-card/CardData';
import { TokenManager } from '../../services/TokenManager';
import { IdGenerator } from '../../services/IdGenerator';
import { UserData } from '../../data/user/UserData';
import express, { Router } from 'express';

const cardBusiness: CardBusiness = new CardBusiness(
	new TokenManager(),
	new IdGenerator(),
	new CardData(),
	new UserData()
);

const cardController: CardController = new CardController(cardBusiness);

export const creditCRouter: Router = express.Router();

creditCRouter.post('/profile/create-card', cardController.create);

creditCRouter.get('/profile/my-card', cardController.getMyCard);

creditCRouter.delete('/profile/card/delete', cardController.deleteCard);
