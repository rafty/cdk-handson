import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NagSuppressions } from "cdk-nag";
import { PubSub } from './constructs/pub-sub';


export interface IEnvironmentStack extends StackProps {
    stage: string;
    visibilityTimeout: number;
}


export class CdkHandsonStack extends Stack {
  constructor(scope: Construct, id: string, props: IEnvironmentStack) {
    super(scope, id, props);

    if ( props.visibilityTimeout !== undefined && props.visibilityTimeout < 300 ) {
      throw new Error("visibilityTimeout must be greater than 300")
    }

    NagSuppressions.addStackSuppressions(this, [
      {
          id: "AwsSolutions-SQS4",
          reason: "suppress for hands-on.",
      }
    ]);
  
    const pubsub = new PubSub(this, 'PubSub', {
      stage: props.stage,
      visibilityTimeout: props.visibilityTimeout,
    });

  }
}
