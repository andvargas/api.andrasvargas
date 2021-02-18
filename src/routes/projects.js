const router = require('express').Router();
const auth = require('../middleware/auth')
const upload = require('../middleware/upload');

let Project = require('../models/portfolio.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(auth, upload.single('image'), async(req, res) => {
    const newProject = new Project({ 
        title: req.body.title,
        description: req.body.description,
        image: req.file.buffer
    });

    await newProject.save()
        .then(() => res.json('New Project added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

// serve the image
router.get('/:id/img', async(req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        console.log('project')
        if (!project || !project.image) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(project.image)
        
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;