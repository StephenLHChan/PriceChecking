import * as cdk from 'aws-cdk-lib';

import { ExpressApi } from './constructs/ExpressApi';
import { Vpc } from './constructs/Vpc';

import { Construct } from 'constructs';
import { UserTable, PriceTable, ProductTable } from './constructs/tables';

export class PriceCheckStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		const expressApiVpc = new Vpc(this, 'vpc');

		const userTable = new UserTable(this, 'UserTable');

		const productTable = new ProductTable(this, 'ProductTable');
		const priceTable = new PriceTable(this, 'PriceTable');

		new ExpressApi(this, 'expressApi', {
			vpc: expressApiVpc.vpc,
			userTable: userTable.table,
			productTable: productTable.table,
			priceTable: priceTable.table,
		});
	}
}
