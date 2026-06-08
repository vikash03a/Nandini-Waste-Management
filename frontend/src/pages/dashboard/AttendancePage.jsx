import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchAttendance, fetchTodayStatus, fetchAttendanceStats, checkIn, checkOut } from '../../redux/slices/attendanceSlice';
import { Clock, CheckCircle, Calendar, TrendingUp } from 'lucide-react';

const statusColors = { present:'badge-green', absent:'badge-red', half_day:'badge-yellow', leave:'badge-blue', holiday:'badge-gray' };

export default function AttendancePage() {
  const dispatch = useDispatch();
  const { list, today, stats, loading } = useSelector(s => s.attendance);
  const { user } = useSelector(s => s.auth);

  useEffect(() => {
    dispatch(fetchAttendance());
    dispatch(fetchTodayStatus());
    dispatch(fetchAttendanceStats());
  }, [dispatch]);

  const handleCheckIn  = () => dispatch(checkIn({}));
  const handleCheckOut = () => dispatch(checkOut({}));

  const fmt = d => d ? new Date(d).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }) : '—';
  const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-forest-900 text-xl">Attendance</h2>
        <p className="text-sm text-gray-500">Track your check-in / check-out and attendance history</p>
      </div>

      {/* Today's status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border-l-4 border-forest-500">
        <h3 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
          <Clock size={18} className="text-forest-600" /> Today's Attendance
        </h3>
        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Check In</div>
            <div className="font-display font-bold text-forest-900 text-2xl">
              {today?.checkIn?.time ? fmt(today.checkIn.time) : '—'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Check Out</div>
            <div className="font-display font-bold text-forest-900 text-2xl">
              {today?.checkOut?.time ? fmt(today.checkOut.time) : '—'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Hours</div>
            <div className="font-display font-bold text-forest-900 text-2xl">
              {today?.hoursWorked ? `${today.hoursWorked}h` : '—'}
            </div>
          </div>
          <div className="ml-auto flex gap-3">
            {!today?.checkIn?.time ? (
              <button onClick={handleCheckIn} className="btn-primary py-2.5 px-6">
                <Clock size={16} /> Check In
              </button>
            ) : !today?.checkOut?.time ? (
              <button onClick={handleCheckOut} className="btn-secondary py-2.5 px-6">
                Check Out
              </button>
            ) : (
              <span className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-4 py-2.5 rounded-xl">
                <CheckCircle size={16} /> Completed
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: CheckCircle, label: 'Total Present Days', value: stats?.totalPresent, color: 'bg-green-50', ic: 'text-green-600' },
          { icon: Calendar,    label: 'This Month Present', value: stats?.monthPresent,  color: 'bg-blue-50', ic: 'text-blue-600' },
          { icon: TrendingUp,  label: 'Total Absent Days',  value: stats?.totalAbsent,   color: 'bg-red-50',  ic: 'text-red-500' },
        ].map(({ icon: Icon, label, value, color, ic }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 text-center">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Icon className={ic} size={20} />
            </div>
            <div className="font-display font-bold text-forest-900 text-3xl">{value ?? '—'}</div>
            <div className="text-gray-500 text-xs mt-1">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* History table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-forest-900">Attendance History</h3>
        </div>
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.slice(0, 30).map(r => (
              <tr key={r._id}>
                <td className="text-sm font-medium text-forest-900">{fmtDate(r.date)}</td>
                <td className="text-sm text-gray-600">{r.checkIn?.time ? fmt(r.checkIn.time) : '—'}</td>
                <td className="text-sm text-gray-600">{r.checkOut?.time ? fmt(r.checkOut.time) : '—'}</td>
                <td className="text-sm font-medium text-forest-700">{r.hoursWorked ? `${r.hoursWorked}h` : '—'}</td>
                <td><span className={`badge ${statusColors[r.status]} capitalize`}>{r.status?.replace('_',' ')}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400 text-sm">No attendance records found</div>
        )}
      </motion.div>
    </div>
  );
}
