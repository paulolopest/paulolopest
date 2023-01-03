import { PostBusiness } from '../business/PostBusiness';
import { CustomError } from '../models/CustomError';
import { Request, Response } from 'express';

export class PostController {
	constructor(private postBusiness: PostBusiness) {}

	create = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { title, text, example, author, url } = req.body;

			await this.postBusiness.create(token, title, text, example, author, url);

			res.status(201).send('Post created');
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
}
