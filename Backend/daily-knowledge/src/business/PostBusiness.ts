import { AuthenticationData } from '../models/AuthenticationData';
import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';
import { CustomError } from '../models/CustomError';
import { PostData } from '../data/PostData';
import { UserData } from '../data/UserData';
import { Post, User } from '@prisma/client';

export class PostBusiness {
	constructor(
		private postData: PostData,
		private userData: UserData,
		private idGenerator: IdGenerator,
		private tokenManager: TokenManager
	) {}

	createPost = async (
		token: string,
		title: string,
		text: string,
		author: string,
		source: string,
		tags: Array<string>
	) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!title) {
				throw new CustomError(400, 'Enter a title');
			}
			if (!text) {
				throw new CustomError(400, 'Enter a text');
			}
			if (!author) {
				throw new CustomError(400, 'Enter a author');
			}
			if (!source) {
				throw new CustomError(400, 'Enter a source');
			}
			if (!tags) {
				throw new CustomError(400, 'Enter a tags');
			}

			const tokenData: AuthenticationData =
				this.tokenManager.getTokenData(token);

			const user: User | null = await this.userData.getUserById(tokenData.id);
			if (!user) {
				throw new CustomError(404, 'Fatal error, user not found');
			}

			const verifyPermission: boolean = user.admin;
			if (!verifyPermission) {
				throw new CustomError(401, 'Only admins can post');
			}

			const id: string = this.idGenerator.generate();

			await this.postData.createPost(id, title, text, author, source, tags);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};

	editPost = async (
		token: string,
		postId: string,
		title?: string,
		text?: string,
		author?: string,
		source?: string,
		tags?: Array<string>
	) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!postId) {
				throw new CustomError(401, 'Enter a post id');
			}

			const post: Post | null = await this.postData.getPostById(postId);
			if (!post) {
				throw new CustomError(409, 'Post not found');
			}

			const tokenData: AuthenticationData =
				this.tokenManager.getTokenData(token);

			const user: User | null = await this.userData.getUserById(tokenData.id);
			if (!user) {
				throw new CustomError(404, 'Fatal error, user not found');
			}

			if ((user.admin = false)) {
				throw new CustomError(401, 'Just admin can edit posts');
			}

			await this.postData.editPost(postId, title, text, author, source, tags);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};

	getAllPosts = async (): Promise<Post[]> => {
		try {
			const result: Post[] = await this.postData.getAllPosts();

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};

	getPostByAuthor = async (author: string): Promise<Post[]> => {
		try {
			if (!author) {
				throw new CustomError(400, 'Enter an author');
			}

			const result: Post[] = await this.postData.getPostByAuthor(author);

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};

	getPostByTag = async (tags: string): Promise<Post[]> => {
		try {
			if (!tags) {
				throw new CustomError(400, 'Enter a tag');
			}

			const result: Promise<Post[]> = this.postData.getPostByTag(tags);

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};

	searchPost = async (title: string): Promise<Post[]> => {
		try {
			if (!title) {
				throw new CustomError(400, 'Enter a title');
			}

			const result: Post[] = await this.postData.searchPost(title);

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};

	deletePost = async (token: string, id: string) => {
		try {
			if (!token) {
				throw new CustomError(401, 'Login first');
			}
			if (!id) {
				throw new CustomError(400, 'Enter a post id');
			}

			const post: Post | null = await this.postData.getPostById(id);
			if (!post) {
				throw new CustomError(406, 'Post not found');
			}

			const tokenData: AuthenticationData =
				this.tokenManager.getTokenData(token);

			const user: User | null = await this.userData.getUserById(tokenData.id);
			if (!user) {
				throw new CustomError(404, 'Fatal error, user not found');
			}

			if (!user.admin) {
				throw new CustomError(401, 'Just admin can delete posts');
			}

			await this.postData.deletePost(id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};
}
