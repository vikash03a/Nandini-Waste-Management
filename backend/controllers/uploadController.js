const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../config/cloudinary');

// @desc  Upload images (work report photos)
// @route POST /api/upload/images
// @access Private
const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400); throw new Error('No files uploaded');
  }

  const uploaded = req.files.map(file => ({
    url:      file.path,
    publicId: file.filename,
  }));

  res.json({ success: true, files: uploaded });
});

// @desc  Upload single file (document/avatar)
// @route POST /api/upload/file
// @access Private
const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400); throw new Error('No file uploaded');
  }

  res.json({
    success: true,
    file: { url: req.file.path, publicId: req.file.filename },
  });
});

// @desc  Delete file from Cloudinary
// @route DELETE /api/upload/:publicId
// @access Private
const deleteFile = asyncHandler(async (req, res) => {
  const { publicId } = req.params;
  await cloudinary.uploader.destroy(publicId);
  res.json({ success: true, message: 'File deleted' });
});

module.exports = { uploadImages, uploadFile, deleteFile };
