// import './App.css';
// import { useState, useEffect } from 'react';
// import ApiService from './service/ApiService';
// import UrlList from './components/url-list/UrlList';
// import UrlInput from './components/url-input/UrlInput';

// function App() {
//   const [urls, setUrls] = useState("");
//   const [loadingList, setLoadingList] = useState(false);
 

//   // Function to refresh URL list from backend
  
//   const fetchUrls = async () => {
//     setLoadingList(true);
//     try {
//       const data = await ApiService.getAllUrls();
//       setUrls(data);
//     } catch (err) {
//       console.error("Error fetching URL list:", err);
//     } finally {
//       setLoadingList(false);
//     }
//   };

//   useEffect(() => {
//     fetchUrls();
//   }, []);


//   return (
//     <div className="app-layout">
      
//       <div className="left-panel">
//         <UrlInput onSuccess={fetchUrls} />
//       </div>

//       <div className="right-panel">
//         <h3 className="list-heading">Saved URLs</h3>
//         {loadingList ? <p>Loading...</p> : <UrlList urls={urls} />}
//       </div>
//     </div>
//   );
// }

// export default App;





import './App.css';
import { useState, useEffect } from 'react';
import ApiService from './service/ApiService';
import UrlList from './components/url-list/UrlList';
import UrlInput from './components/url-input/UrlInput';

function App() {
  const [urls, setUrls] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

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

  return (
    <div className="app-layout">
      <div className="left-panel">
        <UrlInput />
      </div>

      <div className="right-panel">
        <h3 className="list-heading">Saved URLs</h3>
        {loadingList ? <p>Loading...</p> : <UrlList urls={urls} />}
      </div>
    </div>
  );
}

export default App;
