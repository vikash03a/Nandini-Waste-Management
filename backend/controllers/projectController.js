const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const User    = require('../models/User');

// @desc  Get all projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  const { status, projectType, search } = req.query;
  const filter = {};

  if (status)      filter.status      = status;
  if (projectType) filter.projectType = projectType;
  if (search)      filter.title       = { $regex: search, $options: 'i' };

  // Employees only see their assigned projects
  if (req.user.role === 'employee' || req.user.role === 'supervisor') {
    filter.assignedEmployees = req.user._id;
  }

  const projects = await Project.find(filter)
    .populate('municipality', 'name type district state')
    .populate('assignedManager', 'name email')
    .populate('assignedSupervisor', 'name email')
    .populate('assignedEmployees', 'name employeeId')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: projects.length, projects });
});

// @desc  Get single project
// @route GET /api/projects/:id
// @access Private
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('municipality')
    .populate('assignedManager', 'name email phone')
    .populate('assignedSupervisor', 'name email phone')
    .populate('assignedEmployees', 'name employeeId designation');

  if (!project) { res.status(404); throw new Error('Project not found'); }

  res.json({ success: true, project });
});

// @desc  Create project
// @route POST /api/projects
// @access Private/Admin,Manager
const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);

  // Update assignedProjects on users
  if (req.body.assignedEmployees?.length) {
    await User.updateMany(
      { _id: { $in: req.body.assignedEmployees } },
      { $addToSet: { assignedProjects: project._id } }
    );
  }

  res.status(201).json({ success: true, project });
});

// @desc  Update project
// @route PUT /api/projects/:id
// @access Private/Admin,Manager
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  }).populate('municipality', 'name type');

  if (!project) { res.status(404); throw new Error('Project not found'); }

  res.json({ success: true, project });
});

// @desc  Delete project
// @route DELETE /api/projects/:id
// @access Private/SuperAdmin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }

  res.json({ success: true, message: 'Project deleted' });
});

// @desc  Get project stats for dashboard
// @route GET /api/projects/stats
// @access Private/Admin,Manager
const getProjectStats = asyncHandler(async (req, res) => {
  const total     = await Project.countDocuments();
  const ongoing   = await Project.countDocuments({ status: 'ongoing' });
  const completed = await Project.countDocuments({ status: 'completed' });
  const upcoming  = await Project.countDocuments({ status: 'upcoming' });
  const byType    = await Project.aggregate([
    { $group: { _id: '$projectType', count: { $sum: 1 } } },
  ]);

  res.json({ success: true, stats: { total, ongoing, completed, upcoming, byType } });
});

// @desc  Upload document to project
// @route POST /api/projects/:id/documents
// @access Private/Admin,Manager
const uploadDocument = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }

  project.documents.push({ name: req.body.name, url: req.body.url });
  await project.save();

  res.json({ success: true, project });
});

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject, getProjectStats, uploadDocument };
