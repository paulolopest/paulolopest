import express, { Router } from 'express';
import { UserBusiness } from '../../business/user/UserBusiness';
import { UserController } from '../../controller/user/UserController';
import { UserData } from '../../data/user/UserData';
import { IdGenerator } from '../../services/IdGenerator';

const userBusiness: UserBusiness = new UserBusiness(
	new UserData(),
	new IdGenerator()
);

const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

userRouter.post('/signup', userController.signup);
