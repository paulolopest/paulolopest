import { UserController } from '../../controller/user/UserController';
import { UserBusiness } from '../../business/user/UserBusiness';
import { TokenManager } from '../../services/TokenManager';
import { HashManager } from '../../services/HashManager';
import { IdGenerator } from '../../services/IdGenerator';
import { UserData } from '../../data/user/UserData';
import express, { Router } from 'express';

const userBusiness: UserBusiness = new UserBusiness(
	new TokenManager(),
	new IdGenerator(),
	new HashManager(),
	new UserData()
);

const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);

userRouter.get('/profile', userController.getProfile);

userRouter.put('/profile/edit-password', userController.editPassword);
userRouter.put('/profile/edit-profile', userController.editProfile);

userRouter.delete('/profile/delete', userController.deleteUser);
