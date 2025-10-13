

import './App.css';
import { useState } from 'react';
import ApiService from './service/ApiService';

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const isValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch {
      return false;
    }
  };

  // Function to fetch OG data
  const fetchOGData = async (inputUrl) => {
    setError("");
    setResult(null);

    if (!isValidUrl(inputUrl)) {
      setError("Please paste a valid URL");
      return;
    }

    setLoading(true);
    try {
      const data = await ApiService.getOpenGraphData(inputUrl);
      setResult(data);
    } catch (err) {
      console.error("Error fetching OG data:", err);
      setError("Unable to fetch Open Graph data from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h3 className="app-heading">Paste your link</h3>

      <input
        type="url"
        value={url}
        placeholder="https://example.com"
        onChange={(e) => setUrl(e.target.value)}

        onBlurCapture={()=>fetchOGData(url)}
        onBlur={() => fetchOGData(url)}  
        onPaste={(e) => {
          const pastedValue = e.clipboardData.getData("text");
          setUrl(pastedValue);
          setTimeout(() => fetchOGData(pastedValue), 0); 
        }}
        className="url-input"
      />

      {loading && <div className="loading-message">Loading...</div>}

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="result-card">
          <strong className="result-title">Title:</strong> {result.title || "(no title)"}
          
          {result.image ? (
            <img
              src={result.image}
              alt="OG Preview"
              className="result-image"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <p>No image found</p>
          )}
          
          <p className="result-description">
            <strong>Description:</strong> {result.description || "(no description)"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

