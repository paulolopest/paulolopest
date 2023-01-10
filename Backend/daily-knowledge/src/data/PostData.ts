import { Post } from '@prisma/client';
import { prismaClient } from './BaseDatabase';

export class PostData {
	createPost = async (
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

	searchPost = async (title: string) => {
		try {
			const result = await prismaClient.post.findMany({
				where: {
					OR: [
						{
							title: { contains: title },
						},
						{
							tags: { has: title },
						},
					],
				},
				orderBy: [{ created_at: 'desc' }],
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getAllPosts = async () => {
		try {
			const result = await prismaClient.post.findMany({
				orderBy: [{ created_at: 'desc' }],
			});

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
				orderBy: [{ created_at: 'desc' }],
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
				orderBy: [{ created_at: 'desc' }],
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deletePost = async (id: string) => {
		try {
			await prismaClient.post.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
