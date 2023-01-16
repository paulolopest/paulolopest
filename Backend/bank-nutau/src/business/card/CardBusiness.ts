import { AuthenticationData } from '../../models/AuthenticationData';
import { CardData } from '../../data/card/CardData';
import { TokenManager } from '../../services/TokenManager';
import { IdGenerator } from '../../services/IdGenerator';
import { CustomError } from '../../models/CustomError';
import { UserData } from '../../data/user/UserData';

export class CardBusiness {
	constructor(
		private tokenManager: TokenManager,
		private idGenerator: IdGenerator,
		private cardData: CardData,
		private userData: UserData
	) {}

	create = async (token: string) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}

			const tokenData: AuthenticationData =
				this.tokenManager.getTokenData(token);

			const user = await this.userData.getUser(tokenData.id);
			if (!user) {
				throw new CustomError(404, 'User fatal error');
			}

			const id = this.idGenerator.generate();

			function generateRan(number: number) {
				var max = number;
				let random = [];
				for (var i = 0; i < max; i++) {
					var temp = Math.floor(Math.random() * max);
					if (random.indexOf(temp) == -1) {
						random.push(temp);
					} else i--;
				}

				return random.join('');
			}

			const cardNumber = [generateRan(9), generateRan(7)]
				.join('')
				.replace('0', '5');

			const cvv = Number(generateRan(3).replace('0', '7'));
			const cardOwner = `${user.name} ${user.last_name}`;
			const date = new Date();

			const validateDate = `${date.getUTCMonth() + 1}/${
				date.getFullYear() + 10
			}`;

			await this.cardData.create(
				id,
				tokenData.id,
				cardNumber.toString(),
				cvv,
				cardOwner,
				validateDate
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getMyCard = async (token: string) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}

			const tokenData = this.tokenManager.getTokenData(token);

			const result = await this.cardData.getMyCard(tokenData.id);

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteCard = async (token: string) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}

			const user = this.tokenManager.getTokenData(token);

			await this.cardData.deleteCard(user.id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	//

	withdrawMoney = async (token: string, amount: number) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!amount) {
				throw new CustomError(400, 'Enter a value');
			}

			const user = this.tokenManager.getTokenData(token);
			if (!user) {
				throw new CustomError(404, 'User fatal error, login again');
			}

			const balance = await this.userData.getAccount(user.id);
			if (!balance) {
				throw new CustomError(404, 'User fatal error, login again');
			}

			if (amount > balance.debit) {
				throw new CustomError(401, 'Amount greater than your balance');
			}

			const historyId: string = this.idGenerator.generate();

			await this.cardData.withdrawMoney(user.id, amount, historyId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	depositMoney = async (token: string, amount: number) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!amount) {
				throw new CustomError(400, 'Enter a value');
			}

			const user = this.tokenManager.getTokenData(token);
			if (!user) {
				throw new CustomError(404, 'User fatal error, login again');
			}

			const historyId: string = this.idGenerator.generate();

			await this.cardData.depositMoney(user.id, amount, historyId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
