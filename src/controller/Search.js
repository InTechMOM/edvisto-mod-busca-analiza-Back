import axios from 'axios';
import cheerio from 'cheerio';

export async function Search(req, res) {
    try {
      const query = req.query.q;
      const videoUrl = `https://www.googleapis.com/youtube/v3${query}`;
  
      // Realiza una solicitud HTTP a Google Académico
      const response = await axios.get(videoUrl);
  
       // Utiliza Cheerio para analizar el HTML de la página
      const $ = cheerio.load(res.data);
      

    // Encuentra y extrae los resultados de búsqueda
      const results = [];
      $('.gs_r').each((index, element) => {
        const title = $(element).find('h3').text();
        const link = $(element).find('.gs_or a').attr('href');
        const snippet = $(element).find('.gs_rs').text();

        results.push({
          title,
          link,
          snippet,
        });
      });

    // Devuelve los resultados de búsqueda como respuesta JSON
      response.status(200).json({ results });

    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error en la consulta de video' });
    }
  }

  