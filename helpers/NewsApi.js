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

    const newsData = response.data.articles;
    const categorizedNewsData = newsData.map(item => ({
      ...item,
      category: getCategory(item), 
    }));

    console.log('Categorized News Data:', categorizedNewsData); 

    return categorizedNewsData;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const getCategory = (item) => {
  const { title, description } = item;
  
  if (title.toLowerCase().includes('health') || (description && description.toLowerCase().includes('health'))) {
    return 'Health';
  }
  if (title.toLowerCase().includes('business') || (description && description.toLowerCase().includes('business'))) {
    return 'Business';
  }
  if (title.toLowerCase().includes('entertainment') || (description && description.toLowerCase().includes('entertainment'))) {
    return 'Entertainment';
  }
  if (title.toLowerCase().includes('science') || (description && description.toLowerCase().includes('science'))) {
    return 'Science';
  }
  if (title.toLowerCase().includes('sports') || (description && description.toLowerCase().includes('sports'))) {
    return 'Sports';
  }
  if (title.toLowerCase().includes('technology') || (description && description.toLowerCase().includes('technology'))) {
    return 'Technology';
  }

  return 'General';
};
