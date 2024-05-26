import React, { useState } from 'react';
import UploadAndProcessExcel from './components/UploadAndProcessExcel';
import MapVisualization from './components/MapVisualization';

function App() {
  const [processedData, setProcessedData] = useState([]);

  return (
    <div className="App">
      <h1>Vehicle Stoppage Identification and Visualization</h1>
      <UploadAndProcessExcel setProcessedData={setProcessedData} />
      {processedData.length > 0 && <MapVisualization data={processedData} />}
    </div>
  );
}

export default App;
