import { TransferenceController } from '../../controller/transference/TransferenceController';
import { TransferenceBusiness } from '../../business/transference/TransferenceBusiness';
import { TransferenceData } from '../../data/transference/TransferenceData';
import { TokenManager } from '../../services/TokenManager';
import { IdGenerator } from '../../services/IdGenerator';
import { CardData } from '../../data/card/CardData';
import { UserData } from '../../data/user/UserData';
import express from 'express';

const transferenceBusiness = new TransferenceBusiness(
	new TransferenceData(),
	new TokenManager(),
	new IdGenerator(),
	new CardData(),
	new UserData()
);

const transferenceController = new TransferenceController(transferenceBusiness);

export const transferenceRouter = express.Router();

//

transferenceRouter.post(
	'/transference/credit',
	transferenceController.creditTransference
);
