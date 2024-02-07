import * as cdk from 'aws-cdk-lib';

import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as log from 'aws-cdk-lib/aws-logs';

import { Construct } from 'constructs';

import { appName } from '../vars';

interface ExpressApiProps {
	vpc: ec2.Vpc;
}
export class ExpressApi extends cdk.Stack {
	constructor(scope: Construct, id: string, props: ExpressApiProps) {
		super(scope, id);

		const lambdaRole = new iam.Role(this, 'lambdaRole', {
			assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
		});
		lambdaRole.addManagedPolicy(
			iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaBasicExecutionRole')
		);
		lambdaRole.addManagedPolicy(
			iam.ManagedPolicy.fromAwsManagedPolicyName(
				'AWSLambdaVPCAccessExecutionRole'
			)
		);

		const lambdaLogGroup = new log.LogGroup(
			this,
			'express-serverless-lambda-log-group',
			{
				logGroupName: `/aws/lambda/${appName}`,
				retention: log.RetentionDays.TWO_WEEKS,
			}
		);

		new lambda.Function(this, 'express-serverless-lambda', {
			functionName: `${appName}`,
			runtime: lambda.Runtime.NODEJS_LATEST,
			handler: 'index.handler',
			code: lambda.Code.fromAsset('lambda'),
			role: lambdaRole,
			timeout: cdk.Duration.seconds(30),
			vpc: props.vpc,
			vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
			logGroup: lambdaLogGroup,
			systemLogLevel: lambda.SystemLogLevel.INFO,
			applicationLogLevel: lambda.ApplicationLogLevel.INFO,
		});
	}
}
