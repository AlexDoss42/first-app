const EventEmitter = require("events");
var Logger = require("./logger");
const http = require("http");
const server = http.createServer();

server.on('connection', (socket) => {
  console.log("New Connection...");
});

logger.on("messageLogged", (arg) => {
  console.log('Listener called', arg);
});

const logger = new Logger();
logger.log('message');

server.listen(3000);