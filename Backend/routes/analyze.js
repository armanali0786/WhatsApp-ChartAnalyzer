const express = require("express");
const multer = require("multer");
const { parseChat } = require("../utils/parser");

const router = express.Router();
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } });

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }

  try {
    const text = req.file.buffer.toString("utf-8");
    const data = parseChat(text);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
