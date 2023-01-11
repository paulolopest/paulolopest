import { IdGenerator } from '../../services/IdGenerator';
import { CustomError } from '../../models/CustomError';
import { UserData } from '../../data/user/UserData';
import { User } from '@prisma/client';

export class UserBusiness {
	constructor(private userData: UserData, private idGenerator: IdGenerator) {}

	signup = async (
		name: string,
		lastName: string,
		nickname: string,
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
			if (!nickname) {
				throw new CustomError(400, 'Enter a nickname');
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

			const verifyNickname: User | null = await this.userData.getUser(nickname);
			if (verifyNickname) {
				throw new CustomError(401, 'Nickname already in use');
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
			const accountId: string = this.idGenerator.generate();

			await this.userData.signup(
				id,
				name,
				lastName,
				nickname,
				email,
				password,
				cpf,
				accountId
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
