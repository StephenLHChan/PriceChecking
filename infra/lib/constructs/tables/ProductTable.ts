import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { CfnOutput } from 'aws-cdk-lib';
import BaseTable from './BaseTable';

export default class ProductTable extends Construct {
	public readonly table: Table;

	constructor(scope: Construct, id: string) {
		super(scope, id);

		const baseTable = new BaseTable(this, 'Table', {
			partitionKey: { name: 'productId', type: AttributeType.STRING },
		});

		this.table = baseTable.table;

		new CfnOutput(this, 'ProductTable', {
			key: 'ProductTable',
			value: this.table.tableName,
		});
	}
}
