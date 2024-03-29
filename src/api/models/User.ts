import * as DynamoDbToolbox from 'dynamodb-toolbox';
import { dynamoDbDocumentClient } from '../utils/dynamodb';
import { USER_TABLE } from '../config';

export const UserTable = new DynamoDbToolbox.Table({
	name: USER_TABLE,
	partitionKey: 'userId',
	DocumentClient: dynamoDbDocumentClient,
});

const User = new DynamoDbToolbox.Entity({
	name: 'User',
	attributes: {
		userId: {
			partitionKey: true,
		},
		name: 'string',
		email: 'string',
		avatar: 'string',
	},
	table: UserTable,
});

export default User;
