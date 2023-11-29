import axios from 'axios';
import cheerio from 'cheerio';

export async function searchGoogleAcademic(request, response) {
    try {
      const query = request.query.q;
      const language='es';
      const googleScholarUrl = `https://scholar.google.com/scholar?hl=${language}&q=${encodeURIComponent(query)}`;
  
      // Realiza una solicitud HTTP a Google Académico
      const responses = await axios.get(googleScholarUrl);
  
       // Utiliza Cheerio para analizar el HTML de la página
      const $ = cheerio.load(responses.data);
      

    // Encuentra y extrae los resultados de búsqueda
      const results = [];
      $('.gs_r').each((index, element) => {
        const title = $(element).find('h3').text();
        const link = $(element).find('.gs_or a').attr('href');
        const snippet = $(element).find('.gs_rs').text();

        
        // Verifica si tanto el título como el snippet no están vacíos antes de agregarlos
      if (title && snippet) {
        results.push({
          title,
          link,
          snippet,
        });
      }
      });

    // Devuelve los resultados de búsqueda como respuesta JSON
      response.status(200).json({ results });

    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error en la consulta a Google Académico' });
    }
  }

  