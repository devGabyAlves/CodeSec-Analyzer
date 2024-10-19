import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const allowedExtensions = ['.py', '.js', '.java', '.go', '.ts', '.cpp', '.c', '.rb', '.php'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension && allowedExtensions.includes(`.${fileExtension}`)) {
        setSelectedFile(file);
        setErrorMessage(null);
      } else {
        setSelectedFile(null);
        setErrorMessage('File type not supported. Please upload a valid code file.');
      }
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div className="file-upload">
      <label htmlFor="fileInput" className="custom-file-upload">
        <FontAwesomeIcon icon={faUpload} style={{ marginRight: '8px' }} />
        Choose File
      </label>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }} 
      />
      {selectedFile ? <p>{selectedFile.name}</p> : <p>No file chosen</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleUploadClick} disabled={!selectedFile}>
        Upload and Scan
      </button>
    </div>
  );
};

export default FileUpload;
