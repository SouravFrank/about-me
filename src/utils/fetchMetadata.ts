import axios from 'axios';

// const LINK_PREVIEW_API_KEY = 'API_KEY'; // Replace with your actual API key
const LINK_PREVIEW_API_KEY = '74f95fe9da1e3553fd85e90c91649d32'; // Replace with your actual API key


export const fetchMetadata = async (url: string) => {
  try {
    const response = await axios.get(`https://api.linkpreview.net?key=${LINK_PREVIEW_API_KEY}&q=${encodeURIComponent(url)}`);
    console.log('🚀 ~ fetchMetadata ~ response:', response.data);
    return {
      title: response.data.title || 'Unknown Title',
      thumbnail: response.data.image || 'default-thumbnail.jpg', // Fallback image
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return { title: 'Unknown Title', thumbnail: 'default-thumbnail.jpg' }; // Fallback values
  }
};
