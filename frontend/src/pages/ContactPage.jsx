import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Leaf } from 'lucide-react';
import toast from 'react-hot-toast';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Message sent! We will contact you shortly.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-forest-700/50 text-forest-200 text-xs font-semibold px-4 py-2 rounded-full border border-forest-600/40 mb-4">
              <Leaf size={12} /> Get In Touch
            </span>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl mb-4">Contact Us</h1>
            <p className="text-forest-200 text-lg max-w-2xl mx-auto">
              Reach out to partner with us or learn more about our waste management services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <motion.div {...fadeUp()}>
              <h2 className="section-title text-2xl mb-6">Get In Touch</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                We're available 24×7 for inquiries regarding waste management services, project partnerships, and employment opportunities.
              </p>
            </motion.div>

            {[
              { icon: Phone,   label: 'Phone',   value: '+91-7903607816',          href: 'tel:+917903607816' },
              { icon: Mail,    label: 'Email',   value: 'nandiniswm18@gmail.com',  href: 'mailto:nandiniswm18@gmail.com' },
              { icon: MapPin,  label: 'Address', value: 'C/O Manoj Kumar Vatsa, Nariyar, Kanti, Muzaffarpur (Bihar) – 843109', href: null },
              { icon: Clock,   label: 'Hours',   value: '24×7 Operations', href: null },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <motion.div key={label} {...fadeUp(i * 0.1)} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-forest-600" size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-forest-700 uppercase tracking-wide">{label}</div>
                  {href ? (
                    <a href={href} className="text-gray-700 text-sm hover:text-forest-600 transition-colors">{value}</a>
                  ) : (
                    <p className="text-gray-700 text-sm">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Founder */}
            <motion.div {...fadeUp(0.4)} className="glass-card p-5 mt-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-hero rounded-xl flex items-center justify-center text-white font-bold">MV</div>
                <div>
                  <div className="font-semibold text-forest-900 text-sm">Manoj Kumar Vatsa</div>
                  <div className="text-xs text-forest-500">Founder & Managing Director</div>
                </div>
              </div>
              <p className="text-xs text-gray-500">For business inquiries and partnership discussions.</p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-2">
            <div className="glass-card p-8">
              <h3 className="font-display font-bold text-forest-900 text-xl mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-1.5">Full Name *</label>
                    <input type="text" required placeholder="Your name"
                      value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-1.5">Email Address *</label>
                    <input type="email" required placeholder="your@email.com"
                      value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="form-input" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-1.5">Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-1.5">Subject *</label>
                    <select required value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className="form-input">
                      <option value="">Select subject…</option>
                      <option>Municipal Partnership</option>
                      <option>SWM Services Inquiry</option>
                      <option>MRF Setup</option>
                      <option>Manpower Supply</option>
                      <option>Employment</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-800 mb-1.5">Message *</label>
                  <textarea required rows={5} placeholder="Tell us about your requirements…"
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="form-input resize-none" />
                </div>
                <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-3.5">
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
