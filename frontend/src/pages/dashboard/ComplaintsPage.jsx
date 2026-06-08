import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchComplaints, createComplaint, resolveComplaint } from '../../redux/slices/complaintSlice';
import { fetchProjects } from '../../redux/slices/projectSlice';
import { Plus, X, AlertCircle, CheckCircle } from 'lucide-react';

const priorityColors   = { low:'badge-gray', medium:'badge-yellow', high:'badge-red', critical:'badge-red' };
const statusColors     = { open:'badge-red', in_progress:'badge-yellow', resolved:'badge-green', closed:'badge-gray' };

function RaiseComplaintModal({ onClose }) {
  const dispatch = useDispatch();
  const { list: projects } = useSelector(s => s.projects);
  const [form, setForm] = useState({
    title: '', description: '', category: 'other', priority: 'medium', project: '',
  });

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(createComplaint(form));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-glass-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-forest-900 text-xl">Raise Complaint / Issue</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Title *</label>
            <input type="text" required className="form-input" placeholder="Brief complaint title"
              value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Category</label>
              <select className="form-input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {['equipment','manpower','route','public_complaint','safety','other'].map(c => (
                  <option key={c} value={c} className="capitalize">{c.replace('_',' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Priority</label>
              <select className="form-input" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                {['low','medium','high','critical'].map(p => <option key={p} value={p} className="capitalize">{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Related Project</label>
            <select className="form-input" value={form.project} onChange={e => setForm(p => ({ ...p, project: e.target.value }))}>
              <option value="">None / General</option>
              {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Description *</label>
            <textarea required rows={4} className="form-input resize-none"
              placeholder="Describe the issue in detail…"
              value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center">Submit Complaint</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function ComplaintsPage() {
  const dispatch = useDispatch();
  const { list: complaints, loading } = useSelector(s => s.complaints);
  const { user } = useSelector(s => s.auth);
  const [showRaise, setShowRaise]   = useState(false);
  const [statusFilter, setStatus]   = useState('all');

  const isManager = ['super_admin','manager','supervisor'].includes(user?.role);

  useEffect(() => { dispatch(fetchComplaints()); }, [dispatch]);

  const filtered = complaints.filter(c => statusFilter === 'all' || c.status === statusFilter);

  const handleResolve = async (id) => {
    const resolution = prompt('Enter resolution details:');
    if (resolution) dispatch(resolveComplaint({ id, resolution }));
  };

  return (
    <div className="space-y-6">
      {showRaise && <RaiseComplaintModal onClose={() => setShowRaise(false)} />}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-forest-900 text-xl">Complaints & Issues</h2>
          <p className="text-sm text-gray-500">{complaints.length} total complaints</p>
        </div>
        <button onClick={() => setShowRaise(true)} className="btn-primary text-sm py-2.5">
          <Plus size={16} /> Raise Complaint
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all','open','in_progress','resolved','closed'].map(s => (
          <button key={s} onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              statusFilter === s ? 'bg-forest-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>{s === 'all' ? 'All' : s.replace('_',' ')}</button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-forest-600">Loading complaints…</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c, i) => (
            <motion.div key={c._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="glass-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    c.priority === 'critical' || c.priority === 'high' ? 'bg-red-100' : 'bg-amber-100'
                  }`}>
                    <AlertCircle size={16} className={c.priority === 'critical' ? 'text-red-600' : 'text-amber-600'} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-forest-900 text-sm">{c.title}</h3>
                      <span className={`badge ${priorityColors[c.priority]} capitalize`}>{c.priority}</span>
                      <span className={`badge ${statusColors[c.status]} capitalize`}>{c.status?.replace('_',' ')}</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{c.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                      <span>By: {c.raisedBy?.name}</span>
                      <span className="capitalize">Category: {c.category?.replace('_',' ')}</span>
                      <span>{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                    {c.resolution && (
                      <div className="mt-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                        ✓ Resolution: {c.resolution}
                      </div>
                    )}
                  </div>
                </div>
                {isManager && c.status === 'open' && (
                  <button onClick={() => handleResolve(c._id)}
                    className="shrink-0 flex items-center gap-1.5 text-xs text-green-600 border border-green-200 bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100">
                    <CheckCircle size={13} /> Resolve
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400 text-sm">
              <AlertCircle size={40} className="mx-auto mb-3 opacity-30" />
              No complaints found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
