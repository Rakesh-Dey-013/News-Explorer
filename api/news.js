// api/news.js
import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, category, page = 1, pageSize = 12 } = req.query;
    const API_KEY = process.env.NEWS_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'News API key not configured' });
    }

    let url;
    if (query) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&page=${page}&sortBy=publishedAt`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}`;
      if (category && category !== 'general') {
        url += `&category=${category}`;
      }
    }

    const response = await axios.get(`${url}&apiKey=${API_KEY}`);
    
    // Return the data from NewsAPI
    res.status(200).json(response.data);
  } catch (error) {
    console.error('News API error:', error.response?.data || error.message);
    
    // Return a user-friendly error message
    if (error.response?.status === 401) {
      res.status(500).json({ error: 'Invalid API key configuration' });
    } else if (error.response?.status === 429) {
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch news data',
        details: error.response?.data?.message || error.message
      });
    }
  }
}