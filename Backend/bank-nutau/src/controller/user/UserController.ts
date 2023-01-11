import { UserBusiness } from '../../business/user/UserBusiness';
import { Request, Response } from 'express';
import { CustomError } from '../../models/CustomError';

export class UserController {
	constructor(private userBusiness: UserBusiness) {}

	signup = async (req: Request, res: Response) => {
		try {
			const { name, lastName, nickname, email, password, cpf } = req.body;

			await this.userBusiness.signup(
				name,
				lastName,
				nickname,
				email,
				password,
				cpf
			);

			res.status(201).send('Account created');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
