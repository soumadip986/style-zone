import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#25d366" />,
    error: <AlertCircle size={18} color="#ef4444" />,
    info: <Info size={18} color="#c59d5f" />
  };

  return (
    <div className="toast">
      {icons[type] || icons.info}
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ marginLeft: '0.5rem', color: '#888' }}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
