import { TransferenceBusiness } from '../../business/transference/TransferenceBusiness';
import { CustomError } from '../../models/CustomError';
import { Request, Response } from 'express';

export class TransferenceController {
	constructor(private transferenceBusiness: TransferenceBusiness) {}

	creditTransference = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { amount, username } = req.body;

			await this.transferenceBusiness.creditTransference(
				token,
				amount,
				username
			);

			res.status(201).send(`$${amount} transferred to ${username}`);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
