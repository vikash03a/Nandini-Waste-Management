import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProject } from '../../redux/slices/projectSlice';
import {
  ArrowLeft, Building2, Calendar, Users, TrendingUp,
  FileText, MapPin, DollarSign, BarChart2
} from 'lucide-react';

const statusColors = {
  ongoing: 'bg-blue-100 text-blue-700 border-blue-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  upcoming: 'bg-amber-100 text-amber-700 border-amber-200',
  on_hold: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function ProjectDetailPage() {
  const { id }   = useParams();
  const dispatch = useDispatch();
  const { current: project, loading } = useSelector(s => s.projects);

  useEffect(() => { dispatch(fetchProject(id)); }, [dispatch, id]);

  if (loading || !project) {
    return (
      <div className="text-center py-16">
        <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-forest-600 text-sm">Loading project…</p>
      </div>
    );
  }

  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : 'TBD';
  const fmtCurrency = n => n ? `₹${(n/100000).toFixed(2)} L` : '—';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <Link to="/dashboard/projects"
        className="inline-flex items-center gap-2 text-sm text-forest-600 hover:text-forest-900 font-medium group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className={`badge border capitalize ${statusColors[project.status] || 'badge-gray'}`}>
                {project.status?.replace('_', ' ')}
              </span>
              <span className="badge badge-green">{project.projectType}</span>
            </div>
            <h1 className="font-display font-bold text-forest-900 text-2xl leading-tight mb-2">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Building2 size={14} />
              {project.municipality?.name}, {project.municipality?.district}, {project.municipality?.state}
            </div>
          </div>

          {/* Progress ring area */}
          <div className="shrink-0 text-center">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#d9f2d9" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2e9e2e" strokeWidth="3"
                  strokeDasharray={`${project.progressPercent} ${100 - project.progressPercent}`}
                  strokeDashoffset="0" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-bold text-forest-900 text-lg leading-none">
                  {project.progressPercent}%
                </span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wide">Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-gray-600 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">
            {project.description}
          </p>
        )}
      </motion.div>

      {/* Info grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar,    label: 'Start Date',      value: fmtDate(project.startDate) },
          { icon: Calendar,    label: 'End Date',        value: fmtDate(project.endDate) },
          { icon: DollarSign,  label: 'Contract Value',  value: fmtCurrency(project.contractValue) },
          { icon: BarChart2,   label: 'Waste Target',    value: project.wasteCollectionTarget ? `${project.wasteCollectionTarget} MT/day` : '—' },
        ].map(({ icon: Icon, label, value }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} className="text-forest-500" />
              <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</span>
            </div>
            <p className="font-semibold text-forest-900 text-sm">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Team & Documents */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Team */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-6">
          <h3 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
            <Users size={18} className="text-forest-600" /> Project Team
          </h3>
          <div className="space-y-3">
            {project.assignedManager && (
              <div className="flex items-center gap-3 p-3 bg-forest-50 rounded-xl">
                <div className="w-8 h-8 bg-forest-200 rounded-lg flex items-center justify-center text-forest-800 font-bold text-xs">
                  {project.assignedManager.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-forest-900">{project.assignedManager.name}</p>
                  <p className="text-xs text-gray-400">Manager</p>
                </div>
              </div>
            )}
            {project.assignedSupervisor && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center text-blue-800 font-bold text-xs">
                  {project.assignedSupervisor.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-forest-900">{project.assignedSupervisor.name}</p>
                  <p className="text-xs text-gray-400">Supervisor</p>
                </div>
              </div>
            )}
            {project.assignedEmployees?.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Field Team ({project.assignedEmployees.length})</p>
                <div className="flex flex-wrap gap-2">
                  {project.assignedEmployees.map(emp => (
                    <div key={emp._id} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-100">
                      <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 text-[9px] font-bold">
                        {emp.name?.charAt(0)}
                      </div>
                      <span className="text-xs text-gray-700">{emp.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!project.assignedManager && !project.assignedSupervisor && project.assignedEmployees?.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No team assigned yet</p>
            )}
          </div>
        </motion.div>

        {/* Documents */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-6">
          <h3 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
            <FileText size={18} className="text-forest-600" /> Documents
          </h3>
          {project.documents?.length > 0 ? (
            <div className="space-y-2">
              {project.documents.map((doc, i) => (
                <a key={i} href={doc.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-forest-50 border border-gray-100 hover:border-forest-200 transition-all group">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText size={14} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-forest-900 truncate group-hover:text-forest-700">{doc.name}</p>
                    <p className="text-xs text-gray-400">{new Date(doc.uploadedAt).toLocaleDateString('en-IN')}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText size={36} className="mx-auto mb-3 text-gray-200" />
              <p className="text-sm text-gray-400">No documents uploaded yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Municipality info */}
      {project.municipality && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card p-6">
          <h3 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-forest-600" /> Municipality Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Name',          value: project.municipality.name },
              { label: 'Type',          value: project.municipality.type },
              { label: 'District',      value: project.municipality.district },
              { label: 'State',         value: project.municipality.state },
              { label: 'Waste per Day', value: project.municipality.wastePerDay ? `${project.municipality.wastePerDay} MT` : '—' },
              { label: 'Contact',       value: project.municipality.contactPerson || '—' },
              { label: 'Phone',         value: project.municipality.contactPhone || '—' },
              { label: 'Email',         value: project.municipality.contactEmail || '—' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{label}</p>
                <p className="text-sm text-forest-900 font-medium mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Notes */}
      {project.notes && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="glass-card p-5 border-l-4 border-amber-400 bg-amber-50/50">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Project Notes</p>
          <p className="text-sm text-gray-700 leading-relaxed">{project.notes}</p>
        </motion.div>
      )}
    </div>
  );
}
