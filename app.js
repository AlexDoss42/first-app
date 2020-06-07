const EventEmitter = require("events");
var Logger = require("./logger");

logger.on("messageLogged", (arg) => {
  console.log('Listener called', arg);
});

const logger = new Logger();
logger.log('message');