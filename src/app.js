import express, { request, response }  from 'express';
import { port } from "./config/index.js";
import  router  from './routes/index.js';
import mongoose from "mongoose"; 
import bodyParser from 'body-parser';
import  { mongo_uri } from './config/index.js';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { openApiSpecification } from './config/swagger.js';


//Conexion Mongoose
mongoose.connect(mongo_uri);
const database=mongoose.connection;

database.on('error',(error=>{
  console.log(error);
}))

database.once('connected',()=>{
  console.log('Database Connected');
})

const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('tiny'));


//Route get query 
app.use('/search',router);
app.use('/videos',router);
app.use('/create',router);
app.use('/add',router);
app.use('/folder',router);
app.use(cors());
app.use(cors({ origin: 'http://127.0.0.1:5501', credentials: true, }));

//Ruta documentacion
app.use('/docs',swaggerUi.serve);
app.get('/docs', swaggerUi.setup(openApiSpecification));

//config server
app.listen(port, (error)=> {
    if (error) {
     console.log('Server error: Failed') 
     process.exit(1);
    }
    console.log(`Server listening in port ${port}`)
  
  })