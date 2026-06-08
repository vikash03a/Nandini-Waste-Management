import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../redux/slices/authSlice';
import {
  LayoutDashboard, FolderKanban, Users, FileText, Clock,
  AlertCircle, Building2, Bell, User, LogOut, Menu, X,
  Leaf, ChevronRight, Settings
} from 'lucide-react';

const allNavItems = [
  { to: '/dashboard',               icon: LayoutDashboard, label: 'Dashboard',     roles: ['super_admin','manager','supervisor','employee'] },
  { to: '/dashboard/projects',      icon: FolderKanban,    label: 'Projects',      roles: ['super_admin','manager','supervisor','employee'] },
  { to: '/dashboard/reports',       icon: FileText,         label: 'Daily Reports', roles: ['super_admin','manager','supervisor','employee'] },
  { to: '/dashboard/attendance',    icon: Clock,            label: 'Attendance',    roles: ['super_admin','manager','supervisor','employee'] },
  { to: '/dashboard/complaints',    icon: AlertCircle,      label: 'Complaints',    roles: ['super_admin','manager','supervisor','employee'] },
  { to: '/dashboard/employees',     icon: Users,            label: 'Employees',     roles: ['super_admin','manager'] },
  { to: '/dashboard/municipalities',icon: Building2,        label: 'Municipalities',roles: ['super_admin','manager','supervisor'] },
  { to: '/dashboard/notifications', icon: Bell,             label: 'Notifications', roles: ['super_admin','manager','supervisor','employee'] },
  { to: '/dashboard/profile',       icon: User,             label: 'My Profile',    roles: ['super_admin','manager','supervisor','employee'] },
];

const roleLabels = {
  super_admin: 'Super Admin', manager: 'Manager',
  supervisor: 'Supervisor',   employee: 'Employee',
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location  = useLocation();
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { user }  = useSelector(s => s.auth);
  const { unreadCount } = useSelector(s => s.notifications);

  const navItems = allNavItems.filter(item => item.roles.includes(user?.role));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
            <Leaf className="text-white" size={20} />
          </div>
          <div>
            <div className="font-display font-bold text-white text-base leading-tight">Nandini WMS</div>
            <div className="text-[10px] text-forest-300 uppercase tracking-wide">Management Portal</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 mx-4 mt-4 rounded-xl bg-white/10 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-forest-400 flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold truncate">{user?.name}</div>
            <div className="text-forest-300 text-xs">{roleLabels[user?.role]}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || 
                           (to !== '/dashboard' && location.pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === 'Notifications' && unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              {isActive && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="sidebar-item-inactive w-full text-red-300 hover:bg-red-500/20 hover:text-red-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-hero shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-hero z-50 flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg text-forest-700 hover:bg-forest-50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="font-display font-semibold text-forest-900 text-lg leading-tight">
                {navItems.find(n => 
                  location.pathname === n.to || 
                  (n.to !== '/dashboard' && location.pathname.startsWith(n.to))
                )?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-forest-400">Nandini Waste Management Pvt. Ltd.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard/notifications" className="relative p-2 rounded-lg text-forest-600 hover:bg-forest-50">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
            <Link to="/dashboard/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-forest-50">
              <div className="w-8 h-8 rounded-full bg-forest-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0)}
              </div>
              <span className="hidden md:block text-sm font-medium text-forest-800">{user?.name?.split(' ')[0]}</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
