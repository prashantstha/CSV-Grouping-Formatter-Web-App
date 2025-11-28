import Papa from "papaparse";

/**
 * Parse CSV (string or File) into array of rows.
 */
export function parseCsv(file, onComplete) {
  Papa.parse(file, {
    complete: (results) => {
      // Remove empty lines and filter empty arrays
      const filtered = results.data.filter(row => row && row.length && row[0]);
      onComplete(filtered);
    },
    error: (err) => {
      onComplete([], err?.message || "CSV Parse error");
    }
  });
}

/**
 * Group by unique Column 1 (first n chars).
 * Example: First 6 chars as group heading, rest is content.
 * Adjust groupLength as needed (e.g., 6 for 'IAD150').
 */
export function groupRows(rows, groupLength = 6) {
//   const groups = {};
//   console.log('rows', rows);
//   rows.forEach(rowArr => {
//     const row = Array.isArray(rowArr) ? rowArr[0] : rowArr;
//     // console.log('row', row);
//     const grp = row.slice(0, groupLength);
//     console.log('grp', grp);
//     const rest = row.slice(groupLength);
    
//     if (!groups[grp]) groups[grp] = [];
//     groups[grp].push(rest);
//   });
 const groups = {};

  rows.forEach(row => {
    const key = row[0];              // First column (e.g. IAD150)
    const rest = row.slice(1);       // Everything except index 0

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(rest);
  });

  return groups;
}

/**
 * Export grouped structure to CSV (with headings as separate rows).
 */
export function exportGroupedCsv(groups) {
  let csvArr = [];
  Object.entries(groups).forEach(([key, vals]) => {
    csvArr.push([key]);

    vals.forEach(val => {
      if (Array.isArray(val)) {
        // If val is an array, add it as multiple columns
        csvArr.push(val);
      } else {
        // If val is a single value, add it as a single-column row
        csvArr.push([val]);
      }
    });
    // csvArr.push([key]);
  });

  return Papa.unparse(csvArr, {header: false});
}

