import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Users, Building2, TrendingUp, ArrowRight, CheckCircle, Phone } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const stats = [
  { value: '7+',  label: 'Years of Service',      icon: TrendingUp },
  { value: '15+', label: 'Municipalities Served',  icon: Building2 },
  { value: '₹22Cr+', label: 'Annual Turnover',     icon: TrendingUp },
  { value: '100+', label: 'Sanitation Workers',    icon: Users },
];

const services = [
  { icon: '🚛', title: 'Door-to-Door Collection', desc: 'Advanced tricycles, mini-tippers and smart tracking for daily waste pickup.' },
  { icon: '🔬', title: 'Waste Segregation',        desc: 'Shredders, compactors and screening machines for scientific processing.' },
  { icon: '♻️', title: 'Material Recovery (MRF)',  desc: 'Mechanized sorting systems recovering recyclables, reducing landfill load.' },
  { icon: '🌱', title: 'Legacy Waste Treatment',   desc: 'Bio-remediation and waste-to-compost to reclaim old dump sites.' },
  { icon: '🏢', title: 'Housekeeping & Manpower',  desc: 'Trained workforce for seamless operations across all facilities.' },
];

const values = ['Integrity', 'Sustainability', 'Quality', 'Commitment'];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative bg-hero min-h-[92vh] flex items-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-leaf-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-transparent to-transparent" />

        {/* Floating circles */}
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-forest-600/20 rounded-full blur-3xl" />
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-forest-400/15 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 bg-forest-700/50 text-forest-200 text-xs font-semibold px-4 py-2 rounded-full border border-forest-600/40 mb-6">
                <Leaf size={12} /> Since 2018 · Swachh Bharat Mission Partner
              </span>

              <h1 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                India's Emerging<br />
                <span className="text-gradient bg-gradient-to-r from-forest-300 to-emerald-300">
                  Waste Management
                </span>
                <br />Leader
              </h1>

              <p className="text-forest-200 text-lg leading-relaxed mb-8 max-w-xl">
                Working across India with a strong presence in Bihar — delivering sustainable waste management and sanitation solutions for a cleaner, greener India.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary text-base px-8 py-4">
                  Get In Touch <ArrowRight size={18} />
                </Link>
                <Link to="/projects" className="btn-secondary border-white/40 text-white hover:bg-white/10 text-base px-8 py-4">
                  Our Projects
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 mt-10">
                {values.map(v => (
                  <div key={v} className="flex items-center gap-2 text-forest-200 text-sm">
                    <CheckCircle size={14} className="text-forest-400" /> {v}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card-dark p-6 text-center"
              >
                <Icon className="text-forest-400 mx-auto mb-3" size={28} />
                <div className="font-display font-bold text-white text-3xl">{value}</div>
                <div className="text-forest-300 text-sm mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp()}>
              <span className="text-forest-600 text-sm font-semibold uppercase tracking-wider">About Us</span>
              <h2 className="section-title mt-2 mb-6">
                A Clean Nation Begins with<br />Responsible Waste Management
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Nandini Waste Management Pvt. Ltd., we believe that cleanliness is not just a service — it's a commitment to building a healthier and greener India.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Under the visionary leadership of <strong className="text-forest-700">Mr. Manoj Kumar Vatsa</strong>, our company continuously redefines waste management through innovation, efficiency, and sustainability.
              </p>
              <Link to="/about" className="btn-primary">
                Learn More <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
              {[
                { num: '14+', label: 'Completed Projects', color: 'bg-forest-50 border-forest-200' },
                { num: '8',   label: 'Ongoing Projects',   color: 'bg-earth-50 border-earth-200' },
                { num: '2',   label: 'States Covered',     color: 'bg-blue-50 border-blue-200' },
                { num: '24×7',label: 'Operations',         color: 'bg-purple-50 border-purple-200' },
              ].map(({ num, label, color }) => (
                <div key={label} className={`${color} border-2 rounded-2xl p-6 text-center`}>
                  <div className="font-display font-bold text-forest-900 text-3xl">{num}</div>
                  <div className="text-gray-600 text-sm mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-forest-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-forest-600 text-sm font-semibold uppercase tracking-wider">What We Do</span>
            <h2 className="section-title mt-2">Our Core Services</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Comprehensive integrated waste management solutions from collection to processing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className="glass-card p-6 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-semibold text-forest-900 text-lg mb-2 group-hover:text-forest-700">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.5)} className="text-center mt-10">
            <Link to="/services" className="btn-secondary">
              All Services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── RECENT PROJECTS ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-forest-600 text-sm font-semibold uppercase tracking-wider">Track Record</span>
            <h2 className="section-title mt-2">Projects Across Bihar & Beyond</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Nagar Nigam, Madhubani',     type: 'SWM',      status: 'completed', period: '2023–2024' },
              { name: 'Nagar Parishad, Janjharpur', type: 'SWM',      status: 'completed', period: '2020–2022' },
              { name: 'Nagar Panchayat, Murliganj', type: 'SWM',      status: 'ongoing',   period: '2023–2025' },
              { name: 'Nagar Parishad, Barbigha',   type: 'SWM',      status: 'ongoing',   period: '2024–present' },
              { name: 'Nagar Panchayat, Kahalgaon', type: 'MRF',      status: 'ongoing',   period: '2022–2025' },
              { name: 'Doiwala, Uttarakhand',        type: 'SWM',      status: 'ongoing',   period: '2024–present' },
            ].map(({ name, type, status, period }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.08)} className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
                  <Recycle className="text-forest-600" size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-forest-900 text-sm">{name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{period}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="badge badge-green">{type}</span>
                    <span className={status === 'ongoing' ? 'badge badge-blue' : 'badge badge-gray'}>
                      {status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.6)} className="text-center mt-10">
            <Link to="/projects" className="btn-primary">
              View All Projects <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TURNOVER BANNER ────────────────────────────────────────────── */}
      <section className="py-20 bg-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
              Average Annual Turnover
            </h2>
            <div className="text-6xl md:text-7xl font-display font-bold text-gradient bg-gradient-to-r from-forest-300 to-emerald-300 mb-4">
              ₹17.55 Cr
            </div>
            <p className="text-forest-300 mb-2">Net Worth: ₹2.50 Cr | FY 2024-25 Revenue: ₹22.56 Cr</p>
            <p className="text-forest-400 text-sm">Target FY 2026-27: ₹100 Crore</p>
          </motion.div>
        </div>
      </section>

      {/* ── LEADERSHIP ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
       <div className="flex flex-wrap justify-center gap-8">
  {[
    {
      name: "Manoj Kumar Vatsa",
      role: "Founder & Managing Director",
      initials: "MV",
      bio: "Visionary entrepreneur who founded Nandini Waste Management in 2018 with a mission to transform waste management across India. Under his leadership, the company has expanded to multiple municipal partnerships and continues to drive sustainable growth and innovation."
    },
    {
      name: "Vijeta Vatsa",
      role: "Director",
      initials: "VV",
      bio: "A key pillar of Nandini's leadership team, bringing strategic direction and operational excellence to the organization. Her dedication to community welfare and sustainable practices strengthens the company's long-term vision and impact."
    }
  ].map(({ name, role, initials, bio }, i) => (
    <motion.div
      key={name}
      {...fadeUp(i * 0.15)}
      className="glass-card p-8 text-center w-full max-w-md"
    >
      <div className="w-24 h-24 bg-hero rounded-2xl flex items-center justify-center text-white font-display font-bold text-3xl mx-auto mb-5">
        {initials}
      </div>

      <h3 className="font-display font-semibold text-forest-900 text-2xl">
        {name}
      </h3>

      <p className="text-forest-600 font-medium mt-2">
        {role}
      </p>

      <p className="text-gray-600 text-sm leading-7 mt-5">
        {bio}
      </p>
    </motion.div>
  ))}
</div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-forest-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="section-title mb-4">Ready to Make India Cleaner?</h2>
            <p className="text-gray-600 mb-8">Partner with us for sustainable waste management solutions for your municipality or city.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                <Phone size={18} /> Contact Us Today
              </Link>
              <a href="tel:+917903607816" className="btn-secondary text-base px-8 py-4">
                +91-7903607816
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
