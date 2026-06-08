import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchReports, submitReport, reviewReport } from '../../redux/slices/reportSlice';
import { fetchProjects } from '../../redux/slices/projectSlice';
import { Plus, X, CheckCircle, XCircle, Eye, FileText, Calendar } from 'lucide-react';

const statusColors = { submitted:'badge-yellow', reviewed:'badge-blue', approved:'badge-green', rejected:'badge-red' };

function SubmitReportModal({ onClose }) {
  const dispatch = useDispatch();
  const { list: projects } = useSelector(s => s.projects);
  const [form, setForm] = useState({
    project: '', reportDate: new Date().toISOString().split('T')[0],
    completedWork: '', pendingWork: '', wasteCollected: '', remarks: '',
  });

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(submitReport(form));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-glass-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-forest-900 text-xl">Submit Daily Report</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Project *</label>
              <select required className="form-input"
                value={form.project} onChange={e => setForm(p => ({ ...p, project: e.target.value }))}>
                <option value="">Select project…</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Report Date *</label>
              <input type="date" required className="form-input"
                value={form.reportDate} onChange={e => setForm(p => ({ ...p, reportDate: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Work Completed Today *</label>
            <textarea required rows={3} className="form-input resize-none"
              placeholder="Describe all work completed today…"
              value={form.completedWork} onChange={e => setForm(p => ({ ...p, completedWork: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Pending Work</label>
            <textarea rows={2} className="form-input resize-none"
              placeholder="Work pending for tomorrow…"
              value={form.pendingWork} onChange={e => setForm(p => ({ ...p, pendingWork: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Waste Collected (MT)</label>
              <input type="number" step="0.01" className="form-input" placeholder="0.00"
                value={form.wasteCollected} onChange={e => setForm(p => ({ ...p, wasteCollected: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-1.5">Remarks</label>
              <input type="text" className="form-input" placeholder="Any additional notes"
                value={form.remarks} onChange={e => setForm(p => ({ ...p, remarks: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center">Submit Report</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ReviewModal({ report, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ status: 'approved', reviewNote: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(reviewReport({ id: report._id, ...form }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-glass-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-forest-900 text-lg">Review Report</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
          <p className="font-medium text-forest-900">{report.employee?.name}</p>
          <p className="text-gray-500 text-xs mt-1">{report.project?.title}</p>
          <p className="text-gray-700 mt-3 leading-relaxed">{report.completedWork}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-2">Decision</label>
            <div className="flex gap-3">
              {['approved','rejected'].map(s => (
                <button key={s} type="button"
                  onClick={() => setForm(p => ({ ...p, status: s }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all capitalize ${
                    form.status === s
                      ? s === 'approved' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600'
                      : 'border-gray-200 text-gray-600'
                  }`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-1.5">Review Note</label>
            <textarea rows={3} className="form-input resize-none" placeholder="Optional feedback…"
              value={form.reviewNote} onChange={e => setForm(p => ({ ...p, reviewNote: e.target.value }))} />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center">Submit Review</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function DailyReportsPage() {
  const dispatch = useDispatch();
  const { list: reports, loading } = useSelector(s => s.reports);
  const { user } = useSelector(s => s.auth);
  const [showSubmit, setShowSubmit] = useState(false);
  const [reviewTarget, setReview]   = useState(null);
  const [statusFilter, setStatus]   = useState('all');

  const isReviewer = ['super_admin','manager','supervisor'].includes(user?.role);

  useEffect(() => { dispatch(fetchReports()); }, [dispatch]);

  const filtered = reports.filter(r => statusFilter === 'all' || r.status === statusFilter);

  return (
    <div className="space-y-6">
      {showSubmit  && <SubmitReportModal onClose={() => setShowSubmit(false)} />}
      {reviewTarget && <ReviewModal report={reviewTarget} onClose={() => setReview(null)} />}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-forest-900 text-xl">Daily Work Reports</h2>
          <p className="text-sm text-gray-500">{reports.length} total reports</p>
        </div>
        <button onClick={() => setShowSubmit(true)} className="btn-primary text-sm py-2.5">
          <Plus size={16} /> Submit Today's Report
        </button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap">
        {['all','submitted','reviewed','approved','rejected'].map(s => (
          <button key={s} onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              statusFilter === s ? 'bg-forest-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>{s === 'all' ? 'All Reports' : s}</button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-forest-600">Loading reports…</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Project</th>
                <th>Date</th>
                <th>Waste (MT)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <motion.tr key={r._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-forest-100 rounded-lg flex items-center justify-center text-forest-700 text-xs font-bold">
                        {r.employee?.name?.charAt(0)}
                      </div>
                      <span className="font-medium text-forest-900 text-sm">{r.employee?.name}</span>
                    </div>
                  </td>
                  <td className="max-w-xs truncate text-xs text-gray-600">{r.project?.title}</td>
                  <td className="text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {new Date(r.reportDate).toLocaleDateString('en-IN')}
                    </span>
                  </td>
                  <td className="text-sm font-medium text-forest-700">{r.wasteCollected ?? '—'}</td>
                  <td>
                    <span className={`badge ${statusColors[r.status]} capitalize`}>{r.status}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-forest-600 rounded-lg hover:bg-forest-50">
                        <Eye size={15} />
                      </button>
                      {isReviewer && r.status === 'submitted' && (
                        <>
                          <button onClick={() => setReview(r)}
                            className="p-1.5 text-green-500 hover:text-green-700 rounded-lg hover:bg-green-50">
                            <CheckCircle size={15} />
                          </button>
                          <button onClick={() => dispatch(reviewReport({ id: r._id, status: 'rejected' }))}
                            className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                            <XCircle size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              No reports found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
