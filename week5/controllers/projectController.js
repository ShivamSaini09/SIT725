const projectService = require('../services/projectService');

// Handle the request to get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json({
            statusCode: 200,
            data: projects,
            message: 'Success',
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch projects', error });
    }
};

// Insert sample projects
const seedProjects = async (req, res) => {
    const sampleData = [
        {
            title: "Kitten 1",
            image: "images/image4.jpg",
            link: "About Kitten 1",
            description: "Fluffy and adorable kitten",
        },
        {
            title: "Kitten 2",
            image: "images/image5.jpg",
            link: "About Kitten 2",
            description: "Loves to nap in sunbeams",
        },
    ];

    try {
        await projectService.insertProjects(sampleData);
        res.status(200).json({ message: 'Sample data inserted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert sample data', error });
    }
};

module.exports = {
    getProjects,
    seedProjects,
};
