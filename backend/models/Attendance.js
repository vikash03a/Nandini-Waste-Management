const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project:  { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    date:     { type: Date, required: true },

    checkIn: {
      time:      Date,
      latitude:  Number,
      longitude: Number,
      address:   String,
    },
    checkOut: {
      time:      Date,
      latitude:  Number,
      longitude: Number,
      address:   String,
    },

    status: {
      type:    String,
      enum:    ['present','absent','half_day','leave','holiday'],
      default: 'present',
    },
    hoursWorked: { type: Number, default: 0 },
    notes:       { type: String },
    approvedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// Auto-calculate hoursWorked on save
attendanceSchema.pre('save', function (next) {
  if (this.checkIn?.time && this.checkOut?.time) {
    const diff = this.checkOut.time - this.checkIn.time;
    this.hoursWorked = parseFloat((diff / 3600000).toFixed(2));
  }
  next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);
