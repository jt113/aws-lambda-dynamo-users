'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"})

    const params = {
        TableName: "Users",
        Item: {
            id: "90000",
            firstName: "peter",
            lastName: "griffin"
        }
    }
    try {
       const data = await documentClient.put(params).promise();
       console.log(data);

    }
    catch(err){
        console.log(err);

    }
}