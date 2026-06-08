import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../redux/slices/authSlice';
import { Leaf, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const dispatch  = useDispatch();
  const { loading, error } = useSelector(s => s.auth);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(form));
  };

  const demoLogins = [
    { label: 'Super Admin', email: 'admin@nandiniswm.com',      password: 'Admin@1234',  color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { label: 'Manager',     email: 'manager@nandiniswm.com',    password: 'Manager@123', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'Supervisor',  email: 'supervisor@nandiniswm.com', password: 'Super@1234',  color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { label: 'Employee',    email: 'employee@nandiniswm.com',   password: 'Emp@12345',   color: 'bg-green-50 border-green-200 text-green-700' },
  ];

  return (
    <div className="min-h-screen bg-hero flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-forest-600/20 rounded-full blur-3xl" />

        <div className="relative">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
              <Leaf size={20} />
            </div>
            <div>
              <div className="font-display font-bold text-lg">Nandini WMS</div>
              <div className="text-xs text-forest-300">Since 2018</div>
            </div>
          </Link>
        </div>

        <div className="relative">
          <h2 className="font-display text-4xl font-bold text-white leading-tight mb-4">
            Employee Management<br />Portal
          </h2>
          <p className="text-forest-300 text-lg leading-relaxed">
            Manage projects, track attendance, submit daily reports, and monitor waste management operations across Bihar and beyond.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { n: '15+', l: 'Municipalities' },
              { n: '100+', l: 'Employees' },
              { n: '₹22Cr', l: 'Annual Revenue' },
              { n: '24×7', l: 'Operations' },
            ].map(({ n, l }) => (
              <div key={l} className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
                <div className="font-display font-bold text-white text-2xl">{n}</div>
                <div className="text-forest-300 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/" className="relative flex items-center gap-2 text-forest-300 hover:text-white text-sm transition-colors">
          <ArrowLeft size={16} /> Back to website
        </Link>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-hero rounded-xl flex items-center justify-center">
              <Leaf className="text-white" size={20} />
            </div>
            <div>
              <div className="font-display font-bold text-forest-900">Nandini WMS</div>
              <div className="text-xs text-forest-500">Employee Portal</div>
            </div>
          </div>

          <div className="glass-card p-8 shadow-glass-lg">
            <h1 className="font-display font-bold text-2xl text-forest-900 mb-1">Welcome Back</h1>
            <p className="text-gray-500 text-sm mb-8">Sign in to your employee account</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-forest-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-400" size={16} />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="form-input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-800 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-400" size={16} />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    className="form-input pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600"
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-8">
              <p className="text-xs text-gray-400 text-center mb-3 uppercase tracking-wider">Demo Accounts</p>
              <div className="grid grid-cols-2 gap-2">
                {demoLogins.map(({ label, email, password, color }) => (
                  <button
                    key={label}
                    onClick={() => setForm({ email, password })}
                    className={`${color} border text-xs font-medium px-3 py-2 rounded-lg text-left transition-opacity hover:opacity-80`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            For access issues, contact{' '}
            <a href="mailto:nandiniswm18@gmail.com" className="text-forest-600 hover:underline">
              nandiniswm18@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
