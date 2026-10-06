import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ConfidentialityBadgeProps {
  className?: string;
}

export const ConfidentialityBadge: React.FC<ConfidentialityBadgeProps> = ({ className = '' }) => {
  return (
    <div
      role="note"
      aria-label="Garantía de confidencialidad"
      className={`w-full bg-[#FAF6ED] border border-[#C9A66B]/60 rounded-xl py-2.5 px-4 text-center flex items-center justify-center gap-2 shadow-[0_1px_4px_rgba(201,166,107,0.08)] ${className}`}
    >
      <ShieldCheck className="w-4 h-4 text-[#C9A66B] shrink-0" aria-hidden="true" />
      <span className="text-xs sm:text-sm font-semibold text-[#263331] leading-snug">
        Tu sesión será 100% confidencial, un espacio seguro y libre de juicios
      </span>
    </div>
  );
};
