const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para buscar videos en YouTube
router.get('/buscar/:consulta', (req, res) => {
  const consulta = req.params.consulta;
  const apiKey = 'AIzaSyCFksZYEs6nbvuaLV3ysCo1iRGOwpcpTls';

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${consulta}&part=snippet`;

  axios.get(apiUrl)
    .then(response => {
      const resultados = response.data.items.map(item => ({
        titulo: item.snippet.title,
        miniatura: item.snippet.thumbnails.default.url,
        enlace: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));

      res.json(resultados);
    })
    .catch(error => {
      console.error('Error al conectar con la API de YouTube:', error);
      res.status(500).json({ error: 'Error al realizar la búsqueda' });
    });
});


module.exports = router;