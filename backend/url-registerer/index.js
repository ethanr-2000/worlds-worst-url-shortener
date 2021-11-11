const AWS = require("aws-sdk")

AWS.config.update({ region: "eu-west-2" })
const dynamo = new AWS.DynamoDB.DocumentClient()

const TableName = process.env["TableName"]

exports.handler = async (event, context) => {
    console.log(event)
    const eventBody = JSON.parse(event.body)
    let { destinationUrl, shortUrl } = eventBody

    if (!shortUrl) {
        shortUrl = await generateURL()
    }

    await updateUrlTable(shortUrl, destinationUrl)

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

const generateURL = async () => {
    let shortUrl = ''
    do {
        shortUrl = generate6Chars()
    } while (!(await urlIsRegistered(shortUrl)))
    return shortUrl
}

const generate6Chars = () => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for ( let i = 0; i < 6; i++ ) {
        const index = Math.floor(Math.random() * charactersLength)
        result += characters.charAt(index)
    }
    return result
}

const urlIsRegistered = async (url) => {
    const params = {
        TableName,
        KeyConditionExpression: 'shortUrl = :s',
        ExpressionAttributeValues: {
            ':s': url,
        },
    }
    const queryResult = dynamo.query(params).promise()
        .then((res) => {
            console.debug('dynamo query success')
            return res.Items
        })
        .catch((err) => {
            console.error('error querying dynamo', err)
            throw err
        })

    return queryResult.length !== 0
}

const updateUrlTable = async (shortUrl, destinationUrl) => {
    const params = {
        Item: {
            shortUrl,
            destinationUrl,
        },
        TableName
    }
    await dynamo.put(params).promise()
        .then((res) => console.debug('dynamo put success'))
        .catch((err) => {
            console.error('error putting to dynamo', err)
            throw err
        })
}
