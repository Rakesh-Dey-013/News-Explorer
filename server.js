// server.js - Simple Express server for local development
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// News API endpoint
app.get('/api/news', async (req, res) => {
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
    res.json(response.data);
  } catch (error) {
    console.error('News API error:', error.response?.data || error.message);
    
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
});

app.listen(PORT, () => {
  console.log(`Development server running on http://localhost:${PORT}`);
  console.log(`API endpoint available at http://localhost:${PORT}/api/news`);
});