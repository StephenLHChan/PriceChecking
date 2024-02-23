import * as DynamoDbToolbox from 'dynamodb-toolbox';
import { dynamoDbDocumentClient } from '../utils/dynamodb';
import { PRICE_TABLE } from '../config';

export const PriceTable = new DynamoDbToolbox.Table({
	name: PRICE_TABLE,
	partitionKey: 'productId',
	sortKey: 'priceId',
	DocumentClient: dynamoDbDocumentClient,
});

const Price = new DynamoDbToolbox.Entity({
	name: 'Price',
	attributes: {
		productId: {
			partitionKey: true,
		},
		priceId: {
			sortKey: true,
		},
		value: 'number',
		createdAt: 'string',
	},
	table: PriceTable,
});

export default Price;
