const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    raisedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project:     { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    municipality:{ type: mongoose.Schema.Types.ObjectId, ref: 'Municipality' },

    title:       { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['equipment','manpower','route','public_complaint','safety','other'],
      default: 'other',
    },
    priority: {
      type:    String,
      enum:    ['low','medium','high','critical'],
      default: 'medium',
    },
    status: {
      type:    String,
      enum:    ['open','in_progress','resolved','closed'],
      default: 'open',
    },

    images: [{ url: String, publicId: String }],

    assignedTo:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt:    { type: Date },
    resolution:    { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
