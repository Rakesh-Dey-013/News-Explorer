const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// NewsAPI configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE = 'https://newsapi.org/v2';

// Helper function to handle API calls
async function fetchFromNewsAPI(endpoint, params) {
    try {
        const response = await axios.get(`${NEWS_API_BASE}${endpoint}`, {
            params: {
                ...params,
                apiKey: NEWS_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('News API Error:', error.message);
        throw error;
    }
}

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'News API Backend is running' });
});

// Get top headlines
app.get('/api/news/top-headlines', async (req, res) => {
    try {
        const { category = 'general', page = 1, pageSize = 12 } = req.query;

        const data = await fetchFromNewsAPI('/top-headlines', {
            country: 'us',
            category: category !== 'general' ? category : undefined,
            pageSize,
            page
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch news',
            details: error.response?.data?.message || error.message
        });
    }
});

// Search news
app.get('/api/news/search', async (req, res) => {
    try {
        const { q, page = 1, pageSize = 12 } = req.query;

        if (!q) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const data = await fetchFromNewsAPI('/everything', {
            q,
            pageSize,
            page,
            sortBy: 'publishedAt',
            language: 'en'
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to search news',
            details: error.response?.data?.message || error.message
        });
    }
});

// Get all categories
app.get('/api/categories', (req, res) => {
    const categories = [
        { value: 'general', label: 'General' },
        { value: 'business', label: 'Business' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'health', label: 'Health' },
        { value: 'science', label: 'Science' },
        { value: 'sports', label: 'Sports' },
        { value: 'technology', label: 'Technology' }
    ];
    res.json(categories);
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`News API endpoint: http://localhost:${PORT}/api/news/top-headlines`);
});