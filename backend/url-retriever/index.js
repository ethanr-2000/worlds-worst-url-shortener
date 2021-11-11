const AWS = require("aws-sdk")

AWS.config.update({ region: "eu-west-2" })
const dynamo = new AWS.DynamoDB.DocumentClient()

const TableName = process.env["TableName"]

exports.handler = async (event, context) => {
    console.log(event)
    const eventBody = JSON.parse(event.body)
    let { shortUrl } = eventBody

    if (!shortUrl) {
        return errorResponse("No url provided")
    }

    const destinationUrl = await getUrl(shortUrl)

    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: destinationUrl
    }
}

const getUrl = async (url) => {
    const params = {
        TableName,
        KeyConditionExpression: 'shortUrl = :s',
        ExpressionAttributeValues: {
            ':s': url,
        },
    }
    const queryResult = await dynamo.query(params).promise()
    console.log(queryResult)
    return queryResult.Items[0].destinationUrl
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
