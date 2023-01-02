import { UserData } from '../data/UserData';
import { CustomError } from '../models/CustomError';
import { IdGenerator } from '../services/IdGenerator';

export class UserBusiness {
	constructor(private userData: UserData, private idGenerator: IdGenerator) {}

	signup = async (name: string, username: string, password: string) => {
		try {
			if (!name) {
				throw new CustomError(400, 'Enter a name');
			}
			if (!username) {
				throw new CustomError(400, 'Enter a username');
			}
			if (!password) {
				throw new CustomError(400, 'Enter a password');
			}
			if (password.length < 8) {
				throw new CustomError(400, 'The password must contain 8 characters');
			}

			const verifyUsername = await this.userData.getByUsername(username);

			if (verifyUsername) {
				throw new CustomError(401, 'Username already exists');
			}

			const id = this.idGenerator.generate();

			await this.userData.signup(id, name, username, password);
		} catch (error: unknown) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			}
		}
	};
}
