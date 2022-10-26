const router = require('express').Router();
let User = require('../models/user.model');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken')

// Register
router.post('/add', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

// user log in
router.route('/login').post(async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const expirationDate = await jwt.decode(token).exp
        res.send({ user, token, expirationDate })
    } catch (e) {
        res.status(400).send(e)
    }
})

// list logged in user profile
router.get('/me', auth, (req, res) => {
    res.send(req.user)
})

// display details (logged in) user doesnt work
router.get('/users/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user)
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router;