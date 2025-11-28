import React, { useState } from "react";
import CsvUploader from "../components/CsvUploader";
import CsvPreview from "../components/CsvPreview";
import { parseCsv, groupRows, exportGroupedCsv } from "../utils/csvUtils";

export default function HomePage() {
  const [groups, setGroups] = useState({});
  const [error, setError] = useState("");

  // Handles CSV upload and parsing
  const handleFile = (file) => {
    setError("");
    parseCsv(file, (rows, err) => {
      if (err) {
        setError("Invalid CSV file!");
        return;
      }
      if (!rows.length) {
        setError("The file is empty or invalid.");
        setGroups({});
        return;
      }
      // Group by first 6 chars, can be adjusted if needed
      const grouped = groupRows(rows, 6);
      setGroups(grouped);
    });
  };


  const handleExport = () => {
    const csvStr = exportGroupedCsv(groups);
    const blob = new Blob([csvStr], {type: "text/csv"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "grouped_output.csv";
    link.click();
  };

  return (
    <main style={{maxWidth: 640, margin: "30px auto", fontFamily: "sans-serif"}}>
      <h1>CSV Grouper & Exporter</h1>
      <CsvUploader onFile={handleFile} />
      {error && <div style={{color: "red", margin: "10px 0"}}>{error}</div>}
      <CsvPreview groups={groups} onExport={handleExport} />
      <div style={{marginTop: 40, color: "#666", fontSize: 14}}>
        Upload a CSV where each row starts with a group code in the first 6 characters.<br/>
        Example input: <br/>
        <span style={{fontSize:12, color: "#444"}}>IAD15001-01-034-3511/26/2025iad1-150-es-e1-b33CopperFiber1</span>
      </div>
    </main>
  );
}
