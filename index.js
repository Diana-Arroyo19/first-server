import http from "http";

const server = http.createServer((req, res) => {
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

      //CASO DEL AUTOR DIANA ARROYO 
      case '/author':
      res.setHeader('Content-Type', 'text/html');
      res.write(`
      <html>
        <head>
        <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
          <title>My App Author</title>
        </head>
        <body>
          <h1 style="color: #08b113">-DIANA ARROYO RODRIGUEZ-</h1>   
          <p style="color: #7cd221">Intentando 🧪 Actividad: Enrutado </p>
        </body>
      </html>
      `);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      res.statusCode = 200;
      res.end();
      break; 

      //MANDAR A LLAMAR EL FAVICON
      case '/favicon.ico':
        res.setHeader('Content-Type', 'text/html');
        res.write(`
        <html>
          <head>
          <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
            <title>My App Author</title>
          </head>
          <body>
            <h1 style="color: #08b113">-favicon-</h1>   
            <p style="color: #7cd221">Insertando un fabicon todo pixeleado</p>
            <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
          </body>
        </html>
        `);
        console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
        res.statusCode = 200;
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