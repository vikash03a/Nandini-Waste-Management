const asyncHandler = require('express-async-handler');
const Attendance   = require('../models/Attendance');

// @desc  Check-in
// @route POST /api/attendance/check-in
// @access Private
const checkIn = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await Attendance.findOne({
    employee: req.user._id,
    date:     { $gte: today },
  });

  if (existing?.checkIn?.time) {
    res.status(400);
    throw new Error('Already checked in today');
  }

  const record = existing || new Attendance({ employee: req.user._id, date: new Date() });
  record.checkIn = {
    time:      new Date(),
    latitude:  req.body.latitude,
    longitude: req.body.longitude,
    address:   req.body.address,
  };
  record.project = req.body.project;
  record.status  = 'present';
  await record.save();

  res.json({ success: true, message: 'Checked in successfully', attendance: record });
});

// @desc  Check-out
// @route PUT /api/attendance/check-out
// @access Private
const checkOut = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const record = await Attendance.findOne({
    employee: req.user._id,
    date:     { $gte: today },
  });

  if (!record?.checkIn?.time) {
    res.status(400); throw new Error('No check-in found for today');
  }
  if (record.checkOut?.time) {
    res.status(400); throw new Error('Already checked out today');
  }

  record.checkOut = {
    time:      new Date(),
    latitude:  req.body.latitude,
    longitude: req.body.longitude,
    address:   req.body.address,
  };
  await record.save();

  res.json({ success: true, message: 'Checked out successfully', attendance: record });
});

// @desc  Get attendance history
// @route GET /api/attendance
// @access Private
const getAttendance = asyncHandler(async (req, res) => {
  const { employee, startDate, endDate, status } = req.query;
  const filter = {};

  // Employees see only their own
  if (req.user.role === 'employee') filter.employee = req.user._id;
  else if (employee) filter.employee = employee;

  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate)   filter.date.$lte = new Date(endDate);
  }

  const records = await Attendance.find(filter)
    .populate('employee', 'name employeeId')
    .populate('project',  'title')
    .sort({ date: -1 });

  res.json({ success: true, count: records.length, records });
});

// @desc  Get today's status for current user
// @route GET /api/attendance/today
// @access Private
const getTodayStatus = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const record = await Attendance.findOne({
    employee: req.user._id,
    date:     { $gte: today },
  });

  res.json({ success: true, attendance: record || null });
});

// @desc  Get attendance stats
// @route GET /api/attendance/stats
// @access Private
const getAttendanceStats = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === 'employee') filter.employee = req.user._id;

  const thisMonth = new Date();
  thisMonth.setDate(1); thisMonth.setHours(0, 0, 0, 0);

  const [totalPresent, totalAbsent, monthPresent] = await Promise.all([
    Attendance.countDocuments({ ...filter, status: 'present' }),
    Attendance.countDocuments({ ...filter, status: 'absent' }),
    Attendance.countDocuments({ ...filter, status: 'present', date: { $gte: thisMonth } }),
  ]);

  res.json({ success: true, stats: { totalPresent, totalAbsent, monthPresent } });
});

module.exports = { checkIn, checkOut, getAttendance, getTodayStatus, getAttendanceStats };
