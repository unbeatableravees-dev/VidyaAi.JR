import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: string | React.ReactNode;
}

interface StyledSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  icon?: React.ReactNode;
  badge?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export const StyledSelect: React.FC<StyledSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
  badge,
  className = '',
  id,
  disabled = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor={id} className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            {label}
          </label>
          {badge && (
            <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full py-2.5 sm:py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-bold text-slate-800 transition-all cursor-pointer appearance-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100/60 focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed ${
            icon ? 'pl-10 pr-9' : 'pl-4 pr-9'
          }`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-slate-800 font-semibold py-1">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
