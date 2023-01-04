import { PostBusiness } from '../business/PostBusiness';
import { CustomError } from '../models/CustomError';
import { Request, Response } from 'express';

export class PostController {
	constructor(private postBusiness: PostBusiness) {}

	create = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { title, text, author, source, tags } = req.body;

			await this.postBusiness.create(token, title, text, author, source, tags);

			res.status(201).send('Post created');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editPost = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { postId, title, text, author, source, tags } = req.body;

			const result = await this.postBusiness.editPost(
				token,
				postId,
				title,
				text,
				author,
				source,
				tags
			);

			res.status(201).send('Post edited');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getAllPosts = async (req: Request, res: Response) => {
		try {
			const result = await this.postBusiness.getAllPosts();

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getPostByAuthor = async (req: Request, res: Response) => {
		try {
			const { author } = req.params;
			const result = await this.postBusiness.getPostByAuthor(author);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getPostByTag = async (req: Request, res: Response) => {
		try {
			const { tags } = req.params;
			const result = await this.postBusiness.getPostByTag(tags);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getPostByTitle = async (req: Request, res: Response) => {
		try {
			const { title } = req.params;
			const result = await this.postBusiness.getPostByTitle(title);

			console.log(result);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
