import * as cdk from 'aws-cdk-lib';

import { Cors } from 'aws-cdk-lib/aws-apigateway';
import {
	CorsHttpMethod,
	HttpApi,
	HttpMethod,
} from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
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

		const lambdaFunction = new NodejsFunction(
			this,
			'express-serverless-lambda',
			{
				functionName: `${appName}`,
				runtime: lambda.Runtime.NODEJS_LATEST,
				handler: 'index.handler',
				role: lambdaRole,
				timeout: cdk.Duration.seconds(30),
				vpc: props.vpc,
				vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
				logGroup: lambdaLogGroup,
				systemLogLevel: lambda.SystemLogLevel.INFO,
				applicationLogLevel: lambda.ApplicationLogLevel.INFO,
			}
		);
		const integration = new HttpLambdaIntegration(
			'LambdaIntegration',
			lambdaFunction
		);

		const api = new HttpApi(this, 'HttpApi', {
			apiName: 'Price-Checking',
			corsPreflight: {
				allowHeaders: ['*'],
				allowMethods: [CorsHttpMethod.ANY],
				allowOrigins: Cors.ALL_ORIGINS,
				maxAge: cdk.Duration.hours(24),
			},
		});
		api.addRoutes({
			path: '/{proxy+}',
			integration,
			methods: [
				HttpMethod.HEAD,
				HttpMethod.GET,
				HttpMethod.POST,
				HttpMethod.PATCH,
				HttpMethod.PUT,
				HttpMethod.DELETE,
			],
		});
	}
}
