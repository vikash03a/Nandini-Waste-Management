import React from 'react';
import { Leaf } from 'lucide-react';

export default function LoadingSpinner({ fullPage = false, message = 'Loading…' }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-hero flex flex-col items-center justify-center z-50">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-forest-600/30 border-t-forest-400 rounded-full animate-spin" />
          <Leaf className="absolute inset-0 m-auto text-white" size={22} />
        </div>
        <p className="text-forest-200 text-sm font-medium animate-pulse">{message}</p>
        <p className="text-forest-400 text-xs mt-1">Nandini Waste Management Pvt. Ltd.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-8 h-8 border-2 border-forest-500/30 border-t-forest-500 rounded-full animate-spin" />
      <p className="text-forest-600 text-sm">{message}</p>
    </div>
  );
}
