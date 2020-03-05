const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = 3000;

logger.info("🤖 Initializing middleware");
// stacking middleware => middleware is base on the request response cycle.
// When a resquest is comming, can response to the request and do something
// before the send response
// middleware => allow to add a logger or do anything in between
// middleware => in between to do operatio before the app level operation
app.use(bodyParser.json());
app.use(morgan("tiny", { stream: logger.stream }));
app.use("/", router);

// if an exception is throw, it will come here
// need to be the last piece of code before the listen
// to be able to catch all errors

app.use(errorHandler);

// Serve the application at the given port
app.listen(port, () => {
  logger.info(`🎧 Listening at http://localhost:${port}/`);
});
