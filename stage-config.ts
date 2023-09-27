import * as cdk from 'aws-cdk-lib';

interface IEnvironmentVariable {
    env: cdk.Environment;
    queue: {
        visibilityTimeout: number,
    };
}

// Develop environment variables
const devConfig: IEnvironmentVariable = {
    env: {
        account: "338456725408",
        region: "ap-northeast-1",
    },
    queue: {
        visibilityTimeout: 300,
    }
};

const stgConfig: IEnvironmentVariable = {
    env: {
        account: "338456725408",
        region: "ap-northeast-1",
    },
    queue: {
        visibilityTimeout: 400,
    }
};


const prdConfig: IEnvironmentVariable = {
    env: {
        account: "338456725408",
        region: "ap-northeast-1",
    },
    queue: {
        visibilityTimeout: 500,
    }
};

export function getStageConfig(stage: String) {

    if (stage === "dev") {
        return devConfig;
    } else if (stage === "stg") {
        return stgConfig;
    } else if (stage === "prd") {
        return prdConfig;
    } else {
        throw new Error('The stage parameter must be either "dev", "stg", or "prd".');
    }
}
