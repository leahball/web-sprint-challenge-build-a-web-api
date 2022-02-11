// Write your "projects" router here!
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
//`[GET] /api/projects`
//Returns an array of projects as the body of the response.
//If there are no projects it responds with an empty array.

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});
//`[GET] /api/projects/:id`
//Returns a project with the given `id` as the body of the response.
//If there is no project with the given `id` it responds with a status code 404.

router.post("/", validateProject, (req, res, next) => {
  Project.insert({ name: req.name, description: req.description })
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});
//`[POST] /api/projects`
//Returns the newly created project as the body of the response.
//If the request body is missing any of the required fields it responds with a status code 400.

//NOT WORKING
router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  Project.update(req.params.id, {
    name: req.name,
    description: req.description,
  })
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch(next);
});
//`[PUT] /api/projects/:id`
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
//`[DELETE] /api/projects/:id`
//Returns no response body.
//If there is no project with the given `id` it responds with a status code 404.

router.get("/:id/actions", validateProjectId, (req, res) => {
  console.log(req.project);
});
//`[GET] /api/projects/:id/actions`
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
