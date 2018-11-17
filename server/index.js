import express from 'express';
import bodyParser from 'body-parser';
import routes from './api/routes';
import dbConnector from './db/dbConnector';
import jwt from 'jsonwebtoken';
import user from './db/schemas/user';
import config from './config';
const compression = require('compression');
const app = express();
let session = require('express-session');
let cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
  secret: "secret Key!",
  httpOnly: false,
  cookie: { secure: false }
  }));

// dbConnector.connect();
app.use(express.static('public'));
app.set('superSecret', config.secret);
app.use(compression());
app.use(bodyParser.json());
app.use(function(req, res, next){
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use(express.static(__dirname +'/assets'));


app.use('/task-tracker/api', routes);
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send(`Hello!!! The API is at ${PORT}`);
});
app.listen(PORT, err => {
  if(err)
    console.error(`Error on port: ${PORT}`);
  else
    console.log(`Listening on port: ${PORT}-${process.env.NODE_ENV} mode`);
});
