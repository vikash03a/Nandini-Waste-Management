const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema(
  {
    employee:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project:     { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    municipality:{ type: mongoose.Schema.Types.ObjectId, ref: 'Municipality' },
    reportDate:  { type: Date, required: true, default: Date.now },

    // Work done
    completedWork: { type: String, required: true },
    pendingWork:   { type: String },
    wasteCollected:{ type: Number }, // MT
    remarks:       { type: String },

    // Media
    images: [
      {
        url:      String,
        publicId: String,
        caption:  String,
      },
    ],
    videos: [
      {
        url:      String,
        publicId: String,
      },
    ],

    // Status
    status: {
      type:    String,
      enum:    ['submitted','reviewed','approved','rejected'],
      default: 'submitted',
    },
    reviewedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt:  { type: Date },
    reviewNote:  { type: String },

    // Location (GPS-ready)
    location: {
      latitude:  Number,
      longitude: Number,
      address:   String,
    },
  },
  { timestamps: true }
);

// One report per employee per project per day
dailyReportSchema.index({ employee: 1, project: 1, reportDate: 1 });

module.exports = mongoose.model('DailyReport', dailyReportSchema);
