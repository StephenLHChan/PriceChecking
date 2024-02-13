import * as cdk from 'aws-cdk-lib';

import { ExpressApi } from './constructs/ExpressApi';
import { Vpc } from './constructs/Vpc';

import { Construct } from 'constructs';
import UserTable from './constructs/tables/UserTable';

export class PriceCheckStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		const expressApiVpc = new Vpc(this, 'vpc');

		const userTable = new UserTable(this, 'UserTable');

		new ExpressApi(this, 'expressApi', {
			vpc: expressApiVpc.vpc,
			userTable: userTable.table,
		});
	}
}
