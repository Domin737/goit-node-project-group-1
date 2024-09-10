// proxy.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Proxy middleware do przekierowywania żądań API do backendu na porcie 5000
app.use(
  '/api',
  createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true })
);

// Serwowanie plików statycznych z Parcel (frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// Obsługa wszystkich innych tras
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Uruchomienie serwera proxy na porcie 1234
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Proxy server działa na porcie ${PORT}`);
});
