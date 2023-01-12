import { AuthenticationData } from '../../models/AuthenticationData';
import { TokenManager } from '../../services/TokenManager';
import { IdGenerator } from '../../services/IdGenerator';
import { HashManager } from '../../services/HashManager';
import { CustomError } from '../../models/CustomError';
import { UserData } from '../../data/user/UserData';
import { User } from '@prisma/client';

export class UserBusiness {
	constructor(
		private userData: UserData,
		private idGenerator: IdGenerator,
		private hashManager: HashManager,
		private tokenManager: TokenManager
	) {}

	signup = async (
		name: string,
		lastName: string,
		username: string,
		email: string,
		password: string,
		cpf: string
	) => {
		try {
			if (!name) {
				throw new CustomError(400, 'Enter a name');
			}
			if (!lastName) {
				throw new CustomError(400, 'Enter a last name');
			}
			if (!username) {
				throw new CustomError(400, 'Enter a username');
			}
			if (!email) {
				throw new CustomError(400, 'Enter an email');
			}
			if (!password) {
				throw new CustomError(400, 'Enter a password');
			}
			if (!cpf) {
				throw new CustomError(400, 'Enter a cpf');
			}
			if (password.length < 8) {
				throw new CustomError(
					401,
					'The password must contain at least 8 characters'
				);
			}
			if (cpf.length != 11) {
				throw new CustomError(401, 'The CPF must contain 11 characters');
			}

			const verifyUsername: User | null = await this.userData.getUser(username);
			if (verifyUsername) {
				throw new CustomError(401, 'username already in use');
			}

			const verifyEmail: User | null = await this.userData.getUser(email);
			if (verifyEmail) {
				throw new CustomError(401, 'Email already registered');
			}

			const verifyCpf: User | null = await this.userData.getUser(cpf);
			if (verifyCpf) {
				throw new CustomError(401, 'CPF already registered');
			}

			const id: string = this.idGenerator.generate();

			const hashPassword: string = await this.hashManager.hash(password);

			await this.userData.signup(
				id,
				name,
				lastName,
				username,
				email,
				hashPassword,
				cpf
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	login = async (email: string, password: string) => {
		try {
			if (!email) {
				throw new CustomError(400, 'Enter an email');
			}
			if (!password) {
				throw new CustomError(400, 'Enter a password');
			}

			const user: User | null = await this.userData.getUser(email);
			if (!user) {
				throw new CustomError(401, 'Account not found');
			}

			const verifyPassword: boolean = await this.hashManager.verify(
				password,
				user.password
			);
			if (!verifyPassword) {
				throw new CustomError(401, 'Incorrect password');
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

			const tokenData: AuthenticationData =
				this.tokenManager.getTokenData(token);

			const result = await this.userData.getProfile(tokenData.id);

			return result;
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
				throw new CustomError(400, 'Enter a new password');
			}
			if (newPassword.length < 8) {
				throw new CustomError(
					400,
					'The password must contain at least 8 characters'
				);
			}

			const tokenData: AuthenticationData =
				this.tokenManager.getTokenData(token);

			const user: User | null = await this.userData.getUser(tokenData.id);
			if (!user) {
				throw new CustomError(404, 'User fatal error');
			}

			const verifyPassword: boolean = await this.hashManager.verify(
				currentPassword,
				user.password
			);

			if (!verifyPassword) {
				throw new CustomError(401, 'Incorrect password');
			}

			const hashPassword: string = await this.hashManager.hash(newPassword);

			await this.userData.editPassword(tokenData.id, hashPassword);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
