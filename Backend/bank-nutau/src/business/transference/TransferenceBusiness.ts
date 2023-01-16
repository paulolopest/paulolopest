import { TransferenceData } from '../../data/transference/TransferenceData';
import { TokenManager } from '../../services/TokenManager';
import { CustomError } from '../../models/CustomError';
import { CardData } from '../../data/card/CardData';
import { UserData } from '../../data/user/UserData';
import { IdGenerator } from '../../services/IdGenerator';

export class TransferenceBusiness {
	constructor(
		private transferenceData: TransferenceData,
		private tokenManager: TokenManager,
		private idGenerator: IdGenerator,
		private cardData: CardData,
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

			const tokenData = this.tokenManager.getTokenData(token);

			const sender = await this.userData.getUser(tokenData.id);
			if (!sender) {
				throw new CustomError(401, 'User fatal error, login again');
			}
			if (sender.username === username) {
				throw new CustomError(409, 'You can not transfer to yourself');
			}

			const receiver = await this.userData.getUser(username);
			if (!receiver) {
				throw new CustomError(401, 'User not found');
			}

			const transferenceId = this.idGenerator.generate();

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
}
