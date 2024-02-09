import express, { Router, json } from 'express';
import cors from 'cors';

const app = express();
const router = Router();
router.use(cors());
router.use(json());

app.use('/', router);

app.use((req, res, next) => {
	const error: Error & { statusCode? } = new Error('Route not found');
	error.statusCode = 404;
	next(error);
});

export default app;
