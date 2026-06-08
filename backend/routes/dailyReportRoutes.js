const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getReports, getReport, createReport, updateReport, reviewReport, getReportStats,
} = require('../controllers/dailyReportController');

const reviewerRoles = ['super_admin', 'manager', 'supervisor'];
const allRoles      = ['super_admin', 'manager', 'supervisor', 'employee'];

router.get ('/',        protect, authorize(...allRoles),      getReports);
router.get ('/stats',   protect, authorize(...allRoles),      getReportStats);
router.get ('/:id',     protect, authorize(...allRoles),      getReport);
router.post('/',        protect, authorize(...allRoles),      createReport);
router.put ('/:id',     protect, authorize(...allRoles),      updateReport);
router.put ('/:id/review', protect, authorize(...reviewerRoles), reviewReport);

module.exports = router;
