#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PriceCheckStack } from '../lib/cdk-stack';
import { appName } from '../lib/vars';

const app = new cdk.App();

new PriceCheckStack(app, 'price-check-stack', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	/* Uncomment the next line if you know exactly what Account and Region you
	 * want to deploy the stack to. */
	// env: { account: '123456789012', region: 'us-east-1' },
	/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

cdk.Tags.of(app).add('app', appName);
