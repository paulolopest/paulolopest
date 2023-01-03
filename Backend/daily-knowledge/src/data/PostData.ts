import { prismaClient } from './BaseDatabase';

export class PostData {
	create = async (
		id: string,
		title: string,
		text: string,
		example: string,
		author: string,
		url: string
	) => {
		try {
			await prismaClient.post.create({
				data: {
					id,
					title,
					text,
					example,
					author,
					url,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getPostByTitle = async (title: string) => {
		try {
			const result = await prismaClient.post.findFirst({
				where: { title },
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getAllPosts = async () => {
		try {
			const result = await prismaClient.post.findMany({});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
