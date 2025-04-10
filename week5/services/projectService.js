// services/projectService.js
const Project = require('../models/projectModel');

// Function to get all projects
const getAllProjects = async () => {
    try {
        return await Project.find({});
    } catch (error) {
        throw new Error('Error fetching projects');
    }
};

module.exports = {
    getAllProjects,
};
