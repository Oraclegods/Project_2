const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};
const outputFile = '.swagger.json';
//const endpointFiles = ['./routes/index.js'];

const endpointFiles = ['./routes/index.js', './routes/users.js', './routes/items.js'];


// this will generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);