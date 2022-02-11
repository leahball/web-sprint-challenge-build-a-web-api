// add middlewares here related to actions

function logger(req, res, next) {
  console.log(logger);
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
  logger,
  validateActionsId,
  validateActions,
};
