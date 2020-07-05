const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const router = new (require("restify-router").Router)();

// CORS configuration
const cors = corsMiddleware({
  origins: ["*"],
});

// Server configuration
const server = restify.createServer({
  name: "api",
  version: "1.0.0",
});

const logger = require("./basic-logger");

// Routes
const itens = require("./routes/itens.js");

// Middlewares
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

router.add("/itens", itens);
router.applyRoutes(server);

server.listen(3000, function () {
  logger.info("%s listening at %s", server.name, server.url);
});

server.on(
  "after",
  restify.plugins.metrics({ server: server }, function onMetrics(err, metrics) {
    logger.trace(
      `${metrics.method} ${metrics.path} ${metrics.statusCode} ${metrics.latency} ms`
    );
  })
);

server.on("uncaughtException", function (req, res, route, err) {
  logger.error(err);
});
