import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { CfnOutput } from 'aws-cdk-lib';
import BaseTable from './BaseTable';

export default class PriceTable extends Construct {
	public readonly table: Table;

	constructor(scope: Construct, id: string) {
		super(scope, id);

		const baseTable = new BaseTable(this, 'Table', {
			partitionKey: { name: 'priceId', type: AttributeType.STRING },
			sortKey: { name: 'productId', type: AttributeType.STRING },
		});

		this.table = baseTable.table;

		new CfnOutput(this, 'PriceTable', {
			key: 'PriceTable',
			value: this.table.tableName,
		});
	}
}
