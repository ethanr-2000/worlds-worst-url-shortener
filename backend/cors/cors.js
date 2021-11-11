exports.handler = async (event) => {
    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify('CORS Validated'),
    };
};
