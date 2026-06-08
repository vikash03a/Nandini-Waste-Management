import React from 'react';
import { motion } from 'framer-motion';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import { Table } from 'lucide-react';

/**
 * columns: [{ key, label, render? }]
 * data:    array of row objects
 */
export default function DataTable({ columns, data, loading, emptyTitle = 'No data found', emptySubtitle }) {
  if (loading) return <LoadingSpinner />;

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full data-table min-w-[600px]">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <motion.tr key={row._id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                {columns.map(col => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <EmptyState icon={Table} title={emptyTitle} subtitle={emptySubtitle} />
      )}
    </div>
  );
}
