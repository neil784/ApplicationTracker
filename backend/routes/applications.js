const express = require('express')
const router = express.Router()
const Application = require('../models/application')
const User = require('../models/user')

// GET all
router.get('/', async(req, res) => {
    try {
        const user = await User.findOne({_id: req.query.userid})
        const applications = []
        for (let i = 0; i < user.applications.length; i++) {
            applications.push(await Application.findById(user.applications[i]))
        }
        return res.status(200).json({message: "OK", data: applications})
    } catch (err) {
        return res.status(500).json({message: err.message, data: []})
    }
})

// POST one
router.post('/', async(req, res) => {
    try {
        const application = new Application({
            company: req.body.company,
            position: req.body.position,
            dateApplied: req.body.dateApplied,
            salary: req.body.salary,
            notes: req.body.notes,
            status: req.body.status
        })
        await application.save()
        const user = await User.findById(req.body.userid)
        user.applications.push(application._id)
        await user.save()
        return res.status(201).json({message: "Application created", data: application})
    } catch (err) {
        return res.status(500).json({message: err.message, data:{}})
    }
})

// Middleware for getting specific application
async function getApplication(req, res, next) {
    let application
    try {
        application = await Application.findById(req.params.id)
        if (application == null) {
            return res.status(404).json({message: "Cannot find application", data: {}})
        }
    } catch (err) {
        return res.status(404).json({message: "ID is not valid", data: {}})
    }
    res.application = application
    next()
}

// GET one
router.get('/:id', getApplication, async(req, res) => {
    try {
        return res.status(200).json({message: "OK", data: res.application})
    } catch (err) {
        return res.status(500).json({message: err.message, data:{}})
    } 
})

// PUT one
router.put('/:id', getApplication, async(req, res) => {
    try {
        res.application.company = req.body.company
        res.application.position = req.body.position
        res.application.dateApplied = req.body.dateApplied
        res.application.salary = req.body.salary
        res.application.notes = req.body.notes
        res.application.status = req.body.status
        await res.application.save()
        return res.status(200).json({message: "OK", data: res.application})
    } catch (err) {
        return res.status(500).json({message: err.message, data:{}})
    } 
})

// DELETE one
router.delete('/', async (req, res) => {
    try {
      const user = await User.findById(req.query.userid)
      if (!user) {
        return res.status(404).json({ message: "User not found", data: {} })
      }
  
      const index = user.applications.indexOf(req.query.applicationid)
      if (index !== -1) {
        user.applications.splice(index, 1)
        await user.save()
      }

      const application = await Application.findById(req.query.applicationid)
      await application.remove()
      return res.status(200).json({ message: "Application deleted", data: {} })
    } catch (err) {
      return res.status(500).json({ message: err.message, data: {} })
    }
})  

module.exports = router