import Folder from '../models/createFolder.js';

const addLinkToFolder = async (request, response) => {
    try {
        const { email, folderName, link } = request.body;
        const folder = await Folder.findOne({ email, folderName });

        if (!folder) {
          return response.status(404).json({ error: 'No se encontró la carpeta especificada para este usuario' });
        }
    
        // Validar que el usuario (correo) esté relacionado con la carpeta
        if (!folder.email || folder.email !== email) {
          return response.status(403).json({ error: 'El usuario no está autorizado para modificar esta carpeta' });
        }
    
        // Agregar los links a la carpeta y guardarla en la base de datos
        folder.links.push(link);
        await folder.save();
        
  
      response.status(200).json({ message: 'Link agregado correctamente a la carpeta', data:folder });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error al agregar el link a la carpeta' });
    }
  };

  export default addLinkToFolder;