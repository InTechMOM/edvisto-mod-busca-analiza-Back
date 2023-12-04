import mongoose from "mongoose"; 
const Schema=mongoose.Schema;

const folderSchema=new Schema({
    
    email:{type: String, required:true},
    folderName: {type: String, required:true},
    creationDate:{type: Date, default: Date.now},
    links: { type: [String], default: [] },
    image:{type: String, required:true},
    objective:{type: String, required:true}
  }); 

  const Folder = mongoose.model('folder', folderSchema);

export default Folder;
  