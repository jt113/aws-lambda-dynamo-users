'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
    // unmarshall ddb json to std json
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"}) 

    const params = {
        TableName: "Users",
        Key: {
            id: "12345"
        }
    }
    try{
       const data = await documentClient.get(params).promise();
       console.log(data);
    }
    catch(err){
        console.log(err);

    }
}