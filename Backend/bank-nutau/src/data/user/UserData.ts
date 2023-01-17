import { prismaClient } from '../BaseDatabase';

export class UserData {
	signup = async (
		id: string,
		name: string,
		lastName: string,
		username: string,
		email: string,
		password: string,
		cpf: string
	) => {
		try {
			await prismaClient.user.create({
				data: {
					id,
					name,
					last_name: lastName,
					username,
					email,
					password,
					cpf,
				},
			});

			await prismaClient.account.create({
				data: {
					user_id: id,
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
							id: word,
						},
						{
							username: word,
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

	getAccount = async (id: string) => {
		try {
			const result = prismaClient.account.findUnique({
				where: {
					user_id: id,
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProfile = async (id: string) => {
		try {
			const result = prismaClient.user.findFirst({
				where: { id },
				select: {
					id: true,
					username: true,
					name: true,
					last_name: true,
					email: true,
					cpf: true,
					Account: {
						select: {
							credit: true,
							debit: true,
						},
					},
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editProfile = async (id: string, email?: string, username?: string) => {
		try {
			await prismaClient.user.update({
				where: { id },
				data: {
					username,
					email,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editPassword = async (id: string, newPassword: string) => {
		try {
			await prismaClient.user.update({
				where: { id },
				data: {
					password: newPassword,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteUser = async (id: string) => {
		try {
			await prismaClient.user.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
