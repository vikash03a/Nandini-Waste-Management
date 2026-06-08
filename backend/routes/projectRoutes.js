const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProjects, getProject, createProject, updateProject,
  deleteProject, getProjectStats, uploadDocument,
} = require('../controllers/projectController');

const adminRoles    = ['super_admin', 'manager'];
const allStaffRoles = ['super_admin', 'manager', 'supervisor', 'employee'];

router.get   ('/',           protect, authorize(...allStaffRoles), getProjects);
router.get   ('/stats',      protect, authorize(...adminRoles),    getProjectStats);
router.get   ('/:id',        protect, authorize(...allStaffRoles), getProject);
router.post  ('/',           protect, authorize(...adminRoles),    createProject);
router.put   ('/:id',        protect, authorize(...adminRoles),    updateProject);
router.delete('/:id',        protect, authorize('super_admin'),    deleteProject);
router.post  ('/:id/documents', protect, authorize(...adminRoles), uploadDocument);

module.exports = router;
