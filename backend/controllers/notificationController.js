const asyncHandler   = require('express-async-handler');
const Notification   = require('../models/Notification');

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id })
    .populate('sender', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(50);

  const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false });

  res.json({ success: true, notifications, unreadCount });
});

const markAsRead = asyncHandler(async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ success: true });
});

const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true });
  res.json({ success: true, message: 'All notifications marked as read' });
});

const createBroadcast = asyncHandler(async (req, res) => {
  const { title, message, type, recipientIds } = req.body;

  const notifications = recipientIds.map(id => ({
    recipient: id,
    sender:    req.user._id,
    title,
    message,
    type: type || 'announcement',
  }));

  await Notification.insertMany(notifications);
  res.status(201).json({ success: true, message: `Sent to ${recipientIds.length} users` });
});

module.exports = { getNotifications, markAsRead, markAllAsRead, createBroadcast };
