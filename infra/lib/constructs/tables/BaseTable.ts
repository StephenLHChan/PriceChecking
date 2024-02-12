import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { Table, Attribute, BillingMode } from 'aws-cdk-lib/aws-dynamodb';

interface BaseTableProps {
	partitionKey: Attribute;
	sortKey?: Attribute;
}

export default class BaseTable extends Construct {
	public readonly table: Table;

	constructor(scope: Construct, id: string, props: BaseTableProps) {
		super(scope, id);

		this.table = new Table(this, 'Table', {
			billingMode: BillingMode.PAY_PER_REQUEST,
			deletionProtection: false,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			pointInTimeRecovery: false,
			partitionKey: props.partitionKey,
			sortKey: props.sortKey,
		});
	}
}
