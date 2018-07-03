const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const dotenv     = require('dotenv');
const cors       = require('cors');
const methodOverride = require('method-override');
const compression = require("compression");
const authHelper  = require("./server/helpers/authhelper");

const app = express();
app.use(express.static(__dirname + '/client/dist'));
app.use(compression());
app.use(cors());

// We are using the dotenv library to load our environmental variables from the .env file.
dotenv.load();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(authHelper.verifyJwtToken);

// Require our routes into the application.
require('./server/routes')(app);
// app.get('*', function(req, res) {
//     res.sendfile('./client/dist/index.html'); // load our public/index.html file
// });

module.exports = app;