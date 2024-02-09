import serverlessExpress from '@codegenie/serverless-express';
import app from './app';

const serverlessExpressInstance = serverlessExpress({
	app,
});

export const handler = (event, context) => {
	return serverlessExpressInstance(event, context);
};
