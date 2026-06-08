const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Helper: send token response
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id:         user._id,
      name:        user.name,
      email:       user.email,
      role:        user.role,
      employeeId:  user.employeeId,
      avatar:      user.avatar,
      department:  user.department,
      designation: user.designation,
      phone:       user.phone,
    },
  });
};

// @desc  Register (admin only creates users — public reg disabled)
// @route POST /api/auth/register
// @access Private/Admin
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, department, designation, joiningDate } = req.body;

  const user = await User.create({
    name, email, password, role: role || 'employee',
    phone, department, designation, joiningDate,
    employeeId: `NWM-${Date.now().toString().slice(-6)}`,
  });

  sendToken(user, 201, res);
});

// @desc  Login
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error('Your account has been deactivated. Contact admin.');
  }

  sendToken(user, 200, res);
});

// @desc  Get current logged-in user
// @route GET /api/auth/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('assignedProjects', 'title status')
    .populate('assignedMunicipality', 'name type');

  res.json({ success: true, user });
});

// @desc  Update profile
// @route PUT /api/auth/update-profile
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, address, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone, address, avatar },
    { new: true, runValidators: true }
  );

  res.json({ success: true, user });
});

// @desc  Change password
// @route PUT /api/auth/change-password
// @access Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.matchPassword(currentPassword))) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: 'Password updated successfully' });
});

module.exports = { register, login, getMe, updateProfile, changePassword };
