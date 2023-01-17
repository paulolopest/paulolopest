import { CardBusiness } from '../../business/card/CardBusiness';
import { CustomError } from '../../models/CustomError';
import { Request, Response } from 'express';

export class CardController {
	constructor(private cardBusiness: CardBusiness) {}

	create = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			await this.cardBusiness.create(token);

			res.status(201).send('Card created');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getMyCard = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const result = await this.cardBusiness.getMyCard(token);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteCard = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			await this.cardBusiness.deleteCard(token);

			res.status(200).send('Credit card deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	//

	withdrawMoney = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { amount } = req.body;

			await this.cardBusiness.withdrawMoney(token, amount);

			res.status(200).send(`$${amount} debited`);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	depositMoney = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { amount } = req.body;

			await this.cardBusiness.depositMoney(token, amount);

			res.status(200).send(`$${amount} deposited`);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
