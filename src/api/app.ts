import express, { Router, json } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
	UserInputError,
} from 'errors';
import { log } from 'utils/logger';

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

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
	const { statusCode = 500 } = error;
	const response: { message; trace? } = {
		message: error.message,
	};

	if (error instanceof UserInputError) {
		res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: error.errors });
	} else if (error instanceof UnauthenticatedError) {
		res.status(StatusCodes.UNAUTHORIZED).json();
	} else if (error instanceof BadRequestError) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	} else if (error instanceof NotFoundError) {
		res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
	} else {
		res.status(statusCode).json(response);
	}

	log.error(
		`An error occurred while processing ${req.method}: ${req.originalUrl} API`
	);
	log.error(error);
});

export default app;
