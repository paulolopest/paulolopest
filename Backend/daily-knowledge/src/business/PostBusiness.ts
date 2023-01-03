import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';
import { CustomError } from '../models/CustomError';
import { PostData } from '../data/PostData';
import { UserData } from '../data/UserData';

export class PostBusiness {
	constructor(
		private postData: PostData,
		private userData: UserData,
		private tokenManager: TokenManager,
		private idGenerator: IdGenerator
	) {}

	create = async (
		token: string,
		title: string,
		text: string,
		example: string,
		author: string,
		url: string
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
			if (!example) {
				throw new CustomError(400, 'Enter a example');
			}
			if (!author) {
				throw new CustomError(400, 'Enter a author');
			}
			if (!url) {
				throw new CustomError(400, 'Enter a url');
			}

			const tokenData = this.tokenManager.getTokenData(token);

			const user = await this.userData.getUserById(tokenData.id);
			if (!user) {
				throw new CustomError(404, 'Fatal error');
			}

			const verifyPermission = user.admin;
			if (!verifyPermission) {
				throw new CustomError(401, 'Only admins can post');
			}

			const id = this.idGenerator.generate();

			await this.postData.create(id, title, text, example, author, url);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};

	getAllPosts = async () => {
		try {
			const result = await this.postData.getAllPosts();

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new CustomError(404, error.message);
			}
		}
	};
}
