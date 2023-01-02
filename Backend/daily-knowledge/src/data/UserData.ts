import { prismaClient } from './BaseDatabase';

export class UserData {
	signup = async (
		id: string,
		name: string,
		username: string,
		password: string
	) => {
		try {
			await prismaClient.user.create({
				data: {
					id,
					name,
					username,
					password,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getByUsername = async (username: string) => {
		const result = await prismaClient.user.findUnique({
			where: {
				username,
			},
		});

		return result;
	};
}
