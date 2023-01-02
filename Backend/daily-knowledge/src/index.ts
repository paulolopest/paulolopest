import express, { Express } from 'express';
import cors from 'cors';
import { userRouter } from './router/UserRouter';

export const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
	if (server) {
		console.log(`The server is running on localhost:${port}`);
	} else {
		console.log('Error running the server');
	}
});

app.use(userRouter);
