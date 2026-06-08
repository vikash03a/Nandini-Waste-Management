const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getUsers, getUser, updateUser, toggleUserStatus, deleteUser, getUserStats,
} = require('../controllers/userController');

const adminRoles = ['super_admin', 'manager'];

router.get   ('/',           protect, authorize(...adminRoles), getUsers);
router.get   ('/stats',      protect, authorize(...adminRoles), getUserStats);
router.get   ('/:id',        protect, authorize(...adminRoles), getUser);
router.put   ('/:id',        protect, authorize(...adminRoles), updateUser);
router.put   ('/:id/toggle-status', protect, authorize('super_admin'), toggleUserStatus);
router.delete('/:id',        protect, authorize('super_admin'), deleteUser);

module.exports = router;
