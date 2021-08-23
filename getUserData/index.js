'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
    // unmarshall ddb json to std json
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"}) 

    let responseBody = "";
    let statusCode = 0;

    const { id } = event.pathParameters;

    const params = {
        TableName: "Users",
        Key: {
            id: id
        }
    }
    try{
       const data = await documentClient.get(params).promise();
       responseBody = JSON.stringify(data.Item); // data.Item is how ddb formats  responses. contains user data
       statusCode = 200;
    }
    catch(err){
        responseBody = `Unable to get user data`;
        statusCode = 403;

    }

    const response = {
        statusCode: statusCode,
        headers: {
            "myheader": "test"
        },
        body: responseBody
    }
    return response;
}