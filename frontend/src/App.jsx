import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './redux/slices/authSlice';

// Layouts
import PublicLayout   from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public pages
import HomePage      from './pages/HomePage';
import AboutPage     from './pages/AboutPage';
import ServicesPage  from './pages/ServicesPage';
import ProjectsPage  from './pages/ProjectsPage';
import GalleryPage   from './pages/GalleryPage';
import ContactPage   from './pages/ContactPage';
import LoginPage     from './pages/LoginPage';

// Dashboard pages
import DashboardHome       from './pages/dashboard/DashboardHome';
import ProjectsListPage    from './pages/dashboard/ProjectsListPage';
import ProjectDetailPage   from './pages/dashboard/ProjectDetailPage';
import EmployeesPage       from './pages/dashboard/EmployeesPage';
import DailyReportsPage    from './pages/dashboard/DailyReportsPage';
import AttendancePage      from './pages/dashboard/AttendancePage';
import ComplaintsPage      from './pages/dashboard/ComplaintsPage';
import MunicipalitiesPage  from './pages/dashboard/MunicipalitiesPage';
import ProfilePage         from './pages/dashboard/ProfilePage';
import NotificationsPage   from './pages/dashboard/NotificationsPage';

// Guards
const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useSelector(s => s.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/dashboard" replace />;
  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(s => s.auth);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(s => s.auth);

  useEffect(() => {
    if (isAuthenticated) dispatch(getMe());
  }, [isAuthenticated, dispatch]);

  return (
    <Routes>
      {/* ── Public Routes ── */}
      <Route element={<PublicLayout />}>
        <Route path="/"         element={<HomePage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/gallery"  element={<GalleryPage />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Route>

      <Route path="/login" element={
        <PublicOnlyRoute><LoginPage /></PublicOnlyRoute>
      } />

      {/* ── Dashboard Routes ── */}
      <Route path="/dashboard" element={
        <PrivateRoute><DashboardLayout /></PrivateRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="projects"        element={<ProjectsListPage />} />
        <Route path="projects/:id"    element={<ProjectDetailPage />} />
        <Route path="employees"       element={
          <PrivateRoute roles={['super_admin','manager']}>
            <EmployeesPage />
          </PrivateRoute>
        } />
        <Route path="reports"         element={<DailyReportsPage />} />
        <Route path="attendance"      element={<AttendancePage />} />
        <Route path="complaints"      element={<ComplaintsPage />} />
        <Route path="municipalities"  element={
          <PrivateRoute roles={['super_admin','manager','supervisor']}>
            <MunicipalitiesPage />
          </PrivateRoute>
        } />
        <Route path="profile"         element={<ProfilePage />} />
        <Route path="notifications"   element={<NotificationsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
