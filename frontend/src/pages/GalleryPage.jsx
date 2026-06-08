// GalleryPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Image } from 'lucide-react';

const placeholders = [
  { label: 'Waste Collection Operations',   bg: 'from-forest-800 to-forest-600',  icon: '🚛' },
  { label: 'MRF Facility – Kahalgaon',      bg: 'from-earth-800 to-earth-600',    icon: '♻️' },
  { label: 'Field Team at Work',            bg: 'from-blue-800 to-blue-600',      icon: '👷' },
  { label: 'JCB Legacy Waste Treatment',    bg: 'from-amber-800 to-amber-600',    icon: '🏗️' },
  { label: 'Nagar Parishad Partnership',    bg: 'from-purple-800 to-purple-600',  icon: '🏛️' },
  { label: 'Door-to-Door Tricycle Fleet',   bg: 'from-teal-800 to-teal-600',      icon: '🚲' },
  { label: 'Waste Segregation Facility',    bg: 'from-rose-800 to-rose-600',      icon: '🔬' },
  { label: 'Community Awareness Drive',     bg: 'from-indigo-800 to-indigo-600',  icon: '📣' },
  { label: 'Bio-remediation Site',          bg: 'from-lime-800 to-lime-600',      icon: '🌿' },
];

export function GalleryPage() {
  return (
    <div>
      <section className="bg-hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-forest-700/50 text-forest-200 text-xs font-semibold px-4 py-2 rounded-full border border-forest-600/40 mb-4">
              <Image size={12} /> Our Work in Action
            </span>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl mb-4">Gallery</h1>
            <p className="text-forest-200 text-lg max-w-2xl mx-auto">
              A visual journey through our waste management projects across Bihar and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {placeholders.map(({ label, bg, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`bg-gradient-to-br ${bg} rounded-2xl aspect-video flex flex-col items-center justify-center cursor-pointer
                            hover:scale-[1.02] transition-transform duration-300 shadow-glass overflow-hidden relative group`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative text-center p-4">
                  <div className="text-5xl mb-3">{icon}</div>
                  <p className="text-white text-sm font-medium leading-tight">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            Real project photos are uploaded via the Employee Portal after field work completion.
          </p>
        </div>
      </section>
    </div>
  );
}

export default GalleryPage;
