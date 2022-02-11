// add middlewares here related to projects

function loggerP(req, res, next) {
  console.log(loggerP);
  next();
}

function validateProjectId(req, res, next) {
  console.log("validateProjectId middleware");
  next();
}

function validateProject(req, res, next) {
  console.log("validateProject middleware");
  next();
}

module.exports = {
  loggerP,
  validateProjectId,
  validateProject,
};
