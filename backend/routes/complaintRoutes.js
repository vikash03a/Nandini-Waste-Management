const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getComplaints, getComplaint, createComplaint, updateComplaint, resolveComplaint,
} = require('../controllers/complaintController');

const all      = ['super_admin','manager','supervisor','employee'];
const managers = ['super_admin','manager','supervisor'];

router.get ('/',              protect, authorize(...all),      getComplaints);
router.get ('/:id',           protect, authorize(...all),      getComplaint);
router.post('/',              protect, authorize(...all),      createComplaint);
router.put ('/:id',           protect, authorize(...managers), updateComplaint);
router.put ('/:id/resolve',   protect, authorize(...managers), resolveComplaint);

module.exports = router;
