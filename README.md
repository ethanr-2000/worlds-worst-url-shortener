# Worlds Worst URL Shortener
<i><b>"Yeah, you can shorten a url, but someone could edit or delete it at any time"</b></i>

See it in action [here](https://url.ethanr.co.uk).

## Backend
The backend consists of four Lambdas behind API Gateway, with a single DynamoDB table to store url mappings.

#### DynamoDB
The ```ShortUrlTable``` table has an index of ```shortUrl``` and an additional ```destinationUrl``` property.

#### Lambdas
- <b>url-registerer</b> - takes a <i>short url</i> and <i>destination url</i> and saves it to the table
- <b>url-retriever</b> - takes a <i>short url</i> and returns the corresponding <i>destination url</i>
- <b>url-retriever-all</b> - returns the full table
- <b>url-deleter</b> - takes a <i>short url</i> and deletes the row from the table

#### Deployment
This uses AWS [serverless application model](https://aws.amazon.com/serverless/sam/) to handle the infrastructure deployment.
The ```backend/template.yaml``` file contains the infrastructure as code.
It can be deployed from the terminal, given a correct AWS auth setup.
```
cd backend
sam deploy
```

#### Develop Locally
When developing locally, the API must handle CORS. The ```backend/cors``` folder contains a Lambda handler that handles pre-flight requests.
Each Lambda/API Gateway endpoint must have a corresponding CORS handler. These are commented out in ```backend/template.yaml```

## Web App
The web app is a simple React application, using ```react-bootstrap``` for styling. It's hosted as a static site on AWS S3, served with AWS Cloudfront.

The redirection simply takes a wildcard path and routes it to the redirection holding page. There, it queries the API and redirects to the result.

Initialised with [Create React App](https://github.com/facebook/create-react-app)

#### Develop Locally
```npm run start```

#### Build
```npm run build```

#### Deploy to S3
```npm run deploy```
