// ─── attendanceRoutes.js ───────────────────────────────────────────
const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  checkIn, checkOut, getAttendance, getTodayStatus, getAttendanceStats,
} = require('../controllers/attendanceController');

const all = ['super_admin','manager','supervisor','employee'];

router.post('/check-in',  protect, authorize(...all), checkIn);
router.put ('/check-out', protect, authorize(...all), checkOut);
router.get ('/today',     protect, authorize(...all), getTodayStatus);
router.get ('/stats',     protect, authorize(...all), getAttendanceStats);
router.get ('/',          protect, authorize(...all), getAttendance);

module.exports = router;
