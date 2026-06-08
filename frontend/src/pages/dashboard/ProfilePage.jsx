import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { updateProfile, changePassword } from '../../redux/slices/authSlice';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Lock, Save, Eye, EyeOff } from 'lucide-react';

const roleLabels = {
  super_admin: 'Super Admin', manager: 'Manager',
  supervisor: 'Supervisor',   employee: 'Employee',
};

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(s => s.auth);

  const [profileForm, setProfileForm] = useState({
    name:    user?.name    || '',
    phone:   user?.phone   || '',
    address: user?.address || '',
  });

  const [pwdForm, setPwdForm]     = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPwd, setShowPwd]     = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileSave = async e => {
    e.preventDefault();
    dispatch(updateProfile(profileForm));
  };

  const handlePasswordChange = async e => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await dispatch(changePassword({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword }));
    setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-hero rounded-2xl flex items-center justify-center text-white font-display font-bold text-3xl shadow-green shrink-0">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="font-display font-bold text-forest-900 text-2xl">{user?.name}</h2>
            <p className="text-forest-600 font-medium">{user?.designation || roleLabels[user?.role]}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="badge badge-green capitalize">{roleLabels[user?.role]}</span>
              {user?.employeeId && (
                <span className="text-xs text-gray-400 font-mono">{user.employeeId}</span>
              )}
              {user?.department && (
                <span className="text-xs text-gray-400">{user.department}</span>
              )}
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
          {[
            { icon: Mail,     label: 'Email',       value: user?.email },
            { icon: Phone,    label: 'Phone',        value: user?.phone || 'Not set' },
            { icon: Briefcase,label: 'Department',   value: user?.department || 'Not set' },
            { icon: User,     label: 'Designation',  value: user?.designation || 'Not set' },
            { icon: Calendar, label: 'Joined',       value: user?.joiningDate ? new Date(user.joiningDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Not set' },
            { icon: MapPin,   label: 'Address',      value: user?.address || 'Not set' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2.5">
              <div className="w-7 h-7 bg-forest-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={13} className="text-forest-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{label}</p>
                <p className="text-sm text-forest-900 font-medium truncate max-w-[140px]">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {['profile', 'security'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-white text-forest-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
            {tab === 'profile' ? '👤 Edit Profile' : '🔒 Security'}
          </button>
        ))}
      </div>

      {/* Profile edit form */}
      {activeTab === 'profile' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6">
          <h3 className="font-semibold text-forest-900 mb-5 flex items-center gap-2">
            <User size={18} className="text-forest-600" /> Update Profile
          </h3>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Full Name</label>
              <input type="text" className="form-input"
                value={profileForm.name}
                onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Phone Number</label>
              <input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX"
                value={profileForm.phone}
                onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Address</label>
              <textarea rows={2} className="form-input resize-none"
                placeholder="Your home address…"
                value={profileForm.address}
                onChange={e => setProfileForm(p => ({ ...p, address: e.target.value }))} />
            </div>
            <div className="pt-2">
              <button type="submit" disabled={loading} className="btn-primary">
                <Save size={16} />
                {loading ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Security form */}
      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6">
          <h3 className="font-semibold text-forest-900 mb-5 flex items-center gap-2">
            <Lock size={18} className="text-forest-600" /> Change Password
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Current Password</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} required className="form-input pr-10"
                  placeholder="Enter current password"
                  value={pwdForm.currentPassword}
                  onChange={e => setPwdForm(p => ({ ...p, currentPassword: e.target.value }))} />
                <button type="button" onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">New Password</label>
              <input type="password" required minLength={6} className="form-input"
                placeholder="Minimum 6 characters"
                value={pwdForm.newPassword}
                onChange={e => setPwdForm(p => ({ ...p, newPassword: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Confirm New Password</label>
              <input type="password" required className="form-input"
                placeholder="Re-enter new password"
                value={pwdForm.confirmPassword}
                onChange={e => setPwdForm(p => ({ ...p, confirmPassword: e.target.value }))} />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              ⚠️ Use at least 6 characters with a mix of letters, numbers, and symbols.
            </div>
            <div className="pt-2">
              <button type="submit" disabled={loading} className="btn-primary">
                <Lock size={16} />
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
