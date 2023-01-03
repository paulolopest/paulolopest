import { prisma } from '@prisma/client';
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
		try {
			const result = await prismaClient.user.findUnique({
				where: {
					username,
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getUserById = async (userId: string) => {
		try {
			const result = await prismaClient.user.findUnique({
				where: {
					id: userId,
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProfile = async (userId: string) => {
		try {
			const result = await prismaClient.user.findUnique({
				where: { id: userId },
				select: {
					id: true,
					name: true,
					username: true,
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editPassword = async (id: string, newPassword: string) => {
		try {
			await prismaClient.user.update({
				where: {
					id,
				},
				data: {
					password: newPassword,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
