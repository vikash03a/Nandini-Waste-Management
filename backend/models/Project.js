const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String },
    municipality:{ type: mongoose.Schema.Types.ObjectId, ref: 'Municipality', required: true },
    projectType: {
      type: String,
      enum: ['SWM','MRF','Legacy Waste Treatment','Housekeeping','Manpower Supply','Other'],
    },
    status: {
      type:    String,
      enum:    ['upcoming','ongoing','completed','on_hold'],
      default: 'upcoming',
    },
    startDate:   { type: Date, required: true },
    endDate:     { type: Date },
    budget:      { type: Number },
    contractValue:{ type: Number },
    assignedManager:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedSupervisor:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    wasteCollectionTarget: { type: Number }, // MT/day
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    documents: [
      {
        name: String,
        url:  String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    notes: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
