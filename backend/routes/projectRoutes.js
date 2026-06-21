const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/projects - Public: get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/projects/featured - Public: get featured projects only
router.get("/featured", async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/projects/:id - Public: get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/projects - Admin: create project
router.post("/", protect, async (req, res) => {
  const { title, description, techStack, liveLink, githubLink, imageUrl, featured, order } = req.body;

  if (!title || !description || !techStack)
    return res.status(400).json({ message: "Title, description, and techStack are required" });

  try {
    const project = await Project.create({
      title,
      description,
      techStack,
      liveLink,
      githubLink,
      imageUrl,
      featured: featured || false,
      order: order || 0,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/projects/:id - Admin: update project
router.put("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/projects/:id - Admin: delete project
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/projects/seed - Admin: seed default projects from resume
router.post("/seed/data", protect, async (req, res) => {
  try {
    const existing = await Project.countDocuments();
    if (existing > 0)
      return res.status(400).json({ message: "Projects already seeded" });

    const projects = [
      {
        title: "Smart Public Issue Reporting & Management System",
        description:
          "A full-stack civic tech platform for 3 user roles (citizen, officer, admin) with real-time complaint tracking across 5 status stages. Features Cloudinary image uploads, role-based JWT auth, and 15+ optimized REST API endpoints.",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Cloudinary", "Tailwind CSS"],
        liveLink: "https://your-live-link.vercel.app",
        githubLink: "https://github.com/praveen-analyze/municipal-system",
        imageUrl: "",
        featured: true,
        order: 1,
      },
      {
        title: "Pizza Palace – Full-Stack Food Ordering Platform",
        description:
          "A production-deployed food ordering platform with cart, order tracking, and Razorpay payment gateway. Secured 8+ protected routes via Firebase Auth tokens validated by Express.js middleware. Live on Vercel + Render.",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Firebase", "Razorpay", "Tailwind CSS"],
        liveLink: "https://pizza-palace.vercel.app",
        githubLink: "https://github.com/praveen-analyze/pizza-palace",
        imageUrl: "",
        featured: true,
        order: 2,
      },
    ];

    await Project.insertMany(projects);
    res.status(201).json({ message: "Projects seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
