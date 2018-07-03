// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = require('../app'); // The express app we just created

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const port = parseInt(process.env.PORT, 10) || PORT;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
console.log("Running on http://"+HOST+":"+port);
