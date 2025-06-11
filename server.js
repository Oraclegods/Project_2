const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const swaggerRoutes = require('./routes/swagger');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./.swagger.json'); // Path to your generated file

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

app.use('/', swaggerRoutes);
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));

// # getting hello world
app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + port);
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    }
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
