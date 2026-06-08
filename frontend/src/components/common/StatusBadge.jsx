import React from 'react';

const presets = {
  // Project status
  ongoing:    'badge-blue',
  completed:  'badge-green',
  upcoming:   'badge-yellow',
  on_hold:    'badge-gray',
  // Report status
  submitted:  'badge-yellow',
  reviewed:   'badge-blue',
  approved:   'badge-green',
  rejected:   'badge-red',
  // Attendance
  present:    'badge-green',
  absent:     'badge-red',
  half_day:   'badge-yellow',
  leave:      'badge-blue',
  holiday:    'badge-gray',
  // Complaint
  open:       'badge-red',
  in_progress:'badge-yellow',
  resolved:   'badge-green',
  closed:     'badge-gray',
  // User
  active:     'badge-green',
  inactive:   'badge-red',
};

export default function StatusBadge({ status, className = '' }) {
  const colorClass = presets[status] || 'badge-gray';
  const label = status?.replace(/_/g, ' ');
  return (
    <span className={`badge ${colorClass} capitalize ${className}`}>
      {label}
    </span>
  );
}
