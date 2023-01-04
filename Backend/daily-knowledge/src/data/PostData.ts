import { prismaClient } from './BaseDatabase';

export class PostData {
	create = async (
		id: string,
		title: string,
		text: string,
		author: string,
		source: string,
		tags: Array<string>
	) => {
		try {
			await prismaClient.post.create({
				data: {
					id,
					title,
					text,
					author,
					source,
					tags,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editPost = async (
		id: string,
		title?: string,
		text?: string,
		author?: string,
		source?: string,
		tags?: Array<string>
	) => {
		try {
			await prismaClient.post.update({
				where: {
					id,
				},
				data: {
					title,
					text,
					author,
					source,
					tags,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getPostById = async (id: string) => {
		try {
			const result = prismaClient.post.findUnique({
				where: { id },
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getPostByTitle = async (title: string) => {
		try {
			const result = await prismaClient.post.findFirst({
				where: { title: { contains: title } },
			});

			return result;
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

	getPostByAuthor = async (author: string) => {
		try {
			const result = await prismaClient.post.findMany({
				where: {
					author,
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getPostByTag = async (tags: string) => {
		try {
			const result = await prismaClient.post.findMany({
				where: {
					tags: { has: tags },
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
