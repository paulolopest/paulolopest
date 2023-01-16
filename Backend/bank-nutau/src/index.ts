import { transferenceRouter } from './router/transference/TransferenceRouter';
import { cardRouter } from './router/card/CardRouter';
import { userRouter } from './router/user/UserRouter';
import express, { Express } from 'express';
import cors from 'cors';

const port = process.env.PORT || 3000;
const app: Express = express();

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
app.use(cardRouter);
app.use(transferenceRouter);
