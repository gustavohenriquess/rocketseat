import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

interface IUserCertificate {
  name: string;
  id: string;
  created_at: string;
  grade: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "users_certificate",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  const userCertificate = response.Items[0] as IUserCertificate;

  if (userCertificate) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Certificado válido",
        url: `https://ignite-certificate.s3.amazonaws.com/${id}.pdf`,
        name: userCertificate.name,
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Certificado inválido",
    }),
  };
};
