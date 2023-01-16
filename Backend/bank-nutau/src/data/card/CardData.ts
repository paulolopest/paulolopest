import { prismaClient } from '../BaseDatabase';

export class CardData {
	create = async (
		id: string,
		user_id: string,
		cardNumber: string,
		cvv: number,
		cardOwner: string,
		validateDate: string
	) => {
		try {
			await prismaClient.credit_Card.create({
				data: {
					id,
					user_id: user_id,
					card_number: cardNumber,
					cvv,
					card_owner: cardOwner,
					validate_date: validateDate,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getMyCard = async (user_id: string) => {
		try {
			const result = prismaClient.credit_Card.findFirst({
				where: {
					user_id: user_id,
				},
				select: {
					name: true,
					card_owner: true,
					card_number: true,
					cvv: true,
					validate_date: true,
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteCard = async (user_id: string) => {
		try {
			await prismaClient.credit_Card.delete({
				where: {
					user_id: user_id,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	//

	withdrawMoney = async (id: string, amount: number, historyId: string) => {
		try {
			await prismaClient.account.update({
				where: {
					user_id: id,
				},
				data: {
					debit: { decrement: amount },
				},
			});

			await prismaClient.account_history.create({
				data: {
					id: historyId,
					user_id: id,
					amount,
					type: 'DEBIT',
					status: 'EXIT',
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	depositMoney = async (id: string, amount: number, historyId: string) => {
		try {
			await prismaClient.account.update({
				where: {
					user_id: id,
				},
				data: {
					debit: { increment: amount },
				},
			});

			await prismaClient.account_history.create({
				data: {
					id: historyId,
					user_id: id,
					amount,
					type: 'DEBIT',
					status: 'ENTRANCE',
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
