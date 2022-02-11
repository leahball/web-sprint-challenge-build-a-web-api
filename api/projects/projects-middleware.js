// add middlewares here related to projects

function validateProjectId(req, res, next) {
  console.log("validateProjectId middleware");
  next();
}

function validateProject(req, res, next) {
  console.log("validateProject middleware");
  next();
}

module.exports = {
  validateProjectId,
  validateProject,
};
