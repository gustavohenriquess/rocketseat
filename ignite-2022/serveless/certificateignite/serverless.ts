import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "certificateignite",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "us-east-1", //Região default
    // timeout: 15,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: ["*"],
      },
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: ["*"],
      },
    ],
  },
  package: {
    individually: false,
    include: ["./src/templates/**"],
  },
  // import the function via paths
  functions: {
    hello: {
      handler: "src/functions/hello.handler",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
            cors: true,
          },
        },
      ],
    },
    generateCertificate: {
      handler: "src/functions/generateCertificate.handler",
      events: [
        {
          http: {
            method: "post",
            path: "generateCertificate",
            cors: true,
          },
        },
      ],
    },
    verifyCertificate: {
      handler: "src/functions/verifyCertificate.handler",
      events: [
        {
          http: {
            method: "get",
            path: "verifyCertificate/{id}",
            cors: true,
          },
        },
      ],
    },
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      external: ["chrome-aws-lambda"],
    },
    dynamodb: {
      stages: ["dev", "local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      },
    },
  },
  resources: {
    Resources: {
      dbCertificateUsers: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "users_certificate",
          //Tipo de cobrança do banco
          ProvisionedThroughput: {
            ReadCapacityUnits: 5, //Quantidade de leitura por Segundo
            WriteCapacityUnits: 5, //Quantidade de escrita por Segundo
          },
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
