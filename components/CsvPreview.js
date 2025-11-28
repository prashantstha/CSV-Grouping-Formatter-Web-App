import React from "react";

export default function CsvPreview({ groups, onExport }) {
    if (!groups || !Object.keys(groups).length) return null;
    return (
        <div>
            <h3>Preview</h3>
            <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8, background: "#fafafa" }}>
                {Object.entries(groups).map(([group, items]) => {
                    
                    return (
                    <div key={group} style={{ marginBottom: 16 }}>
                        <strong>{group}</strong>
                        <ul>
                            {items.map((item, idx) => {
                                console.log('items', item);
                                return (
                                    <li key={idx} style={{ marginLeft: 14, listStyle: "disc" }}>
                                        {item.join(" | ")}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )})}
            </div>
            <button onClick={onExport} style={{ marginTop: 10 }}>Export as CSV</button>
        </div>
    );
}
