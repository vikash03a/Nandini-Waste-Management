import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchNotifications, markRead, markAllRead } from '../../redux/slices/notificationSlice';
import { Bell, CheckCheck, Info, FileText, AlertCircle, Calendar } from 'lucide-react';

const typeIcons = {
  task:         FileText,
  report:       FileText,
  complaint:    AlertCircle,
  attendance:   Calendar,
  announcement: Info,
  system:       Bell,
};

const typeColors = {
  task:         'bg-blue-100 text-blue-600',
  report:       'bg-forest-100 text-forest-600',
  complaint:    'bg-red-100 text-red-600',
  attendance:   'bg-amber-100 text-amber-600',
  announcement: 'bg-purple-100 text-purple-600',
  system:       'bg-gray-100 text-gray-600',
};

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const { list, unreadCount, loading } = useSelector(s => s.notifications);

  useEffect(() => { dispatch(fetchNotifications()); }, [dispatch]);

  const handleMarkRead = (id) => dispatch(markRead(id));
  const handleMarkAll  = () => dispatch(markAllRead());

  const fmt = d => new Date(d).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-forest-900 text-xl">Notifications</h2>
          <p className="text-sm text-gray-500">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAll}
            className="flex items-center gap-2 text-sm text-forest-600 hover:text-forest-800 font-medium border border-forest-200 px-4 py-2 rounded-xl hover:bg-forest-50 transition-all">
            <CheckCheck size={15} /> Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-16 text-forest-600">Loading notifications…</div>
      ) : list.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Bell size={48} className="mx-auto mb-4 text-gray-200" />
          <h3 className="font-semibold text-gray-400">No notifications yet</h3>
          <p className="text-sm text-gray-300 mt-1">You'll see updates and alerts here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {list.map((n, i) => {
            const Icon = typeIcons[n.type] || Bell;
            const colorClass = typeColors[n.type] || 'bg-gray-100 text-gray-600';
            return (
              <motion.div key={n._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => !n.isRead && handleMarkRead(n._id)}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer
                  ${n.isRead
                    ? 'bg-white border-gray-100 hover:bg-gray-50'
                    : 'bg-forest-50/60 border-forest-200 hover:bg-forest-50'
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-sm font-semibold leading-tight ${n.isRead ? 'text-gray-700' : 'text-forest-900'}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400 whitespace-nowrap">{fmt(n.createdAt)}</p>
                      {!n.isRead && (
                        <span className="inline-block w-2 h-2 bg-forest-500 rounded-full mt-1.5 ml-auto" />
                      )}
                    </div>
                  </div>
                  {n.sender && (
                    <p className="text-xs text-gray-400 mt-1">From: {n.sender?.name}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
