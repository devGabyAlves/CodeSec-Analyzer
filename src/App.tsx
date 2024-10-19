import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import { checkVulnerabilities } from './api/vulnerabilityCheck';
import hackerImage from './assets/hacker.png';

const App: React.FC = () => {
  const [vulnerabilities, setVulnerabilities] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const result = await checkVulnerabilities(file);
      setVulnerabilities(result);
    } catch (error) {
      setVulnerabilities('Error: Unable to analyze the file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Vulnerability Scanner</h1>

      <img src={hackerImage} alt="Hacker illustration" className="header-image" />

      <p>Upload a file to analyze potential security vulnerabilities</p>
      <FileUpload onFileUpload={handleFileUpload} />
      {loading && <p>Analyzing file...</p>}
      {vulnerabilities && (
        <div className="results">
          <h3>Analysis Result:</h3>
          <pre>{vulnerabilities}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
