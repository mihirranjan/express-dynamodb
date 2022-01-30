import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from "./router";
import constants from './libs/constants'
import { initDynamoDB } from './DB/init'

initDynamoDB();

const app = express();
app.use(express.json());

const port = constants.PORT || 3002;
const options = {
    definition: {
        openapi: '3.0.2',
        components: {},
        info: {
            title: 'Technical challenge',
            version: '0.0.1',
        },
        servers: [
            {
                "url": `http://localhost:${port}/api`,
                "description": "Swagger: Local server"
            }
        ]
    },
    apis: ['./src/router.js', './src/swagger/*.yaml']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);
app.get("/api/hello", (req, res) => {
    return res.send("Hello WiredPlus!!")
})

app.listen(port, () => {
    console.log(`Started the server on port :${port}`)
    console.log(`Please go to => http://localhost:${port}/api-docs/`)
})
