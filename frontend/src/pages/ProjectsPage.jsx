import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Search } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const allProjects = [
  { id: 1,  name: 'Nagar Panchayat, Sahebganj',      district: 'Bhagalpur',      type: 'SWM',      status: 'completed', period: 'Jun 2018 – Oct 2018' },
  { id: 2,  name: 'Nagar Panchayat, Pirpainti',       district: 'Bhagalpur',      type: 'SWM',      status: 'completed', period: 'Sep 2021 – Aug 2022' },
  { id: 3,  name: 'Nagar Panchayat, Pirpainti',       district: 'Bhagalpur',      type: 'SWM',      status: 'completed', period: 'Mar 2024 – Mar 2025' },
  { id: 4,  name: 'Nagar Parishad, Janjharpur',       district: 'Madhubani',      type: 'SWM',      status: 'completed', period: 'Sep 2020 – Apr 2022' },
  { id: 5,  name: 'Nagar Panchayat, Jainagar',        district: 'Madhubani',      type: 'SWM',      status: 'completed', period: 'Oct 2020 – Mar 2021' },
  { id: 6,  name: 'Nagar Panchayat, Kahalgaon',       district: 'Bhagalpur',      type: 'SWM',      status: 'completed', period: 'Jul 2023 – Jan 2021' },
  { id: 7,  name: 'Nagar Panchayat, Kahalgaon',       district: 'Bhagalpur',      type: 'SWM',      status: 'completed', period: 'Apr 2022 – Oct 2025' },
  { id: 8,  name: 'Nagar Nigam, Sasaram',             district: 'Rohtas',         type: 'SWM',      status: 'completed', period: 'Jun 2021 – Aug 2021' },
  { id: 9,  name: 'Nagar Parishad, Bairgania',        district: 'Sitamarhi',      type: 'SWM',      status: 'completed', period: 'Oct 2020 – Dec 2024' },
  { id: 10, name: 'Nagar Panchayat, Sekhopur Sarai',  district: 'Nalanda',        type: 'SWM',      status: 'completed', period: 'Sep 2022 – Jun 2024' },
  { id: 11, name: 'Nagar Panchayat, Mirganj',         district: 'W. Champaran',   type: 'SWM',      status: 'completed', period: 'Jul 2023 – Aug 2024' },
  { id: 12, name: 'Nagar Parishad, Sheohar',          district: 'Sheohar',        type: 'SWM',      status: 'completed', period: 'Feb 2022 – Feb 2023' },
  { id: 13, name: 'Nagar Nigam, Madhubani',           district: 'Madhubani',      type: 'SWM',      status: 'completed', period: 'Jan 2023 – Aug 2024' },
  { id: 14, name: 'Nagar Panchayat, Murliganj',       district: 'Madhepura',      type: 'SWM',      status: 'completed', period: 'Nov 2023 – Oct 2025' },
  { id: 15, name: 'Nagar Parishad, Barbigha',         district: 'Sheikhpura',     type: 'SWM',      status: 'ongoing',   period: '2024 – Present' },
  { id: 16, name: 'Nagar Parishad, Mahnar',           district: 'Vaishali',       type: 'SWM',      status: 'ongoing',   period: '2022 – Present' },
  { id: 17, name: 'Nagar Parishad, Daudnagar',        district: 'Aurangabad',     type: 'SWM',      status: 'ongoing',   period: '2023 – Present' },
  { id: 18, name: 'Nagar Panchayat, Kahalgaon MRF',   district: 'Bhagalpur',      type: 'MRF',      status: 'ongoing',   period: '2022 – Present' },
  { id: 19, name: 'Housekeeping – Katihar, Purniya',  district: 'Multi-district', type: 'Housekeeping', status: 'ongoing', period: '2023 – Present' },
  { id: 20, name: 'Nagar Palika, Doiwala, Dehradun',  district: 'Dehradun, UK',   type: 'SWM',      status: 'ongoing',   period: '2024 – Present' },
  { id: 21, name: 'Nagar Panchayat, Thalisain',       district: 'Pauri Garhwal',  type: 'SWM',      status: 'ongoing',   period: '2024 – Present' },
  { id: 22, name: 'Nagar Panchayat, Sutanganj',       district: 'Bhagalpur',      type: 'Manpower', status: 'ongoing',   period: '2024 – Present' },
];

const typeColors = {
  SWM:         'badge-green',
  MRF:         'badge-blue',
  Housekeeping:'badge-yellow',
  Manpower:    'badge-gray',
};

export default function ProjectsPage() {
  const [filter, setFilter]   = useState('all');
  const [search, setSearch]   = useState('');

  const filtered = allProjects.filter(p => {
    const matchStatus = filter === 'all' || p.status === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.district.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total:     allProjects.length,
    ongoing:   allProjects.filter(p => p.status === 'ongoing').length,
    completed: allProjects.filter(p => p.status === 'completed').length,
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-forest-700/50 text-forest-200 text-xs font-semibold px-4 py-2 rounded-full border border-forest-600/40 mb-4">
              <Leaf size={12} /> Our Track Record
            </span>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl mb-4">Our Projects</h1>
            <p className="text-forest-200 text-lg max-w-2xl mx-auto">
              Delivering integrated waste management solutions across Bihar and Uttarakhand since 2018.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: 'Total Projects', value: stats.total, color: 'text-forest-700' },
              { label: 'Ongoing',        value: stats.ongoing,   color: 'text-blue-600' },
              { label: 'Completed',      value: stats.completed, color: 'text-gray-600' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <div className={`font-display font-bold text-4xl ${color}`}>{value}</div>
                <div className="text-gray-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + list */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text" placeholder="Search by name or district…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all','ongoing','completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    filter === f ? 'bg-forest-600 text-white shadow-green' : 'bg-white text-forest-700 border border-forest-200 hover:bg-forest-50'
                  }`}
                >
                  {f === 'all' ? 'All Projects' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <motion.div key={p.id} {...fadeUp(i * 0.03)} className="glass-card p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-8 h-8 bg-forest-100 rounded-lg flex items-center justify-center shrink-0 font-bold text-forest-700 text-xs">
                    {p.id}
                  </div>
                  <span className={`badge ${p.status === 'ongoing' ? 'badge-blue' : 'badge-gray'} capitalize`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="font-semibold text-forest-900 text-sm leading-snug mb-1">{p.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{p.district}</p>
                <div className="flex items-center justify-between">
                  <span className={`badge ${typeColors[p.type] || 'badge-gray'}`}>{p.type}</span>
                  <span className="text-xs text-gray-400">{p.period}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">No projects match your search.</div>
          )}
        </div>
      </section>

      {/* Turnover */}
      <section className="py-16 bg-hero text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <h2 className="font-display font-bold text-white text-3xl mb-6">Financial Growth</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { fy: 'FY 2020-21', val: '₹2.15 Cr' },
                { fy: 'FY 2021-22', val: '₹3.32 Cr' },
                { fy: 'FY 2022-23', val: '₹9.55 Cr' },
                { fy: 'FY 2023-24', val: '₹20.55 Cr' },
                { fy: 'FY 2024-25', val: '₹22.56 Cr' },
                { fy: 'Target FY27', val: '₹100 Cr' },
              ].map(({ fy, val }) => (
                <div key={fy} className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="font-display font-bold text-white text-xl">{val}</div>
                  <div className="text-forest-300 text-xs mt-1">{fy}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
