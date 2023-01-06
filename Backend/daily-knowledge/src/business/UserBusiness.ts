import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';
import { CustomError } from '../models/CustomError';
import { UserData } from '../data/UserData';
import { User } from '@prisma/client';

export class UserBusiness {
	constructor(
		private userData: UserData,
		private idGenerator: IdGenerator,
		private hashManager: HashManager,
		private tokenManager: TokenManager
	) {}

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

			const verifyUsername: User | null = await this.userData.getByUsername(
				username
			);
			if (verifyUsername) {
				throw new CustomError(401, 'Username already exists');
			}

			const hashPassword: string = await this.hashManager.hash(password);

			const id: string = this.idGenerator.generate();

			await this.userData.signup(id, name, username, hashPassword);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	login = async (username: string, password: string) => {
		try {
			if (!username) {
				throw new CustomError(400, 'Enter a username');
			}
			if (!password) {
				throw new CustomError(400, 'Enter a password');
			}

			const user: User | null = await this.userData.getByUsername(username);
			if (!user) {
				throw new CustomError(401, 'Invalid credentials');
			}

			const verifyPassword: boolean = await this.hashManager.verify(
				password,
				user.password
			);

			if (!verifyPassword) {
				throw new CustomError(401, 'Invalid credentials');
			}

			const token = this.tokenManager.generate({ id: user.id });

			return token;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getProfile = async (token: string) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}

			const tokenData = this.tokenManager.getTokenData(token);

			const user = await this.userData.getProfile(tokenData.id);

			return user;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	editPassword = async (
		token: string,
		currentPassword: string,
		newPassword: string
	) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!currentPassword) {
				throw new CustomError(400, 'Enter the current password');
			}
			if (!newPassword) {
				throw new CustomError(400, 'Enter the new password');
			}
			if (newPassword.length < 8) {
				throw new CustomError(400, 'The password must contain 8 characters');
			}

			const tokenData = this.tokenManager.getTokenData(token);

			const user = await this.userData.getUserById(tokenData.id);
			if (!user) {
				throw new CustomError(404, 'Fatal error');
			}

			const verifyCurrentPassword = await this.hashManager.verify(
				currentPassword,
				user.password
			);

			if (!verifyCurrentPassword) {
				throw new CustomError(401, 'Incorrect password');
			}

			const hashPassword = await this.hashManager.hash(newPassword);

			await this.userData.editPassword(tokenData.id, hashPassword);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	editUsername = async (token: string, newUsername: string) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!newUsername) {
				throw new CustomError(400, 'Enter a username');
			}

			const verifyUsername = await this.userData.getByUsername(newUsername);
			if (verifyUsername) {
				throw new CustomError(401, 'Username already in use');
			}

			const tokenData = this.tokenManager.getTokenData(token);

			await this.userData.editUsername(tokenData.id, newUsername);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteUser = async (token: string) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}

			const tokenData = this.tokenManager.getTokenData(token);

			await this.userData.deleteUser(tokenData.id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	//
}
