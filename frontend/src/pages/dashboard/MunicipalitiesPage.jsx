// MunicipalitiesPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchMunicipalities, createMunicipality } from '../../redux/slices/municipalitySlice';
import { Plus, X, Building2, MapPin } from 'lucide-react';

function AddModal({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name:'', type:'Nagar Panchayat', district:'', state:'Bihar', wastePerDay:'', contactPerson:'', contactPhone:'' });
  const handleSubmit = async e => { e.preventDefault(); await dispatch(createMunicipality(form)); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-glass-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-forest-900 text-xl">Add Municipality</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-forest-800 mb-1.5">Name *</label>
              <input type="text" required className="form-input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} /></div>
            <div><label className="block text-sm font-medium text-forest-800 mb-1.5">Type *</label>
              <select required className="form-input" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
                {['Nagar Panchayat','Nagar Parishad','Nagar Nigam','Nagar Palika Parishad'].map(t=><option key={t}>{t}</option>)}
              </select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-forest-800 mb-1.5">District *</label>
              <input type="text" required className="form-input" value={form.district} onChange={e=>setForm(p=>({...p,district:e.target.value}))} /></div>
            <div><label className="block text-sm font-medium text-forest-800 mb-1.5">State</label>
              <input type="text" className="form-input" value={form.state} onChange={e=>setForm(p=>({...p,state:e.target.value}))} /></div>
          </div>
          <div><label className="block text-sm font-medium text-forest-800 mb-1.5">Waste/Day (MT)</label>
            <input type="number" className="form-input" value={form.wastePerDay} onChange={e=>setForm(p=>({...p,wastePerDay:e.target.value}))} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-forest-800 mb-1.5">Contact Person</label>
              <input type="text" className="form-input" value={form.contactPerson} onChange={e=>setForm(p=>({...p,contactPerson:e.target.value}))} /></div>
            <div><label className="block text-sm font-medium text-forest-800 mb-1.5">Contact Phone</label>
              <input type="tel" className="form-input" value={form.contactPhone} onChange={e=>setForm(p=>({...p,contactPhone:e.target.value}))} /></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center">Add Municipality</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export function MunicipalitiesPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(s => s.municipalities);
  const { user } = useSelector(s => s.auth);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch]   = useState('');
  const isAdmin = ['super_admin','manager'].includes(user?.role);

  useEffect(() => { dispatch(fetchMunicipalities()); }, [dispatch]);
  const filtered = list.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()) || m.district?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {showAdd && <AddModal onClose={() => setShowAdd(false)} />}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-forest-900 text-xl">Municipalities</h2>
          <p className="text-sm text-gray-500">{list.length} municipalities in portfolio</p>
        </div>
        {isAdmin && <button onClick={() => setShowAdd(true)} className="btn-primary text-sm py-2.5"><Plus size={16} /> Add Municipality</button>}
      </div>
      <div className="relative max-w-xs">
        <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} className="form-input pl-4 py-2.5 text-sm" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m, i) => (
          <motion.div key={m._id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.04 }}
            className="glass-card p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="text-forest-600" size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-forest-900 text-sm">{m.name}</h3>
                <span className="badge badge-green text-[10px] mt-1">{m.type}</span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p className="flex items-center gap-1.5"><MapPin size={11}/> {m.district}, {m.state}</p>
              {m.wastePerDay && <p>Waste/day: <span className="font-medium text-forest-700">{m.wastePerDay} MT</span></p>}
              {m.contactPerson && <p>Contact: {m.contactPerson}</p>}
              {m.contactPhone && <p>{m.contactPhone}</p>}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="col-span-3 text-center py-12 text-gray-400 text-sm">No municipalities found</div>}
      </div>
    </div>
  );
}

export default MunicipalitiesPage;
