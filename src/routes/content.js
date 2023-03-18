const router = require("express").Router();

let Content = require("../models/content.model");

router.post("/add", async (req, res) => {
  const post = new Content(req.body);
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const content = await Content.find({});
    res.status(200).send(content);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Content.findById(_id);

    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/mod/:id", async (req, res) => {
  try {
    const post = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) {
      res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Content.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
