const asyncHandler = require('express-async-handler');
const Complaint    = require('../models/Complaint');
const Notification = require('../models/Notification');

const getComplaints = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === 'employee') filter.raisedBy = req.user._id;
  if (req.query.status)   filter.status   = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.category) filter.category = req.query.category;

  const complaints = await Complaint.find(filter)
    .populate('raisedBy',  'name employeeId')
    .populate('assignedTo','name')
    .populate('project',   'title')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: complaints.length, complaints });
});

const getComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)
    .populate('raisedBy',  'name email phone employeeId')
    .populate('assignedTo','name email')
    .populate('resolvedBy','name');

  if (!complaint) { res.status(404); throw new Error('Complaint not found'); }
  res.json({ success: true, complaint });
});

const createComplaint = asyncHandler(async (req, res) => {
  req.body.raisedBy = req.user._id;
  const complaint = await Complaint.create(req.body);
  res.status(201).json({ success: true, complaint });
});

const updateComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!complaint) { res.status(404); throw new Error('Complaint not found'); }
  res.json({ success: true, complaint });
});

const resolveComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) { res.status(404); throw new Error('Complaint not found'); }

  complaint.status     = 'resolved';
  complaint.resolution = req.body.resolution;
  complaint.resolvedBy = req.user._id;
  complaint.resolvedAt = new Date();
  await complaint.save();

  await Notification.create({
    recipient: complaint.raisedBy,
    sender:    req.user._id,
    title:     'Complaint Resolved',
    message:   `Your complaint "${complaint.title}" has been resolved.`,
    type:      'complaint',
  });

  res.json({ success: true, complaint });
});

module.exports = { getComplaints, getComplaint, createComplaint, updateComplaint, resolveComplaint };
