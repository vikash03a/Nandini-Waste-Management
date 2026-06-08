import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProjects, createProject } from '../../redux/slices/projectSlice';
import { fetchMunicipalities } from '../../redux/slices/municipalitySlice';
import { fetchUsers } from '../../redux/slices/userSlice';
import { Plus, Search, FolderKanban, X, Building2 } from 'lucide-react';

const statusColors = { ongoing:'badge-blue', completed:'badge-green', upcoming:'badge-yellow', on_hold:'badge-gray' };

function CreateProjectModal({ onClose }) {
  const dispatch = useDispatch();
  const { list: municipalities } = useSelector(s => s.municipalities);
  const { list: users } = useSelector(s => s.users);
  const [form, setForm] = useState({
    title:'', municipality:'', projectType:'SWM', status:'upcoming',
    startDate:'', endDate:'', contractValue:'', description:''
  });

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchUsers({ role: 'manager' }));
  }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(createProject(form));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-card bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-forest-900 text-xl">Create New Project</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Project Title *</label>
            <input type="text" required className="form-input" placeholder="e.g. SWM – Nagar Panchayat XYZ"
              value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Municipality *</label>
            <select required className="form-input"
              value={form.municipality} onChange={e => setForm(p => ({ ...p, municipality: e.target.value }))}>
              <option value="">Select municipality…</option>
              {municipalities.map(m => <option key={m._id} value={m._id}>{m.name} ({m.type})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Project Type</label>
              <select className="form-input" value={form.projectType} onChange={e => setForm(p => ({ ...p, projectType: e.target.value }))}>
                {['SWM','MRF','Legacy Waste Treatment','Housekeeping','Manpower Supply','Other'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Status</label>
              <select className="form-input" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                {['upcoming','ongoing','completed','on_hold'].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Start Date *</label>
              <input type="date" required className="form-input"
                value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">End Date</label>
              <input type="date" className="form-input"
                value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Contract Value (₹)</label>
            <input type="number" className="form-input" placeholder="0"
              value={form.contractValue} onChange={e => setForm(p => ({ ...p, contractValue: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Description</label>
            <textarea rows={3} className="form-input resize-none" placeholder="Project details…"
              value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center">Create Project</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function ProjectsListPage() {
  const dispatch = useDispatch();
  const { list: projects, loading } = useSelector(s => s.projects);
  const { user } = useSelector(s => s.auth);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('all');
  const [showCreate, setCreate]   = useState(false);
  const isAdmin = ['super_admin','manager'].includes(user?.role);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const filtered = projects.filter(p => {
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase()) ||
                        p.municipality?.name?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {showCreate && <CreateProjectModal onClose={() => setCreate(false)} />}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-forest-900 text-xl">Projects</h2>
          <p className="text-sm text-gray-500">{projects.length} total projects</p>
        </div>
        {isAdmin && (
          <button onClick={() => setCreate(true)} className="btn-primary text-sm py-2.5">
            <Plus size={16} /> New Project
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input type="text" placeholder="Search projects…" value={search}
            onChange={e => setSearch(e.target.value)} className="form-input pl-10 py-2.5 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','ongoing','completed','upcoming','on_hold'].map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                statusFilter === s ? 'bg-forest-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}>
              {s === 'all' ? 'All' : s.replace('_',' ')}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-forest-600">
          <div className="w-8 h-8 border-3 border-forest-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading projects…
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="glass-card p-5 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center">
                  <FolderKanban className="text-forest-600" size={18} />
                </div>
                <span className={`badge ${statusColors[p.status] || 'badge-gray'} capitalize`}>
                  {p.status?.replace('_',' ')}
                </span>
              </div>
              <h3 className="font-semibold text-forest-900 text-sm leading-snug mb-1 line-clamp-2">{p.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                <Building2 size={12} /> {p.municipality?.name}, {p.municipality?.district}
              </div>
              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span><span>{p.progressPercent}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-forest-600 to-forest-400 rounded-full transition-all"
                    style={{ width: `${p.progressPercent}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="badge badge-green text-[10px]">{p.projectType}</span>
                <Link to={`/dashboard/projects/${p._id}`}
                  className="text-xs text-forest-600 hover:text-forest-800 font-medium hover:underline">
                  View Details →
                </Link>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && !loading && (
            <div className="col-span-3 text-center py-16 text-gray-400">
              No projects found. {isAdmin && <button onClick={() => setCreate(true)} className="text-forest-600 underline ml-1">Create one?</button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
