import axios from 'axios';

const LINK_PREVIEW_API_KEY = '74f95fe9da1e3553fd85e90c91649d32'; // Replace with your actual API key

export const fetchMetadata = async (url: string) => {
  try {
    const response = await axios.get(`https://api.linkpreview.net?key=${LINK_PREVIEW_API_KEY}&q=${encodeURIComponent(url)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
};

// Helper function to fetch metadata for multiple URLs and log the results as an array
export const fetchMultipleMetadata = async (urls: string[]) => {
  const results = await Promise.all(urls.map(fetchMetadata));
  console.log('Metadata array:', results);
  return results;
};
