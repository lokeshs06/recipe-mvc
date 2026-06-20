import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      ></div>

      {/* Modal panel */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4 mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500 leading-relaxed">
              {message}
            </p>
          </div>
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
          >
            {isLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Delete Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
