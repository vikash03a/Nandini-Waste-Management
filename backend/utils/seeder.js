const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const User         = require('../models/User');
const Municipality = require('../models/Municipality');
const Project      = require('../models/Project');
const Notification = require('../models/Notification');

const connectDB = require('../config/db');

const seed = async () => {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Clear existing
  await Promise.all([
    User.deleteMany(),
    Municipality.deleteMany(),
    Project.deleteMany(),
    Notification.deleteMany(),
  ]);

  // ── Users ────────────────────────────────────────────────────────────────
  const users = await User.create([
    {
      name: 'Manoj Kumar Vatsa', email: 'admin@nandiniswm.com',
      password: 'Admin@1234', role: 'super_admin',
      employeeId: 'NWM-0001', phone: '+91-7903607816',
      designation: 'Founder & Managing Director', department: 'Management',
      joiningDate: new Date('2018-01-01'), isActive: true,
    },
    {
      name: 'Vijeta Vatsa', email: 'manager@nandiniswm.com',
      password: 'Manager@123', role: 'manager',
      employeeId: 'NWM-0002', phone: '+91-9876543210',
      designation: 'Director', department: 'Operations',
      joiningDate: new Date('2018-03-01'), isActive: true,
    },
    {
      name: 'Subodh Kumar', email: 'supervisor@nandiniswm.com',
      password: 'Super@1234', role: 'supervisor',
      employeeId: 'NWM-0003', phone: '+91-9123456789',
      designation: 'Director', department: 'Field Operations',
      joiningDate: new Date('2019-06-01'), isActive: true,
    },
    {
      name: 'Rahul Sharma', email: 'employee@nandiniswm.com',
      password: 'Emp@12345', role: 'employee',
      employeeId: 'NWM-0004', phone: '+91-8765432109',
      designation: 'Field Worker', department: 'Waste Collection',
      joiningDate: new Date('2020-01-15'), isActive: true,
    },
  ]);

  // ── Municipalities ───────────────────────────────────────────────────────
  const municipalities = await Municipality.create([
    { name: 'Sahebganj',      type: 'Nagar Panchayat', district: 'Bhagalpur',   state: 'Bihar',      wastePerDay: 8,  assignedManager: users[1]._id },
    { name: 'Janjharpur',     type: 'Nagar Parishad',  district: 'Madhubani',   state: 'Bihar',      wastePerDay: 15, assignedManager: users[1]._id },
    { name: 'Jainagar',       type: 'Nagar Panchayat', district: 'Madhubani',   state: 'Bihar',      wastePerDay: 6,  assignedManager: users[1]._id },
    { name: 'Pirpainti',      type: 'Nagar Panchayat', district: 'Bhagalpur',   state: 'Bihar',      wastePerDay: 7,  assignedManager: users[1]._id },
    { name: 'Sasaram',        type: 'Nagar Nigam',     district: 'Rohtas',      state: 'Bihar',      wastePerDay: 45, assignedManager: users[1]._id },
    { name: 'Kahalgaon',      type: 'Nagar Panchayat', district: 'Bhagalpur',   state: 'Bihar',      wastePerDay: 9,  assignedManager: users[1]._id },
    { name: 'Sheohar',        type: 'Nagar Parishad',  district: 'Sheohar',     state: 'Bihar',      wastePerDay: 12, assignedManager: users[1]._id },
    { name: 'Bairgania',      type: 'Nagar Parishad',  district: 'Sitamarhi',   state: 'Bihar',      wastePerDay: 10, assignedManager: users[1]._id },
    { name: 'Mahnar',         type: 'Nagar Parishad',  district: 'Vaishali',    state: 'Bihar',      wastePerDay: 11, assignedManager: users[1]._id },
    { name: 'Sekhopur Sarai', type: 'Nagar Panchayat', district: 'Nalanda',     state: 'Bihar',      wastePerDay: 5,  assignedManager: users[1]._id },
    { name: 'Mirganj',        type: 'Nagar Panchayat', district: 'West Champaran', state: 'Bihar',   wastePerDay: 4,  assignedManager: users[1]._id },
    { name: 'Madhubani',      type: 'Nagar Nigam',     district: 'Madhubani',   state: 'Bihar',      wastePerDay: 50, assignedManager: users[1]._id },
    { name: 'Murliganj',      type: 'Nagar Panchayat', district: 'Madhepura',   state: 'Bihar',      wastePerDay: 6,  assignedManager: users[1]._id },
    { name: 'Barbigha',       type: 'Nagar Parishad',  district: 'Sheikhpura',  state: 'Bihar',      wastePerDay: 13, assignedManager: users[1]._id },
    { name: 'Daudnagar',      type: 'Nagar Parishad',  district: 'Aurangabad',  state: 'Bihar',      wastePerDay: 11, assignedManager: users[1]._id },
    { name: 'Doiwala',        type: 'Nagar Palika Parishad', district: 'Dehradun', state: 'Uttarakhand', wastePerDay: 18, assignedManager: users[1]._id },
    { name: 'Thalisain',      type: 'Nagar Panchayat', district: 'Pauri Garhwal', state: 'Uttarakhand', wastePerDay: 3, assignedManager: users[1]._id },
    { name: 'Sutanganj',      type: 'Nagar Panchayat', district: 'Bhagalpur',   state: 'Bihar',      wastePerDay: 6,  assignedManager: users[1]._id },
  ]);

  // ── Projects ─────────────────────────────────────────────────────────────
  await Project.create([
    {
      title: 'SWM - Nagar Parishad Barbigha',
      municipality: municipalities[13]._id, projectType: 'SWM',
      status: 'ongoing', startDate: new Date('2023-01-01'),
      assignedManager: users[1]._id, assignedSupervisor: users[2]._id,
      assignedEmployees: [users[3]._id], progressPercent: 60,
      contractValue: 5000000,
    },
    {
      title: 'SWM - Nagar Parishad Mahnar',
      municipality: municipalities[8]._id, projectType: 'SWM',
      status: 'ongoing', startDate: new Date('2022-09-01'),
      assignedManager: users[1]._id, assignedSupervisor: users[2]._id,
      assignedEmployees: [users[3]._id], progressPercent: 75,
      contractValue: 7500000,
    },
    {
      title: 'MRF 5 TPD - Kahalgaon',
      municipality: municipalities[5]._id, projectType: 'MRF',
      status: 'ongoing', startDate: new Date('2022-04-01'), endDate: new Date('2025-10-04'),
      assignedManager: users[1]._id, progressPercent: 85,
      contractValue: 12000000,
    },
    {
      title: 'SWM - Nagar Parishad Daudnagar',
      municipality: municipalities[14]._id, projectType: 'SWM',
      status: 'ongoing', startDate: new Date('2023-06-01'),
      assignedManager: users[1]._id, assignedSupervisor: users[2]._id,
      progressPercent: 50, contractValue: 4500000,
    },
    {
      title: 'Housekeeping - Katihar, Purniya & Madhepura',
      municipality: municipalities[12]._id, projectType: 'Housekeeping',
      status: 'ongoing', startDate: new Date('2023-11-01'),
      assignedManager: users[1]._id, progressPercent: 70,
      contractValue: 8000000,
    },
    {
      title: 'SWM - Doiwala, Dehradun (Uttarakhand)',
      municipality: municipalities[15]._id, projectType: 'SWM',
      status: 'ongoing', startDate: new Date('2024-01-01'),
      assignedManager: users[1]._id, progressPercent: 40,
      contractValue: 9000000,
    },
    {
      title: 'SWM - Thalisain, Pauri Garhwal (Uttarakhand)',
      municipality: municipalities[16]._id, projectType: 'SWM',
      status: 'ongoing', startDate: new Date('2024-03-01'),
      assignedManager: users[1]._id, progressPercent: 30,
      contractValue: 3500000,
    },
    {
      title: 'Manpower Supply - Sutanganj',
      municipality: municipalities[17]._id, projectType: 'Manpower Supply',
      status: 'ongoing', startDate: new Date('2024-02-01'),
      assignedManager: users[1]._id, progressPercent: 55,
      contractValue: 2000000,
    },
    // Completed projects
    {
      title: 'SWM - Nagar Panchayat Sahebganj',
      municipality: municipalities[0]._id, projectType: 'SWM',
      status: 'completed', startDate: new Date('2018-06-15'), endDate: new Date('2018-10-15'),
      assignedManager: users[1]._id, progressPercent: 100,
      contractValue: 1800000,
    },
    {
      title: 'SWM - Nagar Nigam Sasaram',
      municipality: municipalities[4]._id, projectType: 'SWM',
      status: 'completed', startDate: new Date('2021-06-10'), endDate: new Date('2021-08-10'),
      assignedManager: users[1]._id, progressPercent: 100,
      contractValue: 15000000,
    },
    {
      title: 'SWM - Nagar Nigam Madhubani',
      municipality: municipalities[11]._id, projectType: 'SWM',
      status: 'completed', startDate: new Date('2023-01-01'), endDate: new Date('2024-08-07'),
      assignedManager: users[1]._id, progressPercent: 100,
      contractValue: 20000000,
    },
  ]);

  // Welcome notification
  await Notification.create({
    recipient: users[3]._id,
    sender:    users[0]._id,
    title:     'Welcome to Nandini WMS Portal!',
    message:   'Your account has been created. Please complete your profile and check your assigned tasks.',
    type:      'system',
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n👤 Login Credentials:');
  console.log('   Super Admin : admin@nandiniswm.com     / Admin@1234');
  console.log('   Manager     : manager@nandiniswm.com   / Manager@123');
  console.log('   Supervisor  : supervisor@nandiniswm.com/ Super@1234');
  console.log('   Employee    : employee@nandiniswm.com  / Emp@12345');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
