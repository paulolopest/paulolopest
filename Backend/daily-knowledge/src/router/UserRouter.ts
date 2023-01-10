import { UserController } from '../controller/UserController';
import { UserBusiness } from '../business/UserBusiness';
import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';
import { UserData } from '../data/UserData';
import express, { Router } from 'express';

const userBusiness: UserBusiness = new UserBusiness(
	new UserData(),
	new IdGenerator(),
	new HashManager(),
	new TokenManager()
);

const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

// Routes

userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);

userRouter.put('/profile/edit-password', userController.editPassword);
userRouter.put('/profile/edit-username', userController.editUsername);

userRouter.get('/profile', userController.getProfile);

userRouter.delete('/profile/delete', userController.deleteUser);
