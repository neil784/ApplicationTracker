const express = require('express')
const router = express.Router()
const User = require('../models/user')

// GET all
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({message: "OK", data: users})
    } catch (err) {
        return res.status(500).json({message: err.message, data: []})
    }
})

// PUT one (login)
router.put('/', async(req, res) => {
    try {
        const user = await User.find({"email": req.body.email})
        if (user.length == 0) {
            return res.status(200).json({message: "Error: email does not exist", data:{}})
        }
        if (user[0].password != req.body.password) {
            return res.status(200).json({message: "Error: incorrect password", data:{}}) 
        }
        return res.status(200).json({message: "OK", data: user[0]._id})
    } catch (err) {
        return res.status(500).json({message: err.message, data: []})
    }
})

// POST one (signup)
router.post('/', async(req, res) => {
    try {
        const existingUsers = await User.find({"email": req.body.email})
        if (existingUsers.length != 0) {
            return res.status(400).json({message: "Error: email already exists", data:{}})
        }

        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            applications: []
        })
        await user.save()
        return res.status(201).json({message: "User created", data: user._id})
    } catch (err) {
        return res.status(500).json({message: err.message, data:{}})
    }
})

// Middleware for getting specific user
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: "Cannot find user", data: {}})
        }
    } catch (err) {
        return res.status(404).json({message: "ID is not valid", data: {}})
    }
    res.user = user
    next()
}

// GET name
router.get('/:id', getUser, async(req, res) => {
    try {
        return res.status(200).json({message: "OK", data: res.user})
    } catch (err) {
        return res.status(500).json({message: err.message, data: []})
    }
})

// DELETE one
router.delete('/:id', getUser, async(req, res) => {
    try {
        await res.user.remove()
        return res.status(200).json({message: "User deleted", data: {}})
    } catch (err) {
        return res.status(500).json({message: err.message, data: {}})
    }
})

module.exports = router