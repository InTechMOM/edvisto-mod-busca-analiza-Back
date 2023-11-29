import Folder from '../models/createFolder.js';

const createFol=async(request,response,next)=>{
    try {
      const { email, folderName, imageUrl, objective } = request.body;
  
      // Verificar si ya existe una carpeta con el mismo nombre para el usuario
      const existingFolder = await Folder.findOne({ email, folderName });
  
      if (existingFolder) {
        return response.status(400).json({ error: 'Ya existe una carpeta con el mismo nombre para este usuario' });
      }
  
      // Crear la nueva carpeta y guardarla en la base de datos
      const newFolder = new Folder({ email, folderName, image: imageUrl, objective });
      await newFolder.save();
      response.status(201).json({
        message:'Carpeta creada correctamente',
        data:newFolder
      });
  
      //response.status(201).json({ message: 'Carpeta creada correctamente' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error al crear la carpeta' });
    }
};





  export default createFol;