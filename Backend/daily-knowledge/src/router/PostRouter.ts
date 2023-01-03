import { PostController } from '../controller/PostController';
import { PostBusiness } from '../business/PostBusiness';
import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';
import { PostData } from '../data/PostData';
import { UserData } from '../data/UserData';
import express, { Router } from 'express';

const postBusiness: PostBusiness = new PostBusiness(
	new PostData(),
	new UserData(),
	new TokenManager(),
	new IdGenerator()
);

const postController: PostController = new PostController(postBusiness);

export const postRouter: Router = express.Router();

postRouter.post('/add-post', postController.create);

postRouter.get('/all-posts', postController.getAllPosts);
