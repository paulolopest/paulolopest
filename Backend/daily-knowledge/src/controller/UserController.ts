import { UserBusiness } from '../business/UserBusiness';
import { Request, Response } from 'express';
import { CustomError } from '../models/CustomError';

export class UserController {
	constructor(private userBusiness: UserBusiness) {}

	signup = async (req: Request, res: Response) => {
		try {
			const { name, username, password } = req.body;
			await this.userBusiness.signup(name, username, password);

			res.status(200).send('User successfully created');
		} catch (error: unknown) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			}
		}
	};
}
