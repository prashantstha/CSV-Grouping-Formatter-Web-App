import React from "react";

export default function CsvUploader({ onFile }) {
  return (
    <div>
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </div>
  );
}
