
import axios from 'axios';
import { newsApiKey } from './ApiKey';

const apiBaseUrl = "https://newsapi.org/v2";

export const fetchNews = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/top-headlines`, {
      params: {
        country: 'us',
        apiKey: newsApiKey,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
