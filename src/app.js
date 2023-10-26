const express = require('express');
const { google } = require('googleapis'); // Asegúrate de importar "googleapis" correctamente
const app = express();
const PORT = process.env.PORT || 3000;

// Configura la API de YouTube
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyCFksZYEs6nbvuaLV3ysCo1iRGOwpcpTls' // Reemplaza con tu clave de API
});

// Ruta para realizar búsquedas en YouTube
app.get('/search', async (req, res) => {
  try {
    const resultado = await youtube.search.list({
      part: 'snippet',
      q: req.query.q, // La consulta de búsqueda
      maxResults: 10 // Número máximo de resultados
    });

    res.json(resultado.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la búsqueda de videos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});