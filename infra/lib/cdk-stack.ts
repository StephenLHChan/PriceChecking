import * as cdk from 'aws-cdk-lib';

import { ExpressApi } from './constructs/ExpressApi';
import { Vpc } from './constructs/Vpc';

import { Construct } from 'constructs';

export class PriceCheckStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const expressApiVpc = new Vpc(this, 'vpc');
		new ExpressApi(this, 'expressApi', { vpc: expressApiVpc.vpc });
	}
}
