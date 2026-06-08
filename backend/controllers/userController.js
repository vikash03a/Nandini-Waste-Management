const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc  Get all users
// @route GET /api/users
// @access Private/Admin,Manager
const getUsers = asyncHandler(async (req, res) => {
  const { role, isActive, search } = req.query;
  const filter = {};

  if (role)     filter.role     = role;
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  if (search) {
    filter.$or = [
      { name:  { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { employeeId: { $regex: search, $options: 'i' } },
    ];
  }

  const users = await User.find(filter)
    .populate('assignedMunicipality', 'name type')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: users.length, users });
});

// @desc  Get single user
// @route GET /api/users/:id
// @access Private/Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('assignedProjects', 'title status startDate endDate')
    .populate('assignedMunicipality', 'name type district');

  if (!user) { res.status(404); throw new Error('User not found'); }

  res.json({ success: true, user });
});

// @desc  Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });

  if (!user) { res.status(404); throw new Error('User not found'); }

  res.json({ success: true, user });
});

// @desc  Deactivate/activate user
// @route PUT /api/users/:id/toggle-status
// @access Private/Admin
const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error('User not found'); }

  user.isActive = !user.isActive;
  await user.save();

  res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}`, user });
});

// @desc  Delete user
// @route DELETE /api/users/:id
// @access Private/SuperAdmin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) { res.status(404); throw new Error('User not found'); }

  res.json({ success: true, message: 'User deleted' });
});

// @desc  Get dashboard stats
// @route GET /api/users/stats
// @access Private/Admin
const getUserStats = asyncHandler(async (req, res) => {
  const total       = await User.countDocuments();
  const active      = await User.countDocuments({ isActive: true });
  const byRole      = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } },
  ]);

  res.json({ success: true, stats: { total, active, inactive: total - active, byRole } });
});

module.exports = { getUsers, getUser, updateUser, toggleUserStatus, deleteUser, getUserStats };
