const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generic storage factory
const createStorage = (folder, allowedFormats) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `nandini-wms/${folder}`,
      allowed_formats: allowedFormats,
      resource_type: 'auto',
    },
  });

const uploadWorkImages = multer({ storage: createStorage('work-reports', ['jpg','jpeg','png','webp']) });
const uploadDocuments  = multer({ storage: createStorage('documents',    ['pdf','doc','docx']) });
const uploadAvatars    = multer({ storage: createStorage('avatars',      ['jpg','jpeg','png','webp']) });
const uploadGallery    = multer({ storage: createStorage('gallery',      ['jpg','jpeg','png','webp','mp4','mov']) });

module.exports = { cloudinary, uploadWorkImages, uploadDocuments, uploadAvatars, uploadGallery };
