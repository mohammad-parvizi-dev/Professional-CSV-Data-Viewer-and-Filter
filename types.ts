
export interface CsvRow {
  data: Record<string, string>;
  originalLineNumber: number;
  errors?: string[];
}

export interface ParsedCsvData {
  headers: string[];
  rows: CsvRow[];
  fileName: string;
  parsingErrors: string[]; // Global errors like empty file or header issues
}
