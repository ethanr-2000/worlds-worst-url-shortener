const AWS = require("aws-sdk")

AWS.config.update({ region: "eu-west-2" })
const dynamo = new AWS.DynamoDB.DocumentClient()

const TableName = process.env["TableName"]

exports.handler = async (event, context) => {
    const tableResult = await getAll().catch(err => console.error(err))

    console.log(tableResult)

    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(tableResult)
    }
}

const getAll = async () => {
    const params = { TableName }
    const queryResult = await dynamo.scan(params).promise()
    console.log(queryResult)
    return queryResult.Items
}

const errorResponse = (body) => ({
    isBase64Encoded: false,
    statusCode: 400,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body
})
