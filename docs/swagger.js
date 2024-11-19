const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
    info: {
        version: '',
        title: 'AdminService',
        description: 'Api for university admins'
    },
    servers: [
        {
            url: 'localhost',
            description: ''
        },
    ],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger.json';
const routes = ['../app.js'];

swaggerAutogen(outputFile, routes, doc);