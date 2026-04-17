const express = require("express");
const router = express.Router();
const Material = require("../models/Material");
const authMiddleware = require("../middleware/auth");
const path = require("path");

// GET all materials
router.get("/", authMiddleware, async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new material (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, subject, fileUrl } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const material = new Material({ title, description, subject, fileUrl });
    await material.save();
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update material (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, subject, fileUrl } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await Material.findByIdAndUpdate(
      req.params.id,
      { title, description, subject, fileUrl },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE material (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: "Material deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// ✅ PREVIEW route (inline open in browser)
router.get("/:id/preview", authMiddleware, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Force inline display instead of download
    res.setHeader("Content-Disposition", "inline");

    // If fileUrl is a local path on your server
    res.sendFile(path.resolve(material.fileUrl));

    // If fileUrl is external (like S3/Google Drive), use redirect:
    // res.redirect(material.fileUrl);
  } catch (err) {
    res.status(500).json({ message: "Preview failed" });
  }
});

module.exports = router;
