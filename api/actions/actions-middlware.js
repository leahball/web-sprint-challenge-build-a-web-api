// add middlewares here related to actions

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

function validateActionsId(req, res, next) {
  console.log("validateActionsId middleware");
  next();
}

function validateActions(req, res, next) {
  console.log("validateActions middleware");
  next();
}

module.exports = {
  validateActionsId,
  validateActions,
  logger,
};
