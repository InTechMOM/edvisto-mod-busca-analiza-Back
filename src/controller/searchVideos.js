
import axios from 'axios';
import  {apiKey}  from "../config/index.js";

// Youtube ID channels
const channelIds = ['UCGQO3uUEXBLwDjNSlWFVMVQ', 'UCnmlG_YzRYzWzJbW2oDn_ow'];

export async function searchVideos(request, response) {

  try {
  
    // Término de búsqueda
    const searchQuery = request.query.q;
    // Número máximo de resultados a devolver
    const maxResults = 6;
    const searchResults = [];

    // Itera a través de los IDs de los canales y realiza una solicitud para cada uno
    for (const channelId of channelIds) {
      const resp = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&q=${encodeURIComponent(searchQuery)}&part=snippet,id&order=date&maxResults=${maxResults}`
      );

      // Extrae la información relevante de los videos
      const videos = resp.data.items.map((item) => {
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          videoId: item.id.videoId,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        };
      });

      // Agrega los resultados de búsqueda de cada canal a la lista de resultados
      searchResults.push({
        channelId,
        videos,
      });
    }

    response.json(searchResults);


/*
    // Realiza una solicitud a la API de YouTube para buscar videos en el canal seleccionado
    const resp = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&q=${searchQuery}&part=snippet,id&order=date&maxResults=${maxResults}`
    );

    // Extrae la información relevante de los videos
    const videos = resp.data.items.map((item) => {
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
        videoId: item.id.videoId,
        videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      };
    });

    response.json(videos);*/
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Hubo un error al obtener los videos.' });
  }
    
};

