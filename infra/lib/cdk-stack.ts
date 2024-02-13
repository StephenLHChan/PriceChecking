import * as cdk from 'aws-cdk-lib';

import { ExpressApi } from './constructs/ExpressApi';
import { Vpc } from './constructs/Vpc';

import { Construct } from 'constructs';
import UserTable from './constructs/tables/UserTable';
import ProductTable from './constructs/tables/ProductTable';

export class PriceCheckStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		const expressApiVpc = new Vpc(this, 'vpc');

		const userTable = new UserTable(this, 'UserTable');
		const productTable = new ProductTable(this, 'ProductTable');

		new ExpressApi(this, 'expressApi', {
			vpc: expressApiVpc.vpc,
			userTable: userTable.table,
			productTable: productTable.table,
		});
	}
}
