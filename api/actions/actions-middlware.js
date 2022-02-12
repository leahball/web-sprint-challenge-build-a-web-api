// add middlewares here related to actions
const Action = require("./actions-model");

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "no such action",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding action",
    });
  }
  next();
}

function validateAction(req, res, next) {
  const { project_id, notes, description } = req.body;
  if (!notes || !description || !project_id) {
    res.status(400).json({
      message: "missing required fields",
    });
  } else {
    req.notes = notes;
    req.description = description;
    req.project_id = project_id;
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
  logger,
};
