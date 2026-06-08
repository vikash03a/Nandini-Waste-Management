const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, unique: true, lowercase: true },
    password:    { type: String, required: true, minlength: 6, select: false },
    phone:       { type: String },
    role: {
      type:    String,
      enum:    ['super_admin', 'manager', 'supervisor', 'employee'],
      default: 'employee',
    },
    employeeId:  { type: String, unique: true, sparse: true },
    avatar:      { type: String, default: '' },
    department:  { type: String },
    designation: { type: String },
    joiningDate: { type: Date },
    address:     { type: String },
    isActive:    { type: Boolean, default: true },
    assignedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    assignedMunicipality: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipality' },
    resetPasswordToken:   { type: String },
    resetPasswordExpire:  { type: Date },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
