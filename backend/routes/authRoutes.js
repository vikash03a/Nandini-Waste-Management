const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  register, login, getMe, updateProfile, changePassword,
} = require('../controllers/authController');

router.post('/register', protect, authorize('super_admin', 'manager'), register);
router.post('/login',    login);
router.get ('/me',       protect, getMe);
router.put ('/update-profile', protect, updateProfile);
router.put ('/change-password', protect, changePassword);

module.exports = router;
