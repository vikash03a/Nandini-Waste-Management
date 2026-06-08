const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');
const { uploadWorkImages, uploadDocuments, uploadAvatars, uploadGallery } = require('../config/cloudinary');
const { uploadImages, uploadFile, deleteFile } = require('../controllers/uploadController');

router.post('/images',    protect, uploadWorkImages.array('images', 10), uploadImages);
router.post('/document',  protect, uploadDocuments.single('file'),       uploadFile);
router.post('/avatar',    protect, uploadAvatars.single('avatar'),       uploadFile);
router.post('/gallery',   protect, uploadGallery.array('media', 10),     uploadImages);
router.delete('/:publicId', protect, deleteFile);

module.exports = router;
