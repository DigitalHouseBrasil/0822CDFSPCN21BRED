const http = require('http');

http.createServer(
    (req, res) => {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`<h1>Servidor funcionando!</h1><p>O cliente solicitou a rota ${req.url}</p>`)
    }
).listen(80);