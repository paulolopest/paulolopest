import { TransferenceData } from '../../data/transference/TransferenceData';
import { AuthenticationData } from '../../models/AuthenticationData';
import { Account, Transference, User } from '@prisma/client';
import { TokenManager } from '../../services/TokenManager';
import { IdGenerator } from '../../services/IdGenerator';
import { CustomError } from '../../models/CustomError';
import { UserData } from '../../data/user/UserData';

export class TransferenceBusiness {
	constructor(
		private transferenceData: TransferenceData,
		private tokenManager: TokenManager,
		private idGenerator: IdGenerator,
		private userData: UserData
	) {}

	creditTransference = async (
		token: string,
		amount: number,
		username: string
	) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!amount) {
				throw new CustomError(400, 'Enter a value');
			}

			const tokenData: AuthenticationData =
				this.tokenManager.getTokenData(token);

			const verify: Account | null = await this.userData.getAccount(
				tokenData.id
			);
			if (!verify) {
				throw new CustomError(404, 'User fatal error, login again');
			}

			if (amount > verify.credit) {
				throw new CustomError(401, 'You have not this value');
			}

			const sender: User | null = await this.userData.getUser(tokenData.id);
			if (!sender) {
				throw new CustomError(401, 'User fatal error, login again');
			}
			if (sender.username === username) {
				throw new CustomError(409, 'You can not transfer to yourself');
			}

			const receiver: User | null = await this.userData.getUser(username);
			if (!receiver) {
				throw new CustomError(401, 'User not found');
			}

			const transferenceId: string = this.idGenerator.generate();

			await this.transferenceData.creditTransference(
				transferenceId,
				sender.id,
				receiver.id,
				amount
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	debitTransference = async (
		token: string,
		amount: number,
		username: string
	) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!amount) {
				throw new CustomError(400, 'Enter a value');
			}

			const tokenData: AuthenticationData =
				this.tokenManager.getTokenData(token);

			const verify: Account | null = await this.userData.getAccount(
				tokenData.id
			);
			if (!verify) {
				throw new CustomError(404, 'User fatal error, login again');
			}

			if (amount > verify.debit) {
				throw new CustomError(401, 'You have not this value');
			}

			const sender: User | null = await this.userData.getUser(tokenData.id);
			if (!sender) {
				throw new CustomError(401, 'User fatal error, login again');
			}
			if (sender.username === username) {
				throw new CustomError(409, 'You can not transfer to yourself');
			}

			const receiver: User | null = await this.userData.getUser(username);
			if (!receiver) {
				throw new CustomError(401, 'User not found');
			}

			const transferenceId: string = this.idGenerator.generate();

			await this.transferenceData.debitTransference(
				transferenceId,
				sender.id,
				receiver.id,
				amount
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getTransferenceHistory = async (token: string, filter?: string) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			const user: AuthenticationData = this.tokenManager.getTokenData(token);

			const result: Transference[] =
				await this.transferenceData.getTransferenceHistory(user.id);

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
