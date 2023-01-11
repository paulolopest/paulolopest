import { AuthenticationData } from '../models/AuthenticationData';
import * as jwt from 'jsonwebtoken';

export class TokenManager {
	generate = (id: AuthenticationData) => {
		return jwt.sign(id, process.env.JWT_SECRET_KEY as jwt.Secret, {
			expiresIn: process.env.JWT_EXPIRES,
		});
	};

	getTokenData = (token: string): AuthenticationData => {
		return jwt.verify(
			token,
			process.env.JWT_SECRET_KEY as jwt.Secret
		) as AuthenticationData;
	};
}
