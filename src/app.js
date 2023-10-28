const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000; 

// Middleware para servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')))

// las rutas  YouTube
const youtubeRoutes = require('./routes/youtube');

// Middleware 
app.use(express.json());

//rutas importadas
app.use('/youtube', youtubeRoutes);

// Manejo y configuraciones de otras rutas del servidor

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});