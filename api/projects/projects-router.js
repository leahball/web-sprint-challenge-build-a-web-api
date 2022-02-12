const express = require("express");
const { validateProjectId, validateProject } = require("./projects-middleware");

const Project = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});
//Returns an array of projects as the body of the response.
//If there are no projects it responds with an empty array.

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});
//Returns a project with the given `id` as the body of the response.
//If there is no project with the given `id` it responds with a status code 404.

router.post("/", validateProject, (req, res, next) => {
  Project.insert({ name: req.name, description: req.description })
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});
//Returns the newly created project as the body of the response.
//If the request body is missing any of the required fields it responds with a status code 400.

router.put(
  "/:id",
  validateProjectId,
  validateProject,
  async (req, res, next) => {
    try {
      const updatedProject = await Project.update(req.validProjectId, req.body);
      res.status(200).json(updatedProject);
    } catch (err) {
      next(err);
    }
  }
);
//Returns the updated project as the body of the response.
//If there is no project with the given `id` it responds with a status code 404.
//If the request body is missing any of the required fields it responds with a status code 400.

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});
//Returns no response body.
//If there is no project with the given `id` it responds with a status code 404.

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const actions = await Project.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});
//Returns an array of actions (could be empty) belonging to a project with the given `id`.
//If there is no project with the given `id` it responds with a status code 404.

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "uh oh something bad happened",
    message: err.message,
    stack: err.stack,
  });
});
module.exports = router;
