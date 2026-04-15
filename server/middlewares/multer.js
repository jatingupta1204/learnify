import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for images
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// File filter for videos
const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// Configure multer for images (profile photos, thumbnails)
export const uploadImage = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for images
    files: 1,
  },
});

// Configure multer for videos
export const uploadVideo = multer({
  storage: storage,
  fileFilter: videoFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for videos (Cloudinary free plan)
    files: 1,
  },
});

// Default export for backward compatibility (videos)
const upload = multer({
  storage: storage,
  fileFilter: videoFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for videos
    files: 1,
  },
});

export default upload;
