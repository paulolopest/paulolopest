import { UserBusiness } from '../business/UserBusiness';
import { CustomError } from '../models/CustomError';
import { Request, Response } from 'express';

export class UserController {
	constructor(private userBusiness: UserBusiness) {}

	signup = async (req: Request, res: Response) => {
		try {
			const { name, username, password } = req.body;
			await this.userBusiness.signup(name, username, password);

			res.status(201).send('User successfully created');
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
			const { username, password } = req.body;
			const result: string | undefined = await this.userBusiness.login(
				username,
				password
			);

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

	editUsername = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { newUsername } = req.body;

			await this.userBusiness.editUsername(token, newUsername);

			res.status(200).send(`Username updated to ${newUsername}`);
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

			res.status(200).send('User deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
