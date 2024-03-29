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
	new IdGenerator(),
	new TokenManager()
);

const postController: PostController = new PostController(postBusiness);

export const postRouter: Router = express.Router();

// Routes

postRouter.post('/add-post', postController.createPost);

postRouter.put('/post/edit', postController.editPost);

postRouter.get('/all-posts', postController.getAllPosts);
postRouter.get('/search/post/:title', postController.searchPost);
postRouter.get('/search/tags/:tags', postController.getPostByTag);
postRouter.get('/search/author/:author', postController.getPostByAuthor);

postRouter.delete('/post/:id/delete', postController.deletePost);
