import { UserBusiness } from '../../business/user/UserBusiness';
import { CustomError } from '../../models/CustomError';
import { Request, Response } from 'express';

export class UserController {
	constructor(private userBusiness: UserBusiness) {}

	signup = async (req: Request, res: Response) => {
		try {
			const { name, lastName, username, email, password, cpf } = req.body;

			await this.userBusiness.signup(
				name,
				lastName,
				username,
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

	login = async (req: Request, res: Response) => {
		try {
			const { word, password } = req.body;

			const result: string = await this.userBusiness.login(password, word);

			res.status(200).send({ token: result });
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProfile = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const result = await this.userBusiness.getProfile(token);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editProfile = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { email, username } = req.body;

			await this.userBusiness.editProfile(token, email, username);

			res.status(200).send('Account update');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editPassword = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { currentPassword, newPassword } = req.body;

			await this.userBusiness.editPassword(token, currentPassword, newPassword);

			res.status(200).send('Password updated');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteUser = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			await this.userBusiness.deleteUser(token);

			res.status(200).send('Account deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
