import { prismaClient } from '../BaseDatabase';

export class CardData {
	create = async (
		id: string,
		userId: string,
		cardNumber: string,
		cvv: number,
		cardOwner: string,
		validateDate: string
	) => {
		try {
			await prismaClient.credit_Card.create({
				data: {
					id,
					user_id: userId,
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

	getMyCard = async (userId: string) => {
		try {
			const result = prismaClient.credit_Card.findFirst({
				where: {
					user_id: userId,
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

	deleteCard = async (userId: string) => {
		try {
			await prismaClient.credit_Card.delete({
				where: {
					user_id: userId,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
