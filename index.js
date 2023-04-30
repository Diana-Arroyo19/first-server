import http from "http";
import path from "path";
import { promises as fs } from 'fs';

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer(async (req, res) => {
  // Desestructurando de "req"
  let { url, method } = req;

  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);

  // Enrutando peticiones
  switch (url) {
    case '/':
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(`
      <html>
        <head>
        <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
          <title>My App</title>
        </head>
        <body> 
          <h1 style="color: #333">Hello from my server</h1>
          <p style="color: #34495E">Estas en el recurso raiz.</p>
        </body>
      </html>
      `);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 200;
      // Cerrando la comunicacion
      res.end();
      break;

      // PARTE DEL AUTOR
    case '/author':
      res.setHeader('Content-Type', 'text/html');
      
      res.write(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
    <title>My App Author</title>
</head>
<body style="text-align: center;">
    <font face="Monospace">
    <h1 style="color: #333;">&#127775; -AUTHOR- &#127775;</h1>
    <p style="color: #5DADE2;">-DIANA ARROYO RODRIGUEZ-</p>
    <p style="color: #5DADE2;">ESTUDIANTE DE INGENIERIA EN TICS</p> 
    <p style="color: #2471A3">&#129514 Actividad: Enrutado </p>
    </font>
    <img width="300px" src="/workspaces/first-server/writer.png" alt="Foto Diana Arroyo">
</body>
</html>
      `);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      res.statusCode = 200;
      res.end();
      break;

      // PARTE DEL FAVICON
    case "/favicon.ico":
      const faviconPath = path.join(__dirname, 'program.ico');
        const data = await fs.readFile(faviconPath);
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end(data);
      break

      //MENSAJE
      case "/message":
      // Verificando si es post
      if (method === "POST") {
        // Procesa el formulario
        res.statusCode = 200;
        res.write("🎉 Endpoint Funcionando!!! 🎉");
      } else {
        res.statusCode = 404;
        res.write("404: Endpoint no encontrado")
      }
			res.end();
      break;

    default:
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(`
      <html>
        <head>
        <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
          <title>My App</title>
        </head>
        <body> 
          <h1>&#128534; 404 Recurso no encontrado</h1>
          <p>Lo sentimos pero no tenemos lo que buscas...</p>
        </body>
      </html>
      `);
      console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 404;
      // Cerrando la comunicacion
      res.end();
      break;
  }
}); 

server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://localhost:3000"); 
});