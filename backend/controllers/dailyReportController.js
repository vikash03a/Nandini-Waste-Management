const asyncHandler  = require('express-async-handler');
const DailyReport   = require('../models/DailyReport');
const Notification  = require('../models/Notification');

// @desc  Get reports (filtered by role)
// @route GET /api/daily-reports
// @access Private
const getReports = asyncHandler(async (req, res) => {
  const { project, status, startDate, endDate, employee } = req.query;
  const filter = {};

  if (project)   filter.project    = project;
  if (status)    filter.status     = status;
  if (employee)  filter.employee   = employee;
  if (startDate || endDate) {
    filter.reportDate = {};
    if (startDate) filter.reportDate.$gte = new Date(startDate);
    if (endDate)   filter.reportDate.$lte = new Date(endDate);
  }

  // Employees see only their own reports
  if (req.user.role === 'employee') filter.employee = req.user._id;

  const reports = await DailyReport.find(filter)
    .populate('employee',     'name employeeId avatar')
    .populate('project',      'title')
    .populate('municipality', 'name type')
    .populate('reviewedBy',   'name')
    .sort({ reportDate: -1 });

  res.json({ success: true, count: reports.length, reports });
});

// @desc  Get single report
// @route GET /api/daily-reports/:id
// @access Private
const getReport = asyncHandler(async (req, res) => {
  const report = await DailyReport.findById(req.params.id)
    .populate('employee',     'name employeeId avatar designation')
    .populate('project',      'title projectType')
    .populate('municipality', 'name type district')
    .populate('reviewedBy',   'name role');

  if (!report) { res.status(404); throw new Error('Report not found'); }

  res.json({ success: true, report });
});

// @desc  Submit daily report
// @route POST /api/daily-reports
// @access Private
const createReport = asyncHandler(async (req, res) => {
  req.body.employee = req.user._id;

  // Check duplicate for same day
  const existing = await DailyReport.findOne({
    employee:   req.user._id,
    project:    req.body.project,
    reportDate: {
      $gte: new Date(new Date(req.body.reportDate).setHours(0,0,0,0)),
      $lte: new Date(new Date(req.body.reportDate).setHours(23,59,59,999)),
    },
  });

  if (existing) {
    res.status(400);
    throw new Error('Report already submitted for this project today');
  }

  const report = await DailyReport.create(req.body);

  res.status(201).json({ success: true, report });
});

// @desc  Update report (employee — only if pending)
// @route PUT /api/daily-reports/:id
// @access Private
const updateReport = asyncHandler(async (req, res) => {
  const report = await DailyReport.findById(req.params.id);
  if (!report) { res.status(404); throw new Error('Report not found'); }

  // Employees can only edit their own submitted (not yet reviewed) reports
  if (req.user.role === 'employee') {
    if (String(report.employee) !== String(req.user._id)) {
      res.status(403); throw new Error('Not authorized');
    }
    if (report.status !== 'submitted') {
      res.status(400); throw new Error('Cannot edit a reviewed report');
    }
  }

  Object.assign(report, req.body);
  await report.save();

  res.json({ success: true, report });
});

// @desc  Review / approve / reject report
// @route PUT /api/daily-reports/:id/review
// @access Private/Admin,Manager,Supervisor
const reviewReport = asyncHandler(async (req, res) => {
  const { status, reviewNote } = req.body;
  const report = await DailyReport.findById(req.params.id);
  if (!report) { res.status(404); throw new Error('Report not found'); }

  report.status     = status;
  report.reviewNote = reviewNote;
  report.reviewedBy = req.user._id;
  report.reviewedAt = Date.now();
  await report.save();

  // Notify employee
  await Notification.create({
    recipient: report.employee,
    sender:    req.user._id,
    title:     `Report ${status}`,
    message:   `Your daily report has been ${status}. ${reviewNote || ''}`,
    type:      'report',
  });

  res.json({ success: true, report });
});

// @desc  Dashboard summary stats
// @route GET /api/daily-reports/stats
// @access Private
const getReportStats = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filter = {};
  if (req.user.role === 'employee') filter.employee = req.user._id;

  const [total, todayCount, approved, pending] = await Promise.all([
    DailyReport.countDocuments(filter),
    DailyReport.countDocuments({ ...filter, reportDate: { $gte: today } }),
    DailyReport.countDocuments({ ...filter, status: 'approved' }),
    DailyReport.countDocuments({ ...filter, status: 'submitted' }),
  ]);

  res.json({ success: true, stats: { total, todayCount, approved, pending } });
});

module.exports = { getReports, getReport, createReport, updateReport, reviewReport, getReportStats };
