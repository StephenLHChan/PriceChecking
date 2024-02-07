import * as cdk from 'aws-cdk-lib';

import * as ec2 from 'aws-cdk-lib/aws-ec2';

import { Construct } from 'constructs';

import { appName } from '../vars';

export class Vpc extends cdk.Stack {
	readonly vpc: ec2.Vpc;

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

		this.vpc = vpc;
	}
}
