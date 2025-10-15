import axios from 'axios';


const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ApiService = {
  getOpenGraphData: async (url) => {
    try {
      const response = await api.post('Url/GetOpenGrapParameters', { url });
      return response.data; 
    } catch (error) {
      console.error('Error fetching OG data:', error);
      throw error; 
    }
  },
  getAllUrls: async () => {
    try {
      const response = await api.get('Url/GetAllUrlMetadata');
      return response.data; 
    } catch (error) {
      console.error('Error fetching all URLs:', error);
      throw error; 
    }
  },
};

export default ApiService;
