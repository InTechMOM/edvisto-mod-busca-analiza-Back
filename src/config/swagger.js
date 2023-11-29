import swaggerJSDoc from "swagger-jsdoc";


const swaggerOptions={
  definition:{
    openapi: '3.0.0',
    info:{
      title:'IntechMom MPV',
      version: '2.0.0',
    },
    
  },
  apis:['app.js',
  './src/controllers/folderPost.js',
  './src/controllers/linkPut.js'
],
}

export const openApiSpecification= swaggerJSDoc(swaggerOptions);