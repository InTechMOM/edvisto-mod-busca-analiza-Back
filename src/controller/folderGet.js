import Folder from '../models/createFolder.js';

const getFolders = async (request, response) => {
    try {
      const { email } = request.query;
  
      if (!email) {
        return response.status(400).json({ error: 'Se requiere el parámetro de correo electrónico' });
      }
  
      const folders = await Folder.find({ email });
  
      response.status(200).json({ folders });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error al obtener las carpetas' });
    }
  };
  
  export default getFolders;