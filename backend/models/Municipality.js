const mongoose = require('mongoose');

const municipalitySchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['Nagar Panchayat','Nagar Parishad','Nagar Nigam','Nagar Palika Parishad'],
      required: true,
    },
    district:    { type: String, required: true },
    state:       { type: String, default: 'Bihar' },
    population:  { type: Number },
    area:        { type: String }, // sq km
    wastePerDay: { type: Number }, // MT/day
    contactPerson: { type: String },
    contactPhone:  { type: String },
    contactEmail:  { type: String },
    address:       { type: String },
    isActive:      { type: Boolean, default: true },
    assignedManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    latitude:    { type: Number },
    longitude:   { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Municipality', municipalitySchema);
