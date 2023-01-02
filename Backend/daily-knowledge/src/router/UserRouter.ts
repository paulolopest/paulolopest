import { UserController } from '../controller/UserController';
import { UserBusiness } from '../business/UserBusiness';
import { IdGenerator } from '../services/IdGenerator';
import { UserData } from '../data/UserData';
import express from 'express';

const userBusiness = new UserBusiness(new UserData(), new IdGenerator());

const userController = new UserController(userBusiness);

export const userRouter = express.Router();

userRouter.post('/signup', userController.signup);
