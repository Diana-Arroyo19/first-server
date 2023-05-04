import http from "http";
import path from "path";
import { promises as fs } from 'fs';

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer(async (req, res) => {
  // Desestructurando de "req"
  let { url, method } = req;

  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);

  // Enrutando peticiones
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
          <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
          <title>My App</title>
          <style>
            body {
              background: rgb(142,70,235);
background: linear-gradient(0deg, rgba(142,70,235,1) 20%, rgba(131,83,233,0.46186396922050066) 100%);
              font-family: Arial, sans-serif;
            }
            h1, h2 {
              color: #000000;
              text-align: center;
              margin-top: 50px;
            }
            form {
              margin-top: 30px;
              text-align: center;
            }
            input[type="text"] {
              width: 300px;
              padding: 10px;
              border: none;
              border-radius: 5px;
              box-shadow: 0px 0px 5px #000000;
              outline: none;
            }
            button[type="submit"] {
              background-color: #000000;
              color: #fff;
              border: none;
              border-radius: 5px;
              padding: 10px 20px;
              cursor: pointer;
              box-shadow: 0px 0px 5px #000000;
              outline: none;
            }
            button[type="submit"]:hover {
              background-color: #2980B9;
            }
          </style>
        </head>
        <body> 
          <h1>Hello from my server</h1>
          <h2>Ingresa un mensaje</h2>
          <div>
            <form action="/message" method="POST">
              <input type="text" name="message">
              <button type="submit">Send</button>
            </form>
          </div>
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
    <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
    <title>My App Author</title>
</head>
<body style="text-align: center;">
    <font face="Monospace">
    <h1 style="color: #333;">&#127775; -AUTHOR- &#127775;</h1>
    <p style="color: #5DADE2;">-DIANA ARROYO RODRIGUEZ-</p>
    <p style="color: #5DADE2;">ESTUDIANTE DE INGENIERIA EN TICS</p> 
    <p style="color: #2471A3">&#129514 Actividad: Enrutado </p>
    </font>
    <img width="300px" src="writer.png" alt="Foto Diana Arroyo">
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
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end(data);
      break

    //MENSAJE
    case "/message":
      // Verificando si es post
      if (method === "POST") {
        // Se crea una variable para almacenar los
        // Datos entrantes del cliente
        let body = "";
        // Se registra un manejador de eventos
        // Para la recepción de datos
        req.on("data", (data => {
          body += data;
          if (body.length > 1e6) return req.socket.destroy();
        }));
        // Se registra una manejador de eventos
        // para el termino de recepción de datos
        req.on("end", async() => {
          // Procesa el formulario
          // Mediante URLSearchParams se extraen
          // los campos del formulario
          const params = new URLSearchParams(body);
          // Se construye un objeto a partir de los datos
          // en la variable params
          const parsedParams = Object.fromEntries(params);

          // ALMACENAR EL MENSAJE EN UN ARCHIVO
          await fs.writeFile('message.txt',parsedParams.message);
          // ESTABLCER CODIGO DE RESPUESTA PRA REDIRECCIONAMIENTO
          res.statusCode = 302;
          // ESTABLECIENRO REDIRECCIONAMIENTO
          res.setHeader('Location','/');

          // Se finaliza la conexion
          return res.end();
        })
      } else {
        res.statusCode = 404;
        res.write("404: Endpoint no encontrado")
        res.end();
      }
      break;
    default:
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(`
      <html>
        <head>
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
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