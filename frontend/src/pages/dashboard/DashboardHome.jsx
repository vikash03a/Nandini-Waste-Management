import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { fetchProjectStats } from '../../redux/slices/projectSlice';
import { fetchReportStats }  from '../../redux/slices/reportSlice';
import { fetchAttendanceStats, fetchTodayStatus, checkIn, checkOut } from '../../redux/slices/attendanceSlice';
import { fetchNotifications } from '../../redux/slices/notificationSlice';
import { fetchUserStats } from '../../redux/slices/userSlice';
import {
  FolderKanban, FileText, Clock, AlertCircle, Users,
  TrendingUp, CheckCircle, ArrowRight, Bell
} from 'lucide-react';

const turnoverData = [
  { fy: 'FY19', amount: 1.78 }, { fy: 'FY20', amount: 9.49 },
  { fy: 'FY21', amount: 21.50 }, { fy: 'FY22', amount: 33.24 },
  { fy: 'FY23', amount: 95.46 }, { fy: 'FY24', amount: 205.47 },
  { fy: 'FY25', amount: 225.60 },
];

const projectionData = [
  { name: 'Integrated SWM',         value: 30, color: '#2e9e2e' },
  { name: 'Legacy Waste',           value: 20, color: '#4db84d' },
  { name: 'MRF & Compost',          value: 20, color: '#7dcf7d' },
  { name: 'Collection & Segregation',value: 20, color: '#b3e5b3' },
  { name: 'Housekeeping & Manpower', value: 10, color: '#d9f2d9' },
];

