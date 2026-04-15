import express from "express";
import fs from "fs";
import multer from "multer";
import { uploadVideo } from "../middlewares/multer.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

// Upload video route
router.post("/upload-video", (req, res, next) => {
  uploadVideo.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer error
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum size allowed is 10MB (Cloudinary free plan limit)."
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      // Other error (like file filter error)
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    // No error, proceed to next middleware
    next();
  });
}, async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    // Upload to Cloudinary as a video
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "videos",
      timeout: 600000, // 10 minutes timeout
    });

    // Remove temporary file from server
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Delete temp file even if upload fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Handle specific Cloudinary errors
    if (error.http_code === 413) {
      return res.status(413).json({
        success: false,
        message: "File too large for Cloudinary free plan (10MB limit). Please try a smaller video or upgrade your Cloudinary plan."
      });
    }

    if (error.http_code === 400) {
      return res.status(400).json({
        success: false,
        message: "Invalid file format or corrupted video file."
      });
    }

    res.status(500).json({
      success: false,
      message: "Error uploading file to cloud storage"
    });
  }
});

export default router;
