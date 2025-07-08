
import React, { useState, useEffect, useCallback } from 'react';
import { ParsedCsvData, CsvRow } from './types';
import { parseCsv } from './utils/csvParser';
import FileUpload from './components/FileUpload';
import FilterControls from './components/FilterControls';
import DataTable from './components/DataTable';
import { BarChartIcon } from './components/icons'; // Placeholder for future chart feature

const PROJECT_VERSION = '1.4.7'; // Project version number
const App: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParsedCsvData | null>(null);
  const [filteredRows, setFilteredRows] = useState<CsvRow[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileParsed = useCallback((csvString: string, fileName: string) => {
    setIsLoading(true);
    setError(null);
    setParsedData(null); // Clear previous data
    setFilters({}); // Reset filters
    try {
      // Simulate parsing delay for UX
      setTimeout(() => {
        const result = parseCsv(csvString, fileName);
        setParsedData(result);
        if (result.parsingErrors.length > 0) {
          setError(`Issues found while parsing ${fileName}: ${result.parsingErrors.join('; ')}`);
        }
        setIsLoading(false);
      }, 500);
    } catch (e) {
      setError(`Failed to process CSV file: ${e instanceof Error ? e.message : String(e)}`);
      setParsedData(null);
      setIsLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback((header: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [header]: value,
    }));
  }, []);

  useEffect(() => {
    if (!parsedData) {
      setFilteredRows([]);
      return;
    }

    let newFilteredRows = parsedData.rows;
    const activeFilters = Object.entries(filters).filter(([, value]) => value.trim() !== '');

    if (activeFilters.length > 0) {
      newFilteredRows = newFilteredRows.filter(row => {
        // Check for row-level parsing errors; skip filtering if row itself is majorly flawed for data access
        if (row.errors && row.errors.some(err => err.toLowerCase().includes("mismatched column count"))) {
           // Optionally include errored rows if a specific "show errors" filter is added later
           // For now, rows with mismatched columns might not filter correctly if headers don't align.
           // However, we still want to show them. So, filter on available data.
        }
        
        return activeFilters.every(([headerKey, filterValue]) => {
          const cellValue = row.data[headerKey];
          // Ensure cellValue is a string before calling toLowerCase. Handle undefined or null.
          return cellValue !== undefined && cellValue !== null &&
                 String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
        });
      });
    }
    setFilteredRows(newFilteredRows);
  }, [parsedData, filters]);

  const clearAll = () => {
    setParsedData(null);
    setFilteredRows([]);
    setFilters({});
    setError(null);
    setIsLoading(false);
    // Reset file input if possible (requires more direct DOM manipulation or key prop change on FileUpload)
    // For simplicity, users can just upload a new file.
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-gray-200 p-4 md:p-8 antialiased">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <BarChartIcon className="w-10 h-10 text-sky-400" />
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
            Professional CSV Viewer
          </h1>
        </div>
        <p className="text-slate-400 text-lg">Upload, analyze, and filter your CSV data with ease.</p>
      </header>

      <main className="max-w-7xl mx-auto bg-slate-800 shadow-2xl rounded-lg p-6 md:p-8">
        <FileUpload onFileParsed={handleFileParsed} isLoading={isLoading} onClear={clearAll} hasData={!!parsedData} />

        {isLoading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto"></div>
            <p className="mt-4 text-lg text-slate-300">Processing CSV data...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-700/50 border border-red-500 text-red-200 px-4 py-3 rounded-md relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {parsedData && !isLoading && (
          <>
            {parsedData.parsingErrors.length > 0 && parsedData.rows.length === 0 && (
              <div className="bg-yellow-700/50 border border-yellow-500 text-yellow-200 px-4 py-3 rounded-md relative mb-6" role="alert">
                <strong className="font-bold">Parsing Note: </strong>
                <span className="block sm:inline">
                  {parsedData.fileName} was processed, but major issues prevent data display: {parsedData.parsingErrors.join('; ')}
                </span>
              </div>
            )}

            {parsedData.headers.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-slate-100">Filter Data ({parsedData.fileName})</h2>
                <FilterControls
                  headers={parsedData.headers}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            )}
            
            <div className="mt-8">
                 <DataTable headers={parsedData.headers} rows={filteredRows} originalRowCount={parsedData.rows.length} />
            </div>
          </>
        )}

        {!parsedData && !isLoading && !error && (
            <div className="text-center py-12">
                <BarChartIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <p className="text-xl text-slate-400">Upload a CSV file to get started.</p>
            </div>
        )}
      </main>
      <footer className="text-center mt-12 py-4 text-slate-500">
<p>&copy; {new Date().getFullYear()} CSV Viewer Pro v{PROJECT_VERSION}. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
