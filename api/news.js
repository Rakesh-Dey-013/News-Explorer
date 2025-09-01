// api/news.js
import axios from "axios";

export default async function handler(req, res) {
  const { query = "", category = "general", page = 1, pageSize = 12 } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "News API key not configured" });
  }

  try {
    let url;

    if (query) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&page=${page}&sortBy=publishedAt`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}`;
      if (category && category !== "general") {
        url += `&category=${category}`;
      }
    }

    const response = await axios.get(url, {
      headers: { "X-Api-Key": API_KEY },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("News API error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
