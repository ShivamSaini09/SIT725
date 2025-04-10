const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route to fetch all projects
router.get('/projects', projectController.getProjects);

// Route to seed sample data
router.get('/seed', projectController.seedProjects);

module.exports = router;
