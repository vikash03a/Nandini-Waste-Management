import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, Phone, Mail, MapPin, ChevronRight, LogIn } from 'lucide-react';

const navLinks = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/contact',  label: 'Contact' },
];

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useSelector(s => s.auth);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Topbar ── */}
      <div className="hidden md:block bg-forest-900 text-forest-200 text-xs py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone size={12} /> +91-7903607816</span>
            <span className="flex items-center gap-1.5"><Mail size={12} /> nandiniswm18@gmail.com</span>
          </div>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> Nariyar, Kanti, Muzaffarpur (Bihar) – 843109
          </span>
        </div>
      </div>

      {/* ── Navbar ── */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-glass border-b border-forest-100'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-hero rounded-xl flex items-center justify-center shadow-green group-hover:scale-105 transition-transform">
              <Leaf className="text-white" size={22} />
            </div>
            <div>
              <div className="font-display font-bold text-forest-900 leading-tight text-base">
                Nandini WMS
              </div>
              <div className="text-[10px] text-forest-500 font-medium tracking-wide uppercase">
                Pvt. Ltd. · Est. 2018
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === to
                    ? 'bg-forest-600 text-white shadow-green'
                    : 'text-forest-700 hover:bg-forest-50 hover:text-forest-900'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-sm py-2 px-5">
                Dashboard <ChevronRight size={16} />
              </Link>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-5">
                <LogIn size={16} /> Employee Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-forest-700 hover:bg-forest-50"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-forest-100"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`px-4 py-3 rounded-lg text-sm font-medium ${
                      location.pathname === to
                        ? 'bg-forest-600 text-white'
                        : 'text-forest-700 hover:bg-forest-50'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <Link to="/login" className="btn-primary mt-2 justify-center">
                  <LogIn size={16} /> Employee Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Page content ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="bg-forest-950 text-forest-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-forest-700 rounded-xl flex items-center justify-center">
                  <Leaf className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-display font-bold text-white">Nandini WMS</div>
                  <div className="text-xs text-forest-400">Since 2018</div>
                </div>
              </div>
              <p className="text-sm text-forest-400 leading-relaxed">
                India's emerging leader in Integrated Solid Waste Management, delivering sustainable solutions for a cleaner, greener India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-forest-400 hover:text-forest-200 transition-colors flex items-center gap-1.5">
                      <ChevronRight size={12} /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Our Services</h4>
              <ul className="space-y-2 text-sm text-forest-400">
                {['Door-to-Door Collection','Waste Segregation','MRF Units','Legacy Waste Treatment','Housekeeping & Manpower'].map(s => (
                  <li key={s} className="flex items-center gap-1.5"><ChevronRight size={12} />{s}</li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
              <div className="space-y-3 text-sm text-forest-400">
                <p className="flex items-start gap-2"><Phone size={14} className="mt-0.5 shrink-0" /> +91-7903607816</p>
                <p className="flex items-start gap-2"><Mail size={14} className="mt-0.5 shrink-0" /> nandiniswm18@gmail.com</p>
                <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" />
                  C/O Manoj Kumar Vatsa, Nariyar, Kanti, Muzaffarpur (Bihar) – 843109
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-forest-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-forest-500">
            <p>© {new Date().getFullYear()} Nandini Waste Management Pvt. Ltd. All rights reserved.</p>
            <p>Swachh Bharat Mission Partner · Working 24×7 for a Cleaner India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
