import { prismaClient } from '../BaseDatabase';

export class TransferenceData {
	creditTransference = async (
		id: string,
		senderId: string,
		receiverId: string,
		amount: number
	) => {
		try {
			await prismaClient.transference.create({
				data: {
					id,
					sender_id: senderId,
					receiver_id: receiverId,
					amount,
				},
			});

			await prismaClient.account.update({
				where: {
					user_id: senderId,
				},
				data: {
					credit: {
						decrement: amount,
					},
				},
			});

			await prismaClient.account.update({
				where: {
					user_id: receiverId,
				},
				data: {
					debit: {
						increment: amount,
					},
				},
			});

			await prismaClient.account_history.create({
				data: {
					id,
					user_id: senderId,
					amount,
					type: 'CREDIT',
					status: 'TRANSFERENCE',
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	debitTransference = async (
		id: string,
		senderId: string,
		receiverId: string,
		amount: number
	) => {
		try {
			await prismaClient.transference.create({
				data: {
					id,
					sender_id: senderId,
					receiver_id: receiverId,
					amount,
				},
			});

			await prismaClient.account.update({
				where: {
					user_id: senderId,
				},
				data: {
					debit: {
						decrement: amount,
					},
				},
			});

			await prismaClient.account.update({
				where: {
					user_id: receiverId,
				},
				data: {
					debit: {
						increment: amount,
					},
				},
			});

			await prismaClient.account_history.create({
				data: {
					id,
					user_id: senderId,
					amount,
					type: 'DEBIT',
					status: 'TRANSFERENCE',
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getTransferenceHistory = async (id: string) => {
		try {
			const result = await prismaClient.transference.findMany({
				where: {
					OR: [
						{
							sender_id: id,
						},
						{
							receiver_id: id,
						},
					],
				},

				orderBy: {
					created_at: 'desc',
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
