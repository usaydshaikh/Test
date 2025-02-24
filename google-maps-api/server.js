require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS to allow frontend access

// ✅ Add a homepage route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
    res.send('🔹 Welcome to the Secure Google Maps API Proxy!');
});

// Secure Google Maps API Proxy
app.get('/api/maps', async (req, res) => {
    try {
        const { query } = req;
        const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&${new URLSearchParams(query)}`;

        const response = await axios.get(googleMapsURL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Google Maps data' });
    }
});

app.listen(PORT, () => console.log(`🔒 Secure API running on http://localhost:${PORT}`));
