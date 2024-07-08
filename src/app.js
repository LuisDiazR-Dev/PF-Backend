const express = require('express');
const server = express();
const PORT = 3001

const morgan = require('morgan');
const routes = require('./routes/index.js');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db.js');
server.name = 'API';


//* Middleware van antes de las rutas

server.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
  // res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// * no mas rutas aca
server.use('/', routes);



// Error catching end ware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = { PORT, server }