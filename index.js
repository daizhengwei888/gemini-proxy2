import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.all('/v1/*', async (req, res) => {
  const url = 'https://generativelanguage.googleapis.com' + req.path;
  
  const response = await fetch(url, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GEMINI_API_KEY}`
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  });
  
  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Gemini proxy running on port ${PORT}`);
});
