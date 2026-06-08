import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Eye, Leaf } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const missionPoints = [
  'Promote scientific waste collection, segregation, and disposal.',
  'Support municipal bodies in achieving Swachh Bharat goals.',
  'Empower communities through cleanliness awareness and green initiatives.',
  'Ensure safety, dignity, and growth for all sanitation workers.',
  'Maintain 100% commitment to quality, compliance, and sustainability.',
];

const coreValues = [
  { num: '01', title: 'Integrity',      desc: 'Transparent and honest in all our operations and partnerships.' },
  { num: '02', title: 'Sustainability', desc: 'Every action driven by the goal of a greener, healthier planet.' },
  { num: '03', title: 'Quality',        desc: '100% project completion with excellence and efficiency.' },
  { num: '04', title: 'Commitment',     desc: 'Working 24×7, dedicated to making India clean and safe.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-forest-700/50 text-forest-200 text-xs font-semibold px-4 py-2 rounded-full border border-forest-600/40 mb-4">
              <Leaf size={12} /> About Nandini WMS
            </span>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl mb-4">
              A Clean Nation Begins with<br />Responsible Waste Management
            </h1>
            <p className="text-forest-200 text-lg max-w-2xl mx-auto">
              India's emerging leader in Integrated Solid Waste Management, working since 2018 with a strong presence in Bihar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <span className="text-forest-600 text-sm font-semibold uppercase tracking-wider">Who We Are</span>
            <h2 className="section-title mt-2 mb-6">About Nandini Waste Management Pvt. Ltd.</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nandini Waste Management Pvt. Ltd. is a leading organization providing integrated solid waste management solutions across India, with a strong presence in Bihar. We specialize in door-to-door collection, segregation, processing, and legacy waste treatment.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our team of skilled professionals and sanitation workers ensures 100% project completion with quality and efficiency. With partnerships across 15+ municipalities, we are committed to building cleaner and healthier communities.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We continuously adopt modern technologies and sustainable practices to support the Swachh Bharat Mission. Together, let's transform waste into worth and move towards a cleaner tomorrow.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
            {[
              { label: 'Founded', value: '2018' },
              { label: 'Projects', value: '22+' },
              { label: 'Municipalities', value: '15+' },
              { label: 'States', value: '2' },
              { label: 'Net Worth', value: '₹2.5Cr' },
              { label: 'Turnover (FY25)', value: '₹22.5Cr' },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card p-5 text-center">
                <div className="font-display font-bold text-forest-900 text-2xl">{value}</div>
                <div className="text-gray-500 text-xs mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-forest-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="section-title">Vision & Mission</h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div {...fadeUp(0.1)} className="glass-card p-8 border-l-4 border-forest-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center">
                  <Eye className="text-forest-600" size={20} />
                </div>
                <h3 className="font-display font-bold text-forest-900 text-xl">Company Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                To become India's most trusted and innovative leader in Integrated Solid Waste Management, contributing to a cleaner, greener, and healthier environment for all.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We envision a nation where waste is not a burden, but a valuable resource — powering sustainability, cleanliness, and social well-being across every city and town.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div {...fadeUp(0.2)} className="glass-card p-8 border-l-4 border-earth-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-earth-100 rounded-xl flex items-center justify-center">
                  <Target className="text-earth-600" size={20} />
                </div>
                <h3 className="font-display font-bold text-forest-900 text-xl">Company Mission</h3>
              </div>
              <ul className="space-y-3">
                {missionPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-forest-500 mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-forest-600 text-sm font-semibold uppercase tracking-wider">What Drives Us</span>
            <h2 className="section-title mt-2">Our Core Values</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map(({ num, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.1)} className="glass-card p-6 group hover:-translate-y-1 transition-all duration-300">
                <div className="font-display font-bold text-forest-100 text-5xl mb-4 group-hover:text-forest-200 transition-colors">{num}</div>
                <h3 className="font-semibold text-forest-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-forest-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-forest-600 text-sm font-semibold uppercase tracking-wider">Leadership</span>
            <h2 className="section-title mt-2">Meet Our Team</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: 'Manoj Kumar Vatsa', role: 'Founder & Managing Director', initials: 'MV', bio: 'Visionary leader steering Nandini WMS since 2018, with a passion for community welfare and sustainable waste management.' },
              { name: 'Vijeta Vatsa',       role: 'Director',                    initials: 'VV', bio: 'Driving operational excellence and strategic growth across all municipal partnerships.' },
              { name: 'Subodh Kumar',       role: 'Director',                    initials: 'SK', bio: 'Leading field operations and ensuring quality delivery across all project sites.' },
            ].map(({ name, role, initials, bio }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.15)} className="glass-card p-8 text-center w-72">
                <div className="w-20 h-20 bg-hero rounded-2xl flex items-center justify-center text-white font-display font-bold text-2xl mx-auto mb-4 shadow-green">
                  {initials}
                </div>
                <h3 className="font-display font-semibold text-forest-900 text-lg">{name}</h3>
                <p className="text-forest-600 text-sm mt-1 mb-3">{role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
