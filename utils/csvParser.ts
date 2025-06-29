
import { ParsedCsvData, CsvRow } from '../types';

// Function to unquote a CSV field and handle escaped quotes ""
const unquoteField = (field: string): string => {
  let f = field.trim();
  // Check if the field is quoted
  if (f.startsWith('"') && f.endsWith('"')) {
    // Remove the surrounding quotes
    f = f.substring(1, f.length - 1);
    // Replace escaped double quotes ("") with a single double quote (")
    f = f.replace(/""/g, '"');
  }
  return f;
};

// Regex to split a CSV line by commas, correctly handling commas within quoted fields.
// It looks for commas that are not followed by an odd number of quotes before the next comma or end of line.
const csvSplitRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

export const parseCsv = (csvString: string, fileName: string): ParsedCsvData => {
  const lines = csvString.trim().split(/\r?\n/);
  const parsingErrors: string[] = [];

  if (lines.length === 0 || lines[0].trim() === '') {
    parsingErrors.push("CSV content is empty or has no header row.");
    return { headers: [], rows: [], fileName, parsingErrors };
  }

  const headerLine = lines[0];
  // Split the header line into raw header fields using the regex
  const rawHeaders = headerLine.split(csvSplitRegex);
  // Unquote and trim each header
  const headers = rawHeaders.map(unquoteField).map(h => h.trim()).filter(h => h.length > 0);

  if (headers.length === 0) {
    parsingErrors.push("No valid headers found in the CSV. Please ensure the first line contains comma-separated headers.");
    return { headers: [], rows: [], fileName, parsingErrors };
  }
  
  // Check for duplicate headers - simple warning for now
  const headerSet = new Set<string>();
  const duplicateHeaders: string[] = [];
  headers.forEach(h => {
      if (headerSet.has(h)) {
          duplicateHeaders.push(h);
      } else {
          headerSet.add(h);
      }
  });
  if (duplicateHeaders.length > 0) {
      parsingErrors.push(`Warning: Duplicate header(s) found: ${Array.from(new Set(duplicateHeaders)).join(', ')}. This may lead to unexpected behavior in filtering or data display for these columns.`);
  }


  const rows: CsvRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue; // Skip empty lines

    // Split the data line into raw value fields using the regex
    const values = line.split(csvSplitRegex);
    const rowErrors: string[] = [];
    const data: Record<string, string> = {};

    if (values.length !== headers.length) {
      rowErrors.push(
        `Mismatched column count. Expected ${headers.length} (based on parsed headers: "${headers.join('", "')}"), but found ${values.length} values in this row.`
      );
      // Attempt to map what we can, or fill blanks, to make the row inspectable
      headers.forEach((header, index) => {
        data[header] = values[index] !== undefined ? unquoteField(values[index]) : '';
      });
    } else {
      headers.forEach((header, index) => {
        data[header] = unquoteField(values[index]);
      });
    }

    rows.push({
      data,
      originalLineNumber: i + 1, // 1-based line number
      errors: rowErrors.length > 0 ? rowErrors : undefined,
    });
  }
  
  if (rows.length === 0 && headers.length > 0 && parsingErrors.length === 0) {
      parsingErrors.push("CSV has headers but no data rows were found or parsed.");
  }

  return { headers, rows, fileName, parsingErrors };
};
