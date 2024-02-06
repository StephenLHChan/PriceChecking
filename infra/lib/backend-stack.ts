import * as cdk from 'aws-cdk-lib';

import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';

import { Construct } from 'constructs';

import { appName } from './vars';

export class BackendStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const vpc = new ec2.Vpc(this, 'VPC', {
			vpcName: `${appName}-vpc`,
			maxAzs: 2,
			natGateways: 0,
			ipProtocol: ec2.IpProtocol.IPV4_ONLY,
			subnetConfiguration: [
				{
					cidrMask: 24,
					name: `${appName}-public-subnet`,
					subnetType: ec2.SubnetType.PUBLIC,
				},
				{
					cidrMask: 24,
					name: `${appName}-private-subnet`,
					subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
				},
			],
		});

		new ssm.StringParameter(this, 'VpcIdParameter', {
			parameterName: `/${appName}/VpcId`,
			stringValue: vpc.vpcId,
		});

		new ssm.StringParameter(this, 'PublicSubnetIdParameter', {
			parameterName: `/${appName}/PublicSubnetId`,
			stringValue: vpc.publicSubnets[0].subnetId,
		});

		new ssm.StringParameter(this, 'PrivateSubnetIdParameter', {
			parameterName: `/${appName}/PrivateSubnetId`,
			stringValue: vpc.privateSubnets[0].subnetId,
		});
	}
}
