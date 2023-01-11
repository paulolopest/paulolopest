import { prismaClient } from '../BaseDatabase';

export class UserData {
	signup = async (
		id: string,
		name: string,
		lastName: string,
		nickname: string,
		email: string,
		password: string,
		cpf: string,
		accountId: string
	) => {
		try {
			await prismaClient.user.create({
				data: {
					id,
					name,
					last_name: lastName,
					nickname,
					email,
					password,
					cpf,
					account_id: accountId,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getUser = async (word: string) => {
		try {
			const result = await prismaClient.user.findFirst({
				where: {
					OR: [
						{
							nickname: word,
						},
						{
							email: word,
						},
						{
							cpf: word,
						},
					],
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
