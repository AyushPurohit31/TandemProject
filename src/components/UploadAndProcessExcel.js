import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadAndProcessExcel = ({ setProcessedData }) => {
  const [threshold, setThreshold] = useState(5); // Default threshold in minutes

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      processData(json);
    };

    reader.readAsArrayBuffer(file);
  };

  const processData = (data) => {
    data.forEach((d) => {
      d.eventDate = new Date(parseInt(d.eventDate));
      d.eventGeneratedTime = new Date(parseInt(d.eventGeneratedTime));
    });

    const stoppages = [];
    let startStoppage = null;

    data.forEach((d, i) => {
      if (d.speed === 0) {
        if (!startStoppage) startStoppage = d;
      } else {
        if (startStoppage) {
          const duration = (d.eventGeneratedTime - startStoppage.eventGeneratedTime) / (1000 * 60); 
          if (duration >= threshold) {
            stoppages.push({
              start: startStoppage,
              end: d,
              duration
            });
          }
          startStoppage = null;
        }
      }
    });

    console.log("Processed Stoppages:", stoppages);
    setProcessedData(stoppages);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <input
        type="number"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        placeholder="Stoppage Threshold (minutes)"
      />
    </div>
  );
};

export default UploadAndProcessExcel;