const StatCard = ({ icon: Icon, label, value, sub, color = 'bg-forest-50', iconColor = 'text-forest-600', linkTo }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-0.5"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className={iconColor} size={22} />
      </div>
      {linkTo && (
        <Link to={linkTo} className="text-forest-500 hover:text-forest-700">
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
    <div className="font-display font-bold text-forest-900 text-3xl">{value ?? '—'}</div>
    <div className="text-gray-500 text-sm mt-1">{label}</div>
    {sub && <div className="text-xs text-forest-500 mt-1">{sub}</div>}
  </motion.div>
);

export default function DashboardHome() {
  const dispatch   = useDispatch();
  const { user }   = useSelector(s => s.auth);
  const { stats: pStats } = useSelector(s => s.projects);
  const { stats: rStats } = useSelector(s => s.reports);
  const { stats: aStats, today: todayAtt } = useSelector(s => s.attendance);
  const { stats: uStats } = useSelector(s => s.users);
  const { list: notifications } = useSelector(s => s.notifications);

  const isAdmin = ['super_admin','manager'].includes(user?.role);

  useEffect(() => {
    dispatch(fetchProjectStats());
    dispatch(fetchReportStats());
    dispatch(fetchAttendanceStats());
    dispatch(fetchTodayStatus());
    dispatch(fetchNotifications());
    if (isAdmin) dispatch(fetchUserStats());
  }, [dispatch, isAdmin]);

  const handleCheckIn  = () => dispatch(checkIn({}));
  const handleCheckOut = () => dispatch(checkOut({}));

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-forest-900 text-2xl">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
          </p>
        </div>

        {/* Attendance quick action */}
        <div className="flex items-center gap-3">
          {!todayAtt?.checkIn?.time ? (
            <button onClick={handleCheckIn} className="btn-primary py-2 px-5 text-sm">
              <Clock size={16} /> Check In
            </button>
          ) : !todayAtt?.checkOut?.time ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm text-forest-600 font-medium">
                <CheckCircle size={16} className="text-forest-500" />
                Checked in at {new Date(todayAtt.checkIn.time).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}
              </span>
              <button onClick={handleCheckOut} className="btn-secondary py-2 px-5 text-sm">
                Check Out
              </button>
            </div>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-lg">
              <CheckCircle size={15} /> Done for today · {todayAtt.hoursWorked}h
            </span>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard icon={FolderKanban} label="Total Projects" value={pStats?.total}
          sub={`${pStats?.ongoing ?? 0} ongoing`} color="bg-forest-50" iconColor="text-forest-600" linkTo="/dashboard/projects" />
        <StatCard icon={FileText}    label="Daily Reports" value={rStats?.total}
          sub={`${rStats?.pending ?? 0} pending review`} color="bg-blue-50" iconColor="text-blue-600" linkTo="/dashboard/reports" />
        <StatCard icon={Clock}       label="This Month Attendance" value={aStats?.monthPresent}
          sub={`${aStats?.totalPresent ?? 0} total present days`} color="bg-amber-50" iconColor="text-amber-600" linkTo="/dashboard/attendance" />
        {isAdmin ? (
          <StatCard icon={Users} label="Total Employees" value={uStats?.total}
            sub={`${uStats?.active ?? 0} active`} color="bg-purple-50" iconColor="text-purple-600" linkTo="/dashboard/employees" />
        ) : (
          <StatCard icon={CheckCircle} label="Approved Reports" value={rStats?.approved}
            color="bg-green-50" iconColor="text-green-600" linkTo="/dashboard/reports" />
        )}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Turnover chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-6">
          <h3 className="font-semibold text-forest-900 mb-1">Company Turnover (₹ Lakhs)</h3>
          <p className="text-xs text-gray-400 mb-6">Financial year-wise revenue growth</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={turnoverData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0faf0" />
              <XAxis dataKey="fy" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ background: '#0f4e0f', border: 'none', borderRadius: 10, color: '#fff', fontSize: 12 }}
                formatter={v => [`₹${v} L`, 'Revenue']}
              />
              <Bar dataKey="amount" fill="#2e9e2e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* FY27 projection pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card p-6">
          <h3 className="font-semibold text-forest-900 mb-1">FY 2026-27 Revenue Projection</h3>
          <p className="text-xs text-gray-400 mb-4">Target: ₹100 Crore — breakdown by service type</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={projectionData} cx="40%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {projectionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend layout="vertical" align="right" verticalAlign="middle"
                iconType="circle" iconSize={8}
                formatter={(v) => <span style={{ fontSize: 11, color: '#374151' }}>{v}</span>}
              />
              <Tooltip formatter={v => [`${v}%`, 'Share']}
                contentStyle={{ background: '#0f4e0f', border: 'none', borderRadius: 10, color: '#fff', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card p-6">
          <h3 className="font-semibold text-forest-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Submit Report',   to: '/dashboard/reports',       icon: FileText,     color: 'bg-blue-50 text-blue-700' },
              { label: 'View Projects',   to: '/dashboard/projects',       icon: FolderKanban, color: 'bg-forest-50 text-forest-700' },
              { label: 'Raise Complaint', to: '/dashboard/complaints',     icon: AlertCircle,  color: 'bg-red-50 text-red-700' },
              { label: 'Notifications',   to: '/dashboard/notifications',  icon: Bell,         color: 'bg-amber-50 text-amber-700' },
            ].map(({ label, to, icon: Icon, color }) => (
              <Link key={label} to={to}
                className={`${color} rounded-xl p-4 flex flex-col items-start gap-2 hover:opacity-80 transition-opacity`}>
                <Icon size={20} />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-forest-900">Recent Notifications</h3>
            <Link to="/dashboard/notifications" className="text-xs text-forest-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">No notifications yet</div>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 4).map(n => (
                <div key={n._id} className={`flex items-start gap-3 p-3 rounded-xl ${n.isRead ? 'bg-gray-50' : 'bg-forest-50 border border-forest-100'}`}>
                  <Bell size={14} className={n.isRead ? 'text-gray-400 mt-0.5' : 'text-forest-600 mt-0.5'} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-forest-900 truncate">{n.title}</p>
                    <p className="text-xs text-gray-500 truncate">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
