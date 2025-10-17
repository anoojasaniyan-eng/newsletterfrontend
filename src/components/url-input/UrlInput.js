import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import "./UrlInput.css";

const UrlInput = ({ onSaveSuccess }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  
  const isValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch {
      return false;
    }
  };

 
  const fetchOGData = async (inputUrl, save = false) => {
    setError("");
    setResult(null);

    if (!isValidUrl(inputUrl)) {
      setError("Please paste a valid URL");
      return;
    }
    setInputUrl(inputUrl);

    setLoading(true);
    try {
      const data = await ApiService.getOpenGraphData(inputUrl, save);
      setResult(data);
    } catch (err) {
      console.error("Error fetching OG data:", err);
      setError("Unable to fetch Open Graph data from backend.");
    } finally {
      setLoading(false);
    }
  };

 
 const handleSave = async () => {
  if (!result) return;

  const addUrlRequestData = {
    title: result.title,
    url: inputUrl,
    description: result.description,
    image: result.image,
  };

  try {
    const isUrlAdded = await ApiService.addUrlMetaData(addUrlRequestData);
    if (isUrlAdded && isUrlAdded.success) {
      alert("URL saved successfully!");
      if (onSaveSuccess) onSaveSuccess(result);
      setUrl("");
      setResult(null);
    } else {
      alert("Failed to save the URL. Please check your backend response.");
    }
  } catch (err) {
    console.error("Error saving URL:", err);
    setError("Failed to save URL to database.");
  }
};

  
  const handleCancel = () => {
    setUrl("");
    setResult(null);
    setError("");

  };

  return (
    <div className="url-input-container">
      <h3 className="app-heading">Paste a link to preview its details</h3>
      <p className="app-subtext">Preview the link before saving it.</p>

      <input 
        type="url"
        value={url}
        placeholder="https://example.com"
        onChange={(e) => setUrl(e.target.value)}
        onPaste={(e) => {
          e.preventDefault();
          const pastedValue = e.clipboardData.getData("text");
          setUrl(pastedValue);
          fetchOGData(pastedValue); 
        }}
        className="url-input"
      />

      {loading && <div className="loading-message">Loading preview...</div>}
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

          <div className="action-buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default UrlInput;
