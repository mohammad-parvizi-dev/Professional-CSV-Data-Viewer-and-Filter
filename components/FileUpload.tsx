
import React, { useRef } from 'react';
import { UploadIcon, TrashIcon } from './icons';

interface FileUploadProps {
  onFileParsed: (content: string, fileName: string) => void;
  isLoading: boolean;
  onClear: () => void;
  hasData: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileParsed, isLoading, onClear, hasData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileParsed(text, file.name);
      };
      reader.readAsText(file);
    }
    // Reset file input to allow re-uploading the same file
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6 p-6 bg-slate-700/50 rounded-lg shadow-md border border-slate-600">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          disabled={isLoading}
        />
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          className={`
            flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm 
            text-base font-medium text-white 
            bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500
            disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out
            w-full sm:w-auto
          `}
        >
          <UploadIcon className="w-5 h-5 mr-2" />
          {isLoading ? 'Processing...' : (hasData ? 'Upload New CSV' : 'Upload CSV File')}
        </button>
        {hasData && !isLoading && (
            <button
            onClick={onClear}
            className={`
                flex items-center justify-center px-6 py-3 border border-rose-500 rounded-md shadow-sm 
                text-base font-medium text-rose-100 
                hover:bg-rose-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-rose-500
                disabled:opacity-50 w-full sm:w-auto transition-colors duration-150 ease-in-out
            `}
            >
                <TrashIcon className="w-5 h-5 mr-2" />
                Clear Data
            </button>
        )}
      </div>
       <p className="mt-3 text-sm text-slate-400">
        Select a .csv file from your computer. Data processing is done locally in your browser.
      </p>
    </div>
  );
};

export default FileUpload;
