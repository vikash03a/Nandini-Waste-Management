const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getNotifications, markAsRead, markAllAsRead, createBroadcast,
} = require('../controllers/notificationController');

const all    = ['super_admin','manager','supervisor','employee'];
const admins = ['super_admin','manager'];

router.get ('/',           protect, authorize(...all),    getNotifications);
router.put ('/read-all',   protect, authorize(...all),    markAllAsRead);
router.put ('/:id/read',   protect, authorize(...all),    markAsRead);
router.post('/broadcast',  protect, authorize(...admins), createBroadcast);

module.exports = router;
