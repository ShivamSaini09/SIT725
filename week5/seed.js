const mongoose = require("mongoose");
const projectService = require("./services/projectService");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");

  // Seed sample data
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

  // Insert the sample data
  projectService.insertProjects(sampleData)
    .then(() => {
      console.log("Sample data inserted successfully");
      mongoose.connection.close();
    })
    .catch(err => console.error("Error inserting sample data:", err));
});
