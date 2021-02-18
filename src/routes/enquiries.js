const router = require('express').Router();
let Enquiry = require('../models/enquiries.model');
const authAdmin = require('../middleware/authAdmin');

router.post('/add', async(req, res) => {
    const enquiry = new Enquiry(req.body)
    try {
        await enquiry.save()
        res.status(201).send(enquiry)
    } catch (error) {
        res.status(400).send(error)
    }
    
})

router.get('/all', authAdmin,  async (req, res) => {
    try {
        const enquiries = await Enquiry.find({})
        res.status(200).send(enquiries)
    } catch (e) {
        res.status(400).send()
    }
    
})

module.exports = router;