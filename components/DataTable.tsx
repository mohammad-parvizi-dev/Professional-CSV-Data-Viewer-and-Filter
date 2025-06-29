
import React from 'react';
import { CsvRow } from '../types';
import { ExclamationTriangleIcon, TableIcon } from './icons';

interface DataTableProps {
  headers: string[];
  rows: CsvRow[];
  originalRowCount: number;
}

const DataTable: React.FC<DataTableProps> = ({ headers, rows, originalRowCount }) => {
  if (headers.length === 0 && rows.length === 0) {
    return (
        <div className="text-center py-10 bg-slate-700/30 rounded-lg border border-slate-600">
            <TableIcon className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-slate-400">No data to display. Upload a CSV file or check parsing messages.</p>
        </div>
    );
  }
  
  if (headers.length > 0 && rows.length === 0 && originalRowCount > 0) {
     return (
        <div className="text-center py-10 bg-slate-700/30 rounded-lg border border-slate-600">
            <TableIcon className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-slate-300">No rows match the current filter criteria.</p>
            <p className="text-sm text-slate-400">Total rows in dataset: {originalRowCount}.</p>
        </div>
    );
  }


  return (
    <div className="bg-slate-700/50 shadow-lg rounded-lg border border-slate-600">
        <div className="px-4 py-3 border-b border-slate-600">
            <h3 className="text-lg font-medium leading-6 text-slate-100">
                Displaying {rows.length} of {originalRowCount} rows
            </h3>
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-600">
          <thead className="bg-slate-700 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider w-16">
                Line
              </th>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider"
                  title={header}
                >
                  <div className="truncate max-w-xs">{header}</div>
                </th>
              ))}
               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider w-20">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${row.errors ? 'bg-rose-800/30 hover:bg-rose-700/40' : 'hover:bg-slate-700/70'} transition-colors duration-150 ease-in-out`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{row.originalLineNumber}</td>
                {headers.map((header) => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                    <div className="truncate max-w-xs" title={row.data[header]}>
                        {row.data[header] !== undefined && row.data[header] !== null ? String(row.data[header]) : <span className="text-slate-500 italic">empty</span>}
                    </div>
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {row.errors && row.errors.length > 0 ? (
                    <div className="tooltip">
                      <ExclamationTriangleIcon className="w-5 h-5 text-rose-400 cursor-help" />
                      <span className="tooltiptext">
                        <strong>Row Errors:</strong><br />
                        {row.errors.join('\n')}
                      </span>
                    </div>
                  ) : (
                    <span className="text-green-400 text-xs font-semibold">OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && originalRowCount === 0 && headers.length > 0 && (
         <div className="text-center p-6 text-slate-400">
            The CSV file appears to have headers but no data rows.
        </div>
      )}
    </div>
  );
};

export default DataTable;
