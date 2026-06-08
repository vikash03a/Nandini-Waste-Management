import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const services = [
  {
    num: '01', icon: '🚛', title: 'Door-to-Door Waste Collection System',
    desc: 'Advanced collection network using tricycles, mini-tippers, and smart tracking for efficient daily waste pickup from every household and business.',
    features: ['Tricycle & mini-tipper fleet', 'Smart route tracking', 'Daily collection schedules', 'Real-time monitoring'],
  },
  {
    num: '02', icon: '⚙️', title: 'Waste Segregation & Processing Equipment',
    desc: 'Shredders, compactors, and screening machines for scientific waste processing, ensuring maximum resource recovery and minimal landfill use.',
    features: ['Industrial shredders', 'Hydraulic compactors', 'Screening machinery', 'Source segregation'],
  },
  {
    num: '03', icon: '♻️', title: 'Material Recovery Facility (MRF) Units',
    desc: 'Mechanized sorting and segregation systems that recover recyclable materials and significantly reduce landfill load.',
    features: ['5 TPD MRF units', 'Automated sorting', 'Recyclable recovery', 'Landfill diversion'],
  },
  {
    num: '04', icon: '🌱', title: 'Legacy Waste Treatment Solutions',
    desc: 'Bio-remediation and waste-to-compost technologies to treat old dump sites, reclaim land, and eliminate environmental hazards.',
    features: ['Bio-remediation', 'Waste-to-compost', 'Land reclamation', 'Dump site closure'],
  },
  {
    num: '05', icon: '🏢', title: 'Housekeeping & Manpower Supply',
    desc: 'Trained workforce and professional housekeeping services to ensure cleanliness, efficient operations, and seamless waste management across facilities.',
    features: ['Trained sanitation staff', 'Professional housekeeping', 'Manpower outsourcing', 'Supervision & monitoring'],
  },
];

const problems = [
  { prob: 'Segregation at Source', solution: 'Structured door-to-door collection with colour-coded bins and citizen awareness.' },
  { prob: 'Inadequate Collection', solution: 'Dense collection networks with tricycles, tippers and real-time GPS tracking.' },
  { prob: 'Environmental Pollution', solution: 'Scientific processing, MRF units and bio-remediation to minimize land, water and air pollution.' },
  { prob: 'Low Public Awareness', solution: 'Community engagement campaigns and educational programs on sustainable waste practices.' },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-forest-700/50 text-forest-200 text-xs font-semibold px-4 py-2 rounded-full border border-forest-600/40 mb-4">
              <Leaf size={12} /> What We Offer
            </span>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl mb-4">Our Services</h1>
            <p className="text-forest-200 text-lg max-w-2xl mx-auto">
              Comprehensive integrated waste management solutions from doorstep collection to scientific processing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {services.map(({ num, icon, title, desc, features }, i) => (
            <motion.div key={num} {...fadeUp(i * 0.05)}
              className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 !== 0 ? 'lg:[&>*:first-child]:order-last' : ''}`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{icon}</span>
                  <span className="font-display font-bold text-forest-100 text-4xl">{num}</span>
                </div>
                <h2 className="font-display font-bold text-forest-900 text-2xl mb-4">{title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-forest-500 rounded-full" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-8 bg-forest-50 flex items-center justify-center min-h-48">
                <div className="text-center">
                  <div className="text-8xl mb-4">{icon}</div>
                  <div className="font-display font-semibold text-forest-900 text-xl">{title.split(' ').slice(0, 3).join(' ')}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="py-20 bg-forest-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="section-title">Urban Sanitation Problems & Our Solutions</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map(({ prob, solution }, i) => (
              <motion.div key={prob} {...fadeUp(i * 0.1)} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 font-bold text-xs">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Problem: {prob}</h4>
                    <div className="flex items-start gap-2 mt-3">
                      <div className="w-5 h-5 bg-forest-100 rounded flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-forest-600 text-xs font-bold">✓</span>
                      </div>
                      <p className="text-gray-600 text-sm">{solution}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue model */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="section-title">Our Business Model</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'Service Fees', desc: 'Charging for collection, recycling and disposal based on volume, frequency and waste type.' },
              { icon: '♻️', title: 'Recycled Materials', desc: 'Revenue from sale of materials processed through our MRF and recycling facilities.' },
              { icon: '⚡', title: 'Waste-to-Energy', desc: 'Earnings from sale of energy produced in our waste-to-energy conversion plants.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.1)} className="glass-card p-6 text-center">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="font-semibold text-forest-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-hero text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <h2 className="font-display font-bold text-white text-3xl mb-4">Need Waste Management Solutions?</h2>
            <p className="text-forest-300 mb-8">We work with municipalities, corporates, and government bodies across India.</p>
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Get in Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
