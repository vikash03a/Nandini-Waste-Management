import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchUsers, createUser } from '../../redux/slices/userSlice';
import { Plus, Search, X, UserCheck, UserX } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

function AddEmployeeModal({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'employee',
    phone: '', department: '', designation: '', joiningDate: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(createUser(form));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-glass-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-forest-900 text-xl">Add New Employee</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Full Name *</label>
              <input type="text" required className="form-input"
                value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Email *</label>
              <input type="email" required className="form-input"
                value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Password *</label>
              <input type="password" required className="form-input" placeholder="Min. 6 chars"
                value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Role</label>
              <select className="form-input" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                <option value="employee">Employee</option>
                <option value="supervisor">Supervisor</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Phone</label>
              <input type="tel" className="form-input"
                value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Joining Date</label>
              <input type="date" className="form-input"
                value={form.joiningDate} onChange={e => setForm(p => ({ ...p, joiningDate: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Department</label>
              <input type="text" className="form-input" placeholder="e.g. Field Operations"
                value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Designation</label>
              <input type="text" className="form-input" placeholder="e.g. Sanitation Worker"
                value={form.designation} onChange={e => setForm(p => ({ ...p, designation: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center">Add Employee</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

const roleColors = { super_admin:'badge-red', manager:'badge-blue', supervisor:'badge-yellow', employee:'badge-green' };

export default function EmployeesPage() {
  const dispatch = useDispatch();
  const { list: users, loading } = useSelector(s => s.users);
  const [search, setSearch]     = useState('');
  const [roleFilter, setRole]   = useState('all');
  const [showAdd, setShowAdd]   = useState(false);

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  const toggleStatus = async (id) => {
    try {
      await api.put(`/users/${id}/toggle-status`);
      dispatch(fetchUsers());
      toast.success('Status updated');
    } catch { toast.error('Failed to update'); }
  };

  const filtered = users.filter(u => {
    const matchRole   = roleFilter === 'all' || u.role === roleFilter;
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) ||
                        u.email?.toLowerCase().includes(search.toLowerCase()) ||
                        u.employeeId?.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="space-y-6">
      {showAdd && <AddEmployeeModal onClose={() => setShowAdd(false)} />}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-forest-900 text-xl">Employees</h2>
          <p className="text-sm text-gray-500">{users.length} total staff members</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm py-2.5">
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input type="text" placeholder="Search employees…" value={search}
            onChange={e => setSearch(e.target.value)} className="form-input pl-10 py-2.5 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','employee','supervisor','manager','super_admin'].map(r => (
            <button key={r} onClick={() => setRole(r)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                roleFilter === r ? 'bg-forest-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}>{r === 'all' ? 'All Roles' : r.replace('_',' ')}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-forest-600">Loading employees…</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>ID</th>
                <th>Role</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr key={u._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-forest-100 rounded-lg flex items-center justify-center text-forest-700 font-bold text-xs">
                        {u.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-forest-900 text-sm">{u.name}</div>
                        <div className="text-xs text-gray-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-xs font-mono text-gray-600">{u.employeeId}</td>
                  <td>
                    <span className={`badge ${roleColors[u.role]} capitalize`}>{u.role?.replace('_',' ')}</span>
                  </td>
                  <td className="text-sm text-gray-600">{u.department || '—'}</td>
                  <td className="text-sm text-gray-600">{u.phone || '—'}</td>
                  <td>
                    <span className={`badge ${u.isActive ? 'badge-green' : 'badge-red'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => toggleStatus(u._id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        u.isActive ? 'text-red-400 hover:bg-red-50 hover:text-red-600' : 'text-green-500 hover:bg-green-50 hover:text-green-700'
                      }`} title={u.isActive ? 'Deactivate' : 'Activate'}>
                      {u.isActive ? <UserX size={15} /> : <UserCheck size={15} />}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400 text-sm">No employees found</div>
          )}
        </div>
      )}
    </div>
  );
}
