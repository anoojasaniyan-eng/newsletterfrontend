import './App.css';
import { useState, useEffect } from 'react';
import ApiService from './service/ApiService';
import UrlList from './components/url-list/UrlList';
import UrlInput from './components/url-input/UrlInput';

function App() {
  const [urls, setUrls] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  //const [loading, setLoading] = useState(false);
  //const [result, setResult] = useState(null);
  //const [error, setError] = useState("");

  // const isValidUrl = (s) => {
  //   try {
  //     new URL(s);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // };

  // // Function to fetch OG data
  // const fetchOGData = async (inputUrl) => {
  //   setError("");
  //   setResult(null);

  //   if (!isValidUrl(inputUrl)) {
  //     setError("Please paste a valid URL");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const data = await ApiService.getOpenGraphData(inputUrl);
  //     setResult(data);
  //   } catch (err) {
  //     console.error("Error fetching OG data:", err);
  //     setError("Unable to fetch Open Graph data from backend.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Function to refresh URL list from backend
  const fetchUrls = async () => {
    setLoadingList(true);
    try {
      const data = await ApiService.getAllUrls();
      setUrls(data);
    } catch (err) {
      console.error("Error fetching URL list:", err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // return (
  //   <div className="app-container">
  //     <h3 className="app-heading">Paste your link</h3>

  //     <input
  //       type="url"
  //       value={url}
  //       placeholder="https://example.com"
  //       onChange={(e) => setUrl(e.target.value)} 
  //       onPaste={(e) => {
  //         e.preventDefault();
  //         const pastedValue = e.clipboardData.getData("text");
  //         setUrl(pastedValue);
  //         fetchOGData(pastedValue);
  //         setTimeout(() => fetchOGData(pastedValue), 0); 
  //       }}
  //       className="url-input"
  //     />

  //     {loading && <div className="loading-message">Loading...</div>}

  //     {error && <div className="error-message">{error}</div>}

  //     {result && (
  //       <div className="result-card">
  //         <strong className="result-title">Title:</strong> {result.title || "(no title)"}
          
  //         {result.image ? (
  //           <img
  //             src={result.image}
  //             alt="OG Preview"
  //             className="result-image"
  //             onError={(e) => (e.currentTarget.style.display = "none")}
  //           />
  //         ) : (
  //           <p>No image found</p>
  //         )}
          
  //         <p className="result-description">
  //           <strong>Description:</strong> {result.description || "(no description)"}
  //         </p>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="app-layout">
      {/* Left Panel */}
      <div className="left-panel">
        <UrlInput onSuccess={fetchUrls} />
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <h3 className="list-heading">Saved URLs</h3>
        {loadingList ? <p>Loading...</p> : <UrlList urls={urls} />}
      </div>
    </div>
  );
}

export default App;