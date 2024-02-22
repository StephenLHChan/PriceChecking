import * as DynamoDbToolbox from 'dynamodb-toolbox';
import { dynamoDbDocumentClient } from '../utils/dynamodb';
import { PRODUCT_TABLE } from '../config';

export const ProductTable = new DynamoDbToolbox.Table({
	name: PRODUCT_TABLE,
	partitionKey: 'productId',
	DocumentClient: dynamoDbDocumentClient,
});

const Product = new DynamoDbToolbox.Entity({
	name: 'Product',
	attributes: {
		productId: {
			partitionKey: true,
		},
		name: 'string',
		createdAt: 'string',
	},
	table: ProductTable,
});

export default Product;
