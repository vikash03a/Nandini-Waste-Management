import React from 'react';
import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, subtitle, action, actionLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {Icon && (
        <div className="w-16 h-16 bg-forest-50 rounded-2xl flex items-center justify-center mb-4">
          <Icon size={32} className="text-forest-300" />
        </div>
      )}
      <h3 className="font-semibold text-gray-600 text-lg">{title}</h3>
      {subtitle && <p className="text-gray-400 text-sm mt-1 max-w-xs leading-relaxed">{subtitle}</p>}
      {action && actionLabel && (
        <button onClick={action} className="btn-primary mt-5 text-sm py-2.5">
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
