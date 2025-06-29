
import React from 'react';
import { FilterIcon, XCircleIcon } from './icons';

interface FilterControlsProps {
  headers: string[];
  filters: Record<string, string>;
  onFilterChange: (header: string, value: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ headers, filters, onFilterChange }) => {
  if (headers.length === 0) {
    return null;
  }

  const handleClearFilter = (header: string) => {
    onFilterChange(header, '');
  };
  
  const handleClearAllFilters = () => {
    headers.forEach(header => onFilterChange(header, ''));
  };

  const hasActiveFilters = Object.values(filters).some(val => val.trim() !== '');

  return (
    <div className="p-6 bg-slate-700/50 rounded-lg shadow border border-slate-600 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
            <FilterIcon className="w-6 h-6 mr-2 text-sky-400" />
            <h3 className="text-xl font-semibold text-slate-100">Filter by Column</h3>
        </div>
        {hasActiveFilters && (
            <button
            onClick={handleClearAllFilters}
            className="text-sm text-sky-400 hover:text-sky-300 flex items-center transition-colors"
            title="Clear all filters"
            >
            <XCircleIcon className="w-4 h-4 mr-1" />
            Clear All Filters
            </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {headers.map((header) => (
          <div key={header} className="relative">
            <label htmlFor={`filter-${header}`} className="block text-sm font-medium text-slate-300 mb-1 truncate" title={header}>
              {header}
            </label>
            <input
              type="text"
              id={`filter-${header}`}
              name={`filter-${header}`}
              value={filters[header] || ''}
              onChange={(e) => onFilterChange(header, e.target.value)}
              placeholder={`Filter ${header}...`}
              className="w-full pl-3 pr-10 py-2 bg-slate-600 border border-slate-500 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100"
            />
            {filters[header] && (
                <button 
                    onClick={() => handleClearFilter(header)}
                    className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                    title={`Clear filter for ${header}`}
                >
                    <XCircleIcon className="h-5 w-5" />
                </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterControls;
