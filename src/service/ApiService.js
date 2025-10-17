import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiService = {
  
  getOpenGraphData: async (url, save = false) => {
    const response = await api.post(
      `Url/GetOpenGrapParameters?save=${save}`,
      { url }
    );
    return response.data;
  },

  addUrlMetaData : async (data) => {
    try {
      const response = await api.post("Url/AddUrlMetadata", data);
      return response.data;
    } catch (error) {
      console.error('Error while posting URL metadata:', error);
      throw error;
    }
  },
  



  getAllUrls: async () => {
    try {
      const response = await api.get("Url/GetAllUrlMetadata");
      return response.data;
    } catch (error) {
      console.error("Error fetching all URLs:", error);
      throw error;
    }
  },

};


export default ApiService;
