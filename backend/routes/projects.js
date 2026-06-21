const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET featured projects only
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST seed default projects
router.post('/seed', async (req, res) => {
  try {
    await Project.deleteMany({});
    const defaults = [
      {
        title: 'Smart Public Issue Reporting System',
        description: 'A full-stack civic tech platform for 3 user roles (citizen, officer, admin) with real-time complaint tracking across 5 status stages. Features Cloudinary image uploads, JWT auth, Google Maps integration, and Recharts dashboards.',
        techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Cloudinary', 'Google Maps API', 'Recharts'],
        liveLink: 'https://your-live-link.vercel.app',
        githubLink: 'https://github.com/praveen-analyze',
        featured: true,
        order: 1,
      },
      {
        title: 'Pizza Palace – Food Ordering Platform',
        description: 'Full-stack online food ordering platform with cart management, order tracking, and Razorpay payment gateway. Deployed live on Vercel (frontend) and Render (backend) with Firebase Auth and MongoDB Atlas.',
        techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Firebase', 'Razorpay', 'Vercel', 'Render'],
        liveLink: 'https://your-pizza-palace.vercel.app',
        githubLink: 'https://github.com/praveen-analyze',
        featured: true,
        order: 2,
      },
      {
        title: 'Bulk Email Application',
        description: 'MERN stack bulk email platform with JWT auth, Nodemailer integration, per-recipient delivery tracking, and a Tiptap WYSIWYG editor. Dark-themed UI with real-time send status.',
        techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Nodemailer', 'Tiptap'],
        liveLink: '',
        githubLink: 'https://github.com/praveen-analyze',
        featured: false,
        order: 3,
      }
    ];
    const inserted = await Project.insertMany(defaults);
    res.json({ message: 'Seeded', count: inserted.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
