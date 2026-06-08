const asyncHandler  = require('express-async-handler');
const Municipality  = require('../models/Municipality');

const getMunicipalities = asyncHandler(async (req, res) => {
  const { type, state, search } = req.query;
  const filter = {};
  if (type)   filter.type  = type;
  if (state)  filter.state = state;
  if (search) filter.name  = { $regex: search, $options: 'i' };

  const municipalities = await Municipality.find(filter)
    .populate('assignedManager', 'name email')
    .sort({ name: 1 });

  res.json({ success: true, count: municipalities.length, municipalities });
});

const getMunicipality = asyncHandler(async (req, res) => {
  const municipality = await Municipality.findById(req.params.id)
    .populate('assignedManager', 'name email phone');
  if (!municipality) { res.status(404); throw new Error('Municipality not found'); }
  res.json({ success: true, municipality });
});

const createMunicipality = asyncHandler(async (req, res) => {
  const municipality = await Municipality.create(req.body);
  res.status(201).json({ success: true, municipality });
});

const updateMunicipality = asyncHandler(async (req, res) => {
  const municipality = await Municipality.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!municipality) { res.status(404); throw new Error('Municipality not found'); }
  res.json({ success: true, municipality });
});

const deleteMunicipality = asyncHandler(async (req, res) => {
  await Municipality.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Municipality deleted' });
});

module.exports = { getMunicipalities, getMunicipality, createMunicipality, updateMunicipality, deleteMunicipality };
