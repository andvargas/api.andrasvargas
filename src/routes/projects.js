const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

let Project = require("../models/portfolio.model");
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const project = await Project.findById(_id);
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
});

router.route("/add").post(
  auth,
  upload.single("image"),
  async (req, res) => {
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      image: req.file.buffer,
      link: req.body.link,
      status: req.body.status,
      buttonLeft: req.body.buttonLeft,
      buttonRight: req.body.buttonRight,
    });

    await newProject
      .save()
      .then(() => res.json("New Project added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Modify project - doesnt work
router.patch("/mod/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!project) {
      return res.status(400).send();
    }

    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// serve the image
router.get("/:id/img", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    console.log("project");
    if (!project || !project.image) {
      throw new Error();
    }

    res.set("Content-Type", "image/jpg");
    res.send(project.image);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
