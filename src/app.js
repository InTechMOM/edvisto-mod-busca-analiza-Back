const express = require('express');
const axios = require('axios')

const app = express();
const port = 5000;

//ruta para buscar video

app.get('/video/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  const apikey = 'AIzaSyCFksZYEs6nbvuaLV3ysCo1iRGOwpcpTls';

  const apiUrl = 'https://www.googleapis.com/youtube/v3/search?key=${apikey}&q=${consulta}&part=snippet'

  axios.get(apiUrl)
    .then(response => {
      const videoData = response.data.items[0];
      const title = videoData.snippet.title;
      const description = videoData.snippet.description;

      res.json({ title, description });

    })

})

app.listen(port,() =>{
  console.log('servidor escuchando el puerto ${port}')
});
