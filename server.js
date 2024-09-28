const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS (or any other template engine you're using)
app.set("view engine", "ejs");

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the teacher profile page (modify this for your data fetching)
app.get("/teacher_profile.html", (req, res) => {
  const teacherId = req.query.id;

  const teachers = [
    {
      id: 1,
      name: "Emily",
      role: "Developer",
      playlists: 4,
      videos: 18,
      likes: 1208,
    },
    {
      id: 2,
      name: "John Deo",
      role: "Developer",
      playlists: 23,
      videos: 6,
      likes: 690,
    },
    // Add more teacher data here
  ];

  const teacher = teachers.find((t) => t.id == teacherId);

  if (teacher) {
    res.render("teacher_profile", { teacher });
  } else {
    res.status(404).send("Teacher not found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
