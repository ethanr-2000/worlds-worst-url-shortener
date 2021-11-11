const AWS = require("aws-sdk")

AWS.config.update({ region: "eu-west-2" })
const dynamo = new AWS.DynamoDB.DocumentClient()

const TableName = process.env["TableName"]

exports.handler = async (event, context) => {
    const eventBody = JSON.parse(event.body)
    let { shortUrl } = eventBody

    await deleteUrl(shortUrl)

    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: "Success"
    }
}

const deleteUrl = async (shortUrl) => {
    const params = {
        Key: { shortUrl },
        TableName
    }
    await dynamo.delete(params).promise()
        .then((res) => console.debug('dynamo delete success'))
        .catch((err) => {
            console.error('error deleting from dynamo', err)
            throw err
        })
}

