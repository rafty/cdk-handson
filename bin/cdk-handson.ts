#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as nag from 'cdk-nag';
import { CdkHandsonStack } from '../lib/cdk-handson-stack';
import { getStageConfig } from '../stage-config';
import { PublishStack } from '../lib/publish-stack';


const app = new cdk.App();

cdk.Tags.of(app).add("Name", "cdkhandson");


cdk.Aspects.of(app).add(new nag.AwsSolutionsChecks( { verbose: true }));


const stage = app.node.tryGetContext("stage");
const stageVariables = getStageConfig(stage);


const stackTky = new CdkHandsonStack(app, `CdkHandsonStack`, {  // 本当はCdkHandsonStackDevというようにしたい
	env: stageVariables.env,
	stage: stage,
	visibilityTimeout: stageVariables.queue.visibilityTimeout,
});

const publishStack = new PublishStack(app, `PublishStack`, {  // 本当はPublishStackDevというようにしたい
	env: stageVariables.env,
	stage: stage,
});

publishStack.node.addDependency(stackTky);

cdk.Tags.of(stackTky).add(`SubSystemName-${stage}`, "pubsub");
cdk.Tags.of(publishStack).add(`SubSystemName-${stage}`, "publish");
